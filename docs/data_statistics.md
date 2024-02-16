---
title: "Long- and short-term statistics"
id: "statistics"
sidebar_label: "Long-term statistics"
---

Home Assistant has support for both short- and long-term statistics. For short-term statistics a snapshot is taken every 5 minutes. It keeps track of supported entities and different elements of the entity state. For long-term statistics, an hourly aggregate is stored of the short-term statistics. Currently two types of entities are differentiated for statistics:

- Sensor entities with a measurement, such as the current temperature. It will store the hourly min, max, and mean value.
- Sensor entities that are metered, such as the daily energy consumption. It will store the growth of that entity.

Short- and long-term statistics are different than entries in the `states` table of the database. The `states` table stores objects exactly as they happened. The `states` and `statistics_short_term` tables are automatically purged after a predefined period (default is 10 days). The long-term statistics table is never purged. Because it stores an hourly summary, only 24 entries are created per day.

Read the [sensor developer documentation](https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics) on how to configure entities to be tracked by the long-term statistics.

## Database tables

Long-term statistics consists of three tables. One contains the metadata, the other two contain the data.

- `statistics_meta`: Metadata describing the data source.
- `statistics_short_term`: 5-minutes aggregates of data from the `states` table.
- `statistics`: Hourly aggregates of the data from the `statistics_short_term` table.

### Statistics Meta

The Statistics Meta table contains the metadata describing the source. Statistics are either derived from entities, in which case `statistic_id` is equivalent to the `entity_id`, or imported from an external source. Statistics imported from an external source are similar to `entity_id`, but use a `:` instead of a `.` as a delimiter between the domain and object ID.

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

### Statistics data tables

### Short- and long-term statistics tables

The `statistics_short_term` table stores 5-minute aggregates of the data from the `states` table. The `statistics` table contains the long-term statistics data. It stores hourly aggregates of the data from the `statistics_short_term` table. For both tables, Depending on the entity type, different data is tracked.

- Sensor entities with a measurement (the sensor's state_class is `measurement`):
  - `mean` - 5-minute / hourly time-weighted average
  - `min` - 5-minute / hourly minimum
  - `max` - 5-minute / hourly maximum
- Sensor entities that have a value which is integrated over time, such as utility meters (the sensor's state_class is `total` or `total_increasing`):
  - `last_reset_ts` - the timestamp when the last meter cycle was started, if known
  - `state` - the sensor's state at the end of the hour
  - `sum` - hourly grand total since statistics for the sensor was first compiled, offset by the sensor's first valid state when compiling statistics. Please refer to the [developer documentation](https://developers.home-assistant.io/docs/core/entity/sensor#state_class_total_increasing) for how the `sum` is calculated.

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| id | Column(Integer, primary_key=True)
| created_ts | Column(DOUBLE_TYPE(), default=time.time)
| metadata_id | Column(Integer, ForeignKey(f"{TABLE_STATISTICS_META}.id", ondelete="CASCADE"))
| start_ts | Column(DOUBLE_TYPE(), index=True)
| mean | Column(DOUBLE_TYPE())
| min | Column(DOUBLE_TYPE())
| max | Column(DOUBLE_TYPE())
| last_reset_ts | Column(DOUBLE_TYPE())
| state | Column(DOUBLE_TYPE())
| sum | Column(DOUBLE_TYPE())

### Statistics runs

This table is used to keep track of hours for which statistics have been compiled.

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| run_id | Column(Integer, primary_key=True)
| start | Column(DateTime(timezone=True))

## Related topics

### Data visualization

The short- and long-term statistics data is used as a data source in various places in Home Assistant.

- [History panel](https://www.home-assistant.io/integrations/history/)
- [Statistic graphs card](https://www.home-assistant.io/dashboards/statistics-graph)

### Related developer documentation

- [Enabling sensors for long-term statistics](https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics)
- [States table](/docs/states)