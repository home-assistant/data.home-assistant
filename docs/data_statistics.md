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

This table contains the metadata describing the source. Statistics are currently limited to be derived from entities, and so `statistic_id` is currently equivalent to `entity_id`. When an entity ID is changed, the statistic ID is automatically updated.

This restriction might be dropped in the future to allow integrations to import statistics without an entity.

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| id | Column(Integer, primary_key=True)
| statistic_id | Column(String(255), index=True)
| source | Column(String(32))
| unit_of_measurement | Column(String(255))
| has_mean | Column(Boolean)
| has_sum | Column(Boolean)


### Statistics

This table contains the actual data. Depending on the entity type, different data is tracked.

- Sensor entities with a measurement: `mean`, `min`, `max`
- Sensor entities that are metered: `last_reset`, `state`, `sum`

| Field             | Type                                                     |
| ----------------- | -------------------------------------------------------- |
| id | Column(Integer, primary_key=True)
| created | Column(DATETIME_TYPE, default=dt_util.utcnow)
| metadata_id | Column(Integer, ForeignKey(f"{TABLE_STATISTICS_META}.id", ondelete="CASCADE"), index=True)
| start | Column(DATETIME_TYPE, index=True)
| mean | Column(Float())
| min | Column(Float())
| max | Column(Float())
| last_reset | Column(DATETIME_TYPE)
| state | Column(Float())
| sum | Column(Float())
