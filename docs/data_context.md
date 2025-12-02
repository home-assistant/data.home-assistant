---
title: "Home Assistant Context"
id: "context"
sidebar_label: "Context"
---

Context is used to tie events and states together in Home Assistant. Whenever anything (e.g. an automation or user interaction) triggers a new change, a new context is assigned. This context will be attached to all events and states that happen as result of the change. The context thus allows to attribute all changes to their original cause internally and in the logbook.

A context object contains the following fields:

| Field            | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| id               | Unique identifier for the context.                                                    |
| user_id          | Unique identifier of the user that started the change, if it is known to home assistant. This field is most notably populated, if the change is initiated via the frontend. The user_id is used for restricting the ability to access and change the state of your home. |
| parent_id        | Unique identifier of the parent context's id that started the change. Most notably, automations will generate a new context, even if the trigger already has one. This is done to decouple the automation actions from the user privileges possibly associated to the trigger. Note that, currently, not all triggers generate a context. |

In the following example, all events and states will refer to the same context (either directly in their `context.id` or via `context.parent_id`):

-   Paulus arrives home, which updates `device_tracker.paulus_pixel` from `not_home` to `home`
-   The automation "Paulus is home" is triggered and fires `automation_triggered` event (with a new `context.id` and a reference to the old `id` in `context.parent_id`).
-   The automation calls service `light.turn_on`, which fires the `service_call` event.
-   The `light.turn_on` service turns on the light which causes an update to the state of `light.living_room`.

Context is not stored in their own table in the database. Instead, each event row maintains its own columns to store context.

Currently, there is no native way to retrieve the original cause of a context in automations or templates. 

## Example queries

### Finding the `context_id` for a `state_changed` event in the database.

```sql
SELECT states_meta.entity_id, states.state, hex(states.context_id_bin), hex(states.context_user_id_bin), hex(states.context_parent_id_bin) FROM states LEFT JOIN states_meta ON (states.metadata_id=states_meta.metadata_id);
```

### Finding the `context_id` for an `event` in the database.

```sql
SELECT event_types.event_type, event_data.shared_data, hex(events.context_id_bin), hex(events.context_user_id_bin), hex(events.context_parent_id_bin) FROM events  LEFT JOIN event_data ON (events.data_id=event_data.data_id) LEFT JOIN event_types ON (events.event_type_id=event_types.event_type_id);
```
