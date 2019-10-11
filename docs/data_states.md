---
title: "Home Assistant States"
sidebar_label: "States"
---

An IoT device or data from a service is represented as one or more entities in Home Assistant. An entity in the core is represented as a state. Each state has an identifier for the entity in the format of `<domain>.<object_id>`, a state and attributes that further describe the state. An example of this would be `light.kitchen` with the state `on` and attributes describing the color and the brightness.

The `<domain>` part of an entity identifier is equal to the Home Assistant component that is maintaining the state. This domain can be used to figure out what kind of state attributes to expect. See [the entity documentation](https://developers.home-assistant.io/docs/en/entity_index.html) for more information about the different entities and their data.

## Database

All states are stored in the database in a table named `states`.

The difference between `last_changed` and `last_updated` is that `last_changed` only updates when the `state` value was changed while `last_updated` is updated on every state change. Example: if a light turns on, the state changes from `off` to `on`, so both `last_updated` and `last_changed` will update. If a light changes color from red to blue, only the state attributes change. In this case only `last_updated` will change. By distinguishing between these two values, we can easily identify how long a light has been on and how long it has been on the current color/brightness.

| Field           | Type                                                                 |
| --------------- | -------------------------------------------------------------------- |
| state_id        | Column(Integer, primary_key=True)                                    |
| domain          | Column(String(64))                                                   |
| entity_id       | Column(String(255), index=True)                                      |
| state           | Column(String(255))                                                  |
| attributes      | Column(Text)                                                         |
| event_id        | Column(Integer, ForeignKey('events.event_id'), index=True)           |
| last_changed    | Column(DateTime(timezone=True), default=datetime.utcnow)             |
| last_updated    | Column(DateTime(timezone=True), default=datetime.utcnow, index=True) |
| created         | Column(DateTime(timezone=True), default=datetime.utcnow)             |
| context_id      | Column(String(36), index=True)                                       |
| context_user_id | Column(String(36), index=True)                                       |

### Indicices

| Name                             | Fields                  |
| -------------------------------- | ----------------------- |
| ix_states_entity_id_last_updated | entity_id, last_updated |

## Example queries

### Significant states

Users are usually not so interested in state updates that only changed the attributes. Attribute only changes can be triggered by a light changing color or a media player changing song (which happens every ~3 minutes!). Since we maintain both `last_changed` and `last_updated`, it's easy to filter for just the states where the state was changed:

```sql
SELECT * FROM states WHERE last_changed = last_updated
```
