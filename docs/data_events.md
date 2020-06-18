---
title: "Home Assistant Events"
id: "events"
sidebar_label: "Events"
---

Events are the foundation of Home Assistant. Other types like states and services exist on top of it. An event is always fired when something has happened: an automation has been triggered or a state has changed. Each event has a type and data. The Home Assistant core is using a couple of built-in events to wire all the pieces together.

## Built-in Events

### state_changed

This event is fired when a state has changed. The event will contain the entity identifier and both the new and old state of the entity. If old state is not present, it means the state was set for the first time. If new state is not present, it means the state has been removed.

States can be removed if configuration is reloaded or if an integration is removed.

| Field     | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| entity_id | Identifier of the entity that has changed.                            |
| old_state | The previous state of the entity. Not available if state was created. |
| new_state | The new state of the entity. Not available if the state was removed.  |

The `old_state` and `new_state` are no longer stored in the `events` table to avoid duplicating data in the database. An example is in [Example Queries](#example-queries) shows how to join the `states` table to find the old and new state.

### automation_triggered

This event is fired when an automation is triggered. An automation will trigger an action that can result in more changes being made to the system. The resulting changes can be tracked because all related events will share the same context as this event.

| Field     | Description                                      |
| --------- | ------------------------------------------------ |
| name      | Name of the automation that was triggered.       |
| entity_id | Identifier of the automation that was triggered. |

### script_started

This event is fired when a script is run. A script can be invoked by a user or triggered by an automation. The resulting changes can be tracked because all related events will share the same context as this event.

| Field     | Description                            |
| --------- | -------------------------------------- |
| name      | Name of the script that was run.       |
| entity_id | Identifier of the script that was run. |

### service_registered

This event is fired when a new service is registered.

| Field   | Description                                           |
| ------- | ----------------------------------------------------- |
| domain  | The domain of the component that offers this service. |
| service | The name of the service.                              |

### home_assistant_start, home_assistant_stop

These events are fired when Home Assistant starts and stops. There is no other data attached to it.

Note, a user doesn't always wait for Home Assistant to gracefully shut down and so the `home_assistant_stop` event is not always present in the database. To get more information about runs, check out the `recorder_runs` table.

## Database table

All events are stored in the database in a table named `events`. The important fields for the events table are `event_type`, `time_fired` and `context_id`. That information can be used to figure out what happened when, and how it related to other evenets.

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| event_id          | Column(Integer, primary_key=True)                        |
| event_type        | Column(String(32), index=True)                           |
| event_data        | Column(Text)                                             |
| origin            | Column(String(32))                                       |
| time_fired        | Column(DateTime(timezone=True), index=True)              |
| created           | Column(DateTime(timezone=True), default=datetime.utcnow) |
| context_id        | Column(String(36), index=True)                           |
| context_user_id   | Column(String(36), index=True)                           |
| context_parent_id | Column(String(36), index=True)                           |

Further details about the [database schema](https://www.home-assistant.io/docs/backend/database/#schema) are available in the official documentation.

## Example queries

### Finding the state for `state_changed` events

The new state and old state can for a `state_changed` event can be found by joining the `states` table.

```sql
SELECT * FROM events LEFT JOIN states as new_states ON events.event_id = new_states.event_id LEFT JOIN states as old_states ON new_states.old_state_id = old_states.state_id where events.event_type = 'state_changed'
```