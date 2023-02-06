
# API GATEWAY FOR NEW EMPLOYEE

## API Reference

#### FIRST STEP DOWNLOAD ELASTICSEARCH & RUNING ELASTICSEARCH

```
  https://www.elastic.co/downloads/past-releases/elasticsearch-6-0-0
```
#### Reference Elasticdump
```
  https://github.com/elasticsearch-dump/elasticsearch-dump
```

#### UPLOAD DATA JSON TO ELASTICSEARCH WITH ELASTICDUMP
```
  elasticdump \
  --input=news_indonesia.json \
  --output=http://127.0.0.1:9200/my_index \
  --type=data
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