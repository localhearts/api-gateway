
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

#### MAPPING DATA TO ELASTICSEARCH WITH ELASTICDUMP

```
  elasticdump \
  --input=news_indonesia_mapping.json \
  --output=http://127.0.0.1:9200/your_index \
  --type=mapping
```

#### UPLOAD DATA JSON TO ELASTICSEARCH WITH ELASTICDUMP

```
  elasticdump \
  --input=news_indonesia.json \
  --output=http://127.0.0.1:9200/your_index \
  --type=data
```




#### GET DATA GRAPH DASHBOARD

```
  GET http://127.0.0.1:4200/api/v1/news/graph/:start_date/:end_date/:keyword
```
```
  EXAMPLE http://127.0.0.1:4200/api/v1/news/graph/2022-12-12/2023-02-24/*
```

#### GET DATALIST

```
  GET http://127.0.0.1:4200/api/v1/news/:start_date/:end_date/:keyword
```
```
  EXAMPLE http://127.0.0.1:4200/api/v1/news/2022-12-12/2023-02-24/*
```
