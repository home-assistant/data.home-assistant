---
title: "Home Assistant Services"
sidebar_label: "Services"
---

Each component in Home Assistant can offer services. A service can be used to control one of the entities of that component or it can be used to call an external script or service. A service is identified by a domain, which is equal to the component offering the service, and a name. Each service can take optional service data object to indicate what to control. An example of a service is `light.turn_on` with service data `{"entity_id": "light.kitchen"}`.

Available services are not stored in their own table in the database. The available services can be discovered by looking for the `service_registered` events.
