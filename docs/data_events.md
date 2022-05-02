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

The `old_state` and `new_state` are no longer stored in the `events` table to avoid duplicating data in the database. An example in [Example Queries](#example-queries) shows how to join the `states` table to find the old and new state.

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

All events are stored in the database in a table named `events`. The important fields for the events table are `event_type`, `time_fired` and `context_id`. That information can be used to figure out what happened when, and how it related to other events.

| Field             | Type                                                          |
| ----------------- | ------------------------------------------------------------- |
| event_id          | Column(Integer, primary_key=True)                             |
| event_type        | Column(String(32))                                            |
| event_data        | Column(Text)                                                  |
| origin_idx        | Column(Integer)                                               |
| time_fired        | Column(DateTime(timezone=True), index=True)                   |
| context_id        | Column(String(36), index=True)                                |
| context_user_id   | Column(String(36))                                            |
| context_parent_id | Column(String(36))                                            |
| data_id           | Column(Integer, ForeignKey("event_data.data_id"), index=True) |

Further details about the [database schema](https://www.home-assistant.io/docs/backend/database/#schema) are available in the official documentation.

The `created` field is no longer stored in the `events` table to avoid duplicating data in the database as it was always the same as `time_fired`.

As many `event_data` fields are the same, event_data is stored in the `event_data` table with many to one relationship:

| Field             | Type                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| data_id           | Column(Integer, primary_key=True)                                    |
| hash              | Column(BigInteger, index=True)                                       |
| shared_data       | Column(Text().with_variant(mysql.LONGTEXT, "mysql"))                 |

Below is an example query to find `event_data` that were recordered after the change over to using the `event_data` table.

### Indices

| Name                            | Fields                 |
| ------------------------------- | ---------------------- |
| ix_events_event_type_time_fired | event_type, time_fired |

## Example queries

### Finding all events

All events except `state_changed` are stored in the `events` table. The `states.last_updated` and `events.timed_fired` are always the same time. A union query can be used to find all the events including `state_changed`:

```sql
SELECT event_type, time_fired, event_data.shared_data as data, NULL as attributes, context_id FROM events LEFT JOIN event_data ON (events.data_id=event_data.data_id) UNION ALL select 'state_changed' as event_type, last_updated as time_fired, NULL as data, state_attributes.shared_attrs as attributes, context_id from states LEFT JOIN state_attributes ON states.attributes_id = state_attributes.attributes_id;
```
### Finding the event_data for events

For events that were recorded after the `event_data` table was created, the data is in the `event_data` table. While there are still older rows in the database, check the `shared_data` field first and fallback to the `event_data` field.

```sql
SELECT * FROM events LEFT JOIN event_data ON (events.data_id=event_data.data_id);
```
