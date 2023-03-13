---
title: "Home Assistant States"
id: "states"
sidebar_label: "States"
---

An IoT device or data from a service is represented as one or more entities in Home Assistant. An entity in the core is represented as a state. Each state has an identifier for the entity in the format of `<domain>.<object_id>`, a state and attributes that further describe the state. An example of this would be `light.kitchen` with the state `on` and attributes describing the color and the brightness.

The `<domain>` part of an entity identifier is equal to the Home Assistant component that is maintaining the state. This domain can be used to figure out what kind of state attributes to expect. See [the entity documentation](https://developers.home-assistant.io/docs/core/entity/) for more information about the different entities and their data.

## Database

All states are stored in the database in a table named `states`.

The difference between `last_changed_ts` and `last_updated_ts` is that `last_changed_ts` only updates when the `state` value was changed while `last_updated_ts` is updated on any change to the state, even if that included just attributes. Example: if a light turns on, the state changes from `off` to `on`, so both `last_updated_ts` and `last_changed_ts` will update. If a light changes color from red to blue, only the state attributes change. In this case only `last_updated_ts` will change. By distinguishing between these two values, we can easily identify how long a light has been on and how long it has been on the current color/brightness.

The `last_changed_ts` field is not stored in the database when it is the same as the `last_updated_ts` field. See [Fetching the last_changed_ts when it is NULL](#fetching-the-last_changed_ts-when-it-is-null) for queries to populate the value when it is NULL.

| Field                 | Type                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| state_id              | Column(Integer, primary_key=True)                                         |
| metadata_id           | Column(Integer, ForeignKey("states_meta.metadata_id"))                    |
| state                 | Column(String(255))                                                       |
| last_changed_ts       | Column(Float)                                                             |
| last_updated_ts       | Column(Float, default=time.time, index=True)                              |
| old_state_id          | Column(Integer, ForeignKey("states.state_id"), index=True)                |
| attributes_id         | Column(Integer, ForeignKey("state_attributes.attributes_id"), index=True) |
| context_id_bin        | Column(Blob(16), index=True)                                              |
| context_user_id_bin   | Column(Blob(16))                                                          |
| context_parent_id_bin | Column(Blob(16))                                                          |
| origin_idx            | Column(Integer)                                                           |

The `created` field is no longer stored in the `states` table to avoid duplicating data in the database as it was always the same as `last_updated_ts` and the matching `state_change` event's `time_fired_ts`.

As many `attributes` are the same, attributes are stored in the `state_attributes` table with many to one relationship:

| Field             | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| attributes_id     | Column(Integer, primary_key=True)                                    |
| hash              | Column(BigInteger, index=True)                                       |
| shared_attrs      | Column(Text().with_variant(mysql.LONGTEXT, "mysql"))                 |

The [Example queries](#example-queries) show how to find `attributes` that were recorded after the change over.

As many `entity_id` fields are the same, `entity_id` is stored in the `states_meta` table with a many to one relationship on `metadata_id`:

| Field             | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| metadata_id       | Column(Integer, primary_key=True)                                    |
| entity_id         | Column(String(255))                                                  |

### `states` Indices

| Name                                  | Fields                       |
| ------------------------------------- | ---------------------------- |
| ix_states_metadata_id_last_updated_ts | metadata_id, last_updated_ts |

## Example queries

### Significant states

Users are usually not so interested in state updates that only changed the attributes. Attribute only changes can be triggered by a light changing color or a media player changing song (which happens every ~3 minutes!). Since `last_changed_ts` is `NULL` when it has not changed, it's easy to filter for just the states where the state was changed:

```sql
SELECT states_meta.entity_id, state_attributes.shared_attrs, states.last_updated_ts FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id) LEFT JOIN state_attributes ON (states.attributes_id=state_attributes.attributes_id) WHERE last_changed_ts is NULL;
```

### Linking a new state to an old state

After startup, once a state is changed, the id of the old state is stored as `old_state_id`, making it easy to find the previous state.

```sql
SELECT states_meta.entity_id, states.state_id, old_states.state_id, state_attributes.shared_attrs, states.last_updated_ts FROM states LEFT JOIN states as old_states ON states.old_state_id = old_states.state_id LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id) LEFT JOIN state_attributes ON (states.attributes_id=state_attributes.attributes_id);
```

### Fetching attributes

Attributes are stored in the `state_attributes` table.

```sql
SELECT states.state_id, state_attributes.shared_attrs FROM states LEFT JOIN state_attributes ON states.attributes_id = state_attributes.attributes_id
```

Attributes can be found in the following order `state_attributes.shared_attrs` or `states.attributes`.
As new states are recorded `states.attributes` will be phased out.

### Fetching the last_changed_ts when it is NULL

#### Fetching the last changed with SQLite

```sql
SELECT states_meta.entity_id, states.state, states.last_updated_ts, iif(states.last_changed_ts IS NULL,states.last_updated_ts,states.last_changed_ts) AS last_changed_ts FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id);
```

#### Fetching the last changed with MySQL & MariaDB

```sql
SELECT states_meta.entity_id, states.state, states.last_updated_ts, if(states.last_changed_ts IS NULL,states.last_updated_ts,states.last_changed_ts) AS last_changed_ts FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id);
```

#### Fetching the last changed with PostgreSQL

```sql
SELECT states_meta.entity_id, states.state, states.last_updated_ts, (CASE WHEN states.last_changed_ts IS NULL THEN states.last_updated_ts ELSE states.last_changed_ts END) FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id);
```

### Viewing state data in a human readable format

The below example queries make it easier to review data in the `states` table in a human readable format.

#### SQLite human readable example

```sql
SELECT states.state_id, states_meta.entity_id, DATETIME(last_updated_ts, 'unixepoch', 'localtime'),DATETIME(IIF(states.last_changed_ts IS NULL,states.last_updated_ts,states.last_changed_ts), 'unixepoch', 'localtime'), state_attributes.shared_attrs, hex(states.context_id_bin) FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id) LEFT JOIN state_attributes ON (states.attributes_id=state_attributes.attributes_id) WHERE last_changed_ts IS NULL;
```

#### MariaDB human readable example

```sql
SELECT states.state_id, states_meta.entity_id, from_unixtime(states.last_updated_ts),from_unixtime(if(states.last_changed_ts IS NULL,states.last_updated_ts,states.last_changed_ts)), state_attributes.shared_attrs, hex(states.context_id_bin) FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id) LEFT JOIN state_attributes ON (states.attributes_id=state_attributes.attributes_id) WHERE last_changed_ts IS NULL;
```

#### PostgreSQL human readable example

```sql
SELECT states.state_id, states_meta.entity_id, to_timestamp(states.last_updated_ts),to_timestamp(CASE WHEN states.last_changed_ts IS NULL THEN states.last_updated_ts ELSE states.last_changed_ts END), state_attributes.shared_attrs, states.context_id_bin FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id) LEFT JOIN state_attributes ON (states.attributes_id=state_attributes.attributes_id) WHERE last_changed_ts IS NULL;
```
