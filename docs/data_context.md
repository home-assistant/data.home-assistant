---
title: "Home Assistant Context"
id: "context"
sidebar_label: "Context"
---

Context is used to tie events and states together in Home Assistant. Whenever an automation or user interaction triggers a new change, a new context is assigned. This context will be attached to all events and states that happen as result of the change.

In the following example, all events and states will share the same context:

-   Paulus arrives home, which updates `device_tracker.paulus_pixel` from `not_home` to `home`
-   The automation "Paulus is home" is triggered and fires `automation_triggered` event.
-   The automation calls service `light.turn_on`, which fires the `service_call` event.
-   The `light.turn_on` service turns on the light which causes an update to the state of `light.living_room`.

A context object contains the following fields:

| Field            | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| context_id       | Unique identifier for the context.                                                    |
| user_id          | Unique identifier of the user that started the change.                                |
| parent_id        | Unique identifier of the parent context_id that started the change.                   |

Context is not stored in their own table in the database. Instead, each event row maintains it's own columns to store context.

## Example queries

### Finding the `context_id` for a `state_changed` event in the database.

```sql
SELECT states_meta.entity_id, states.state, hex(states.context_id_bin), hex(states.context_user_id_bin), hex(states.context_parent_id_bin) FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id);
```

### Finding the `context_id` for an `event` in the database.

```sql
SELECT event_types.event_type, event_data.shared_data, hex(events.context_id_bin), hex(events.context_user_id_bin), hex(events.context_parent_id_bin) FROM events  LEFT JOIN event_data ON (events.data_id=event_data.data_id) LEFT JOIN event_types ON (events.event_type_id=event_types.event_type_id);
```
