
# API GATEWAY FOR NEW EMPLOYEE

## API Reference

#### FIRST STEP DOWNLOAD ELASTICSEARCH

```
  https://www.elastic.co/downloads/past-releases/elasticsearch-6-0-0
```

#### GET DATA

```
  GET /api/news/:type/:gte/:lte/:keyword
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. Example : docs |
| `gte` | `date` | **Required**.|
| `lte` | `date` | **Required**.|
| `keyword` | `string` | **Required**.|