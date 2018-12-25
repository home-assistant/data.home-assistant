---
title: "Data"
sidebar_label: "Introduction"
---

Home Assistant offers a lot of functionality, but it is actually built around a very simple and powerful core. This simplicity is not only in our core code, it can also be seen in our data model: events, states, services and context. Ths simplicity makes it easy to reason about what is going on and to to reason about what happened.

The Home Assistant core is event-driven. This means that everything that happens is represented as an event: a light being turned on, a motion sensor being tripped or an automation triggered. Each event has an attached context. The context can be used to identify which events have been triggered as a response to other events, which user triggered the original event and with which authentication (auth piece is still under development).
