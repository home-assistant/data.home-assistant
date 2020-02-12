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
| refresh_token_id | Unique identifier of the refresh token the user used to authenticate (in development) |

Context is not stored in their own table in the database. Instead, each row in each table maintains it's own columns to store context.
