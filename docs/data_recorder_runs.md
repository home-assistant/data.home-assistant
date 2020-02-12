---
title: "Home Assistant Recorder Runs"
id: "recorder"
sidebar_label: "Recorder Runs"
---

The recorder is the component that is responsible in Home Assistant for storing all the data. Each time Home Assistant starts, the recorder starts a new run. A run is finished when Home Assistant gracefully shuts down or when Home Assistant is forcefully shut down and restarted, and is starting a new recorder run.

This information can be used when you are querying Home Assistant data because it can be important that you don't mix up states from different times that Home Assistant was running.

## Database Table

All recorder runs are stored in the database in a table named `recorder_runs`. The important fields for the events table are `start`, `end` and `closed_incorrect`. When `closed_incorrect` is true, the `end` time is set to when Home Assistant is restarted. This can be very fast (5 minutes) but can also be days, hours or maybe never. This means that if `closed_incorrect` is true, you cannot trust the `end` value and depending on your use case, you might want to consider the last time an event was fired as the final time of a run.

| Field            | Type                                                     |
| ---------------- | -------------------------------------------------------- |
| run_id           | Column(Integer, primary_key=True)                        |
| start            | Column(DateTime(timezone=True), default=datetime.utcnow) |
| end              | Column(DateTime(timezone=True))                          |
| closed_incorrect | Column(Boolean, default=False)                           |
| created          | Column(DateTime(timezone=True), default=datetime.utcnow) |

### Indices

| Name                       | Fields     |
| -------------------------- | ---------- |
| ix_recorder_runs_start_end | start, end |
