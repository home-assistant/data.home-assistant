---
title: "Home Assistant States"
id: "states"
sidebar_label: "States"
---

An IoT device or data from a service is represented as one or more entities in Home Assistant. An entity in the core is represented as a state. Each state has an identifier for the entity in the format of `<domain>.<object_id>`, a state and attributes that further describe the state. An example of this would be `light.kitchen` with the state `on` and attributes describing the color and the brightness.

The `<domain>` part of an entity identifier is equal to the Home Assistant component that is maintaining the state. This domain can be used to figure out what kind of state attributes to expect. See [the entity documentation](https://developers.home-assistant.io/docs/core/entity/) for more information about the different entities and their data.

## Database

All states are stored in the database in a table named `states`.

The difference between `last_changed` and `last_updated` is that `last_changed` only updates when the `state` value was changed while `last_updated` is updated on any change to the state, even if that included just attributes. Example: if a light turns on, the state changes from `off` to `on`, so both `last_updated` and `last_changed` will update. If a light changes color from red to blue, only the state attributes change. In this case only `last_updated` will change. By distinguishing between these two values, we can easily identify how long a light has been on and how long it has been on the current color/brightness.

| Field             | Type                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| state_id          | Column(Integer, primary_key=True)                                         |
| domain            | Column(String(64))                                                        |
| entity_id         | Column(String(255))                                                       |
| state             | Column(String(255))                                                       |
| event_id          | Column(Integer, ForeignKey('events.event_id'), index=True)                |
| last_changed      | Column(DateTime(timezone=True), default=datetime.utcnow)                  |
| last_updated      | Column(DateTime(timezone=True), default=datetime.utcnow, index=True)      |
| old_state_id      | Column(Integer, ForeignKey("states.state_id"), index=True)                |
| attributes_id     | Column(Integer, ForeignKey("state_attributes.attributes_id"), index=True) |

The `created` field is no longer stored in the `states` table to avoid duplicating data in the database as it was always the same as `last_updated` and the matching `state_change` event's `time_fired`.

As many `attributes` are the same, attributes are now stored in the `state_attributes` table with many to one relationship:

| Field             | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| attributes_id     | Column(Integer, primary_key=True)                                    |
| hash              | Column(BigInteger, index=True)                                       |
| shared_attrs      | Column(Text().with_variant(mysql.LONGTEXT, "mysql"))                 |

Below is an example query to find `attributes` that were recordered after the change over.

### `states` Indices

| Name                             | Fields                  |
| -------------------------------- | ----------------------- |
| ix_states_entity_id_last_updated | entity_id, last_updated |

## Example queries

### Significant states

Users are usually not so interested in state updates that only changed the attributes. Attribute only changes can be triggered by a light changing color or a media player changing song (which happens every ~3 minutes!). Since we maintain both `last_changed` and `last_updated`, it's easy to filter for just the states where the state was changed:

```sql
SELECT * FROM states WHERE last_changed = last_updated
```

### Linking a new state to an old state

After startup, once a state is changed, the id of the old state is stored as `old_state_id`, making it easy to find the previous state.

```sql
SELECT * FROM states LEFT JOIN states as old_states ON states.old_state_id = old_states.state_id
```

### Fetching attributes

Attributes are stored in the `state_attributes` table.

```sql
SELECT * FROM states LEFT JOIN state_attributes ON states.attributes_id = state_attributes.attributes_id
```

Attributes can be found in the following order `state_attributes.shared_attrs` or `states.attributes`.
As new states are recorded `states.attributes` will be phased out.