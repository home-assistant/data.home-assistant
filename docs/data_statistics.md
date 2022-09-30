---
title: "Home Assistant Statistics"
id: "statistics"
sidebar_label: "Long-Term Statistics"
---

Home Assistant has support for long-term statistics. Each hour it will take a snapshot of supported entities and track different things about the entity state. Currently it differentiates between two types:

- Sensor entities with a measurement, like current temperature. It will store the min, max and mean value.
- Sensor entities that are metered, like daily energy consumption. It will store the growth of that entity.

Long-term statistics are different than the other objects in the database, which are stored exactly as they happened and are automatically purged after a period (default is 10 days). Statistics are never purged. Because they are summarized every hour, they only create 24 entries per day.

Read the [sensor developer documentation](https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics) on how to configure entities to be tracked by the long-term statistics.

## Database tables

Long-term statistics consist of two tables. One contains the metadata, the other the data.

### Statistics Meta

This table contains the metadata describing the source. Statistics is either derived from entities, in which case `statistic_id` is equivalent to the `entity_id`, or imported from an external source. Statistics imported from an external source is similar to `entity_id`, but uses a `:` instead of a `.` as a delimiter between the domain and object ID.

If an entity ID of an entity is changed, the statistic ID is automatically updated.

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| id | Column(Integer, primary_key=True)
| statistic_id | Column(String(255), index=True)
| source | Column(String(32))
| state_unit_of_measurement | Column(String(255))
| unit_of_measurement | Column(String(255))
| has_mean | Column(Boolean)
| has_sum | Column(Boolean)
| name | Column(String(255))

### Statistics

This table contains the actual data. Depending on the entity type, different data is tracked.

- Sensor entities with a measurement (the sensor's state_class is `measurement`):
  - `mean` - hourly time-weighted average
  - `min` - hourly minimum
  - `max` - hourly maximum
- Sensor entities that have a value which is integrated over time, such as utility meters (the sensor's state_class is `total` or `total_increasing`):
  - `last_reset` - the time when the last meter cycle was started, if known
  - `state` - the sensor's state at the end of the hour
  - `sum` - hourly grand total since statistics for the sensor was first compiled, offset by the sensor's first valid state when compiling statistics. Please refer to the [developer documentation](https://developers.home-assistant.io/docs/core/entity/sensor#state_class_total_increasing) for how the `sum` is calculated.

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| id | Column(Integer, primary_key=True)
| created | Column(DATETIME_TYPE, default=dt_util.utcnow)
| metadata_id | Column(Integer, ForeignKey(f"{TABLE_STATISTICS_META}.id", ondelete="CASCADE"), index=True)
| start | Column(DATETIME_TYPE, index=True)
| mean | Column(DOUBLE_TYPE())
| min | Column(DOUBLE_TYPE())
| max | Column(DOUBLE_TYPE())
| last_reset | Column(DATETIME_TYPE)
| state | Column(DOUBLE_TYPE())
| sum | Column(DOUBLE_TYPE())

### Statistics Runs

This table is used to keep track of hours for which statistics have been compiled.


| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| run_id | Column(Integer, primary_key=True)
| start | Column(DateTime(timezone=True))
