const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: process.env.ES_HOST + ":" + process.env.ES_PORT, // use the same version of your Elasticsearch instance
});
// test
module.exports = {
    search(req, res) {
        const esIndex = process.env.ELASTIC_INDEX;
        const esType = 'news';
        const keyword = req.params.keyword;
        const gte = req.params.start_date;
        const lte = req.params.end_date;
        const start = gte + "T00:00:00";
        const end = lte + "T23:59:59.999";
    
        var allRecords = [];
    
        client.search({
          index: esIndex,
          type: esType,
          scroll: '10s',
          body: {
            "query": {
              "bool": {
                "must": [
                  {
                    "query_string": {
                      "query": keyword,
                      "analyze_wildcard": true,
                      "default_field": "*"
                    }
                  },
                  {
                    "range": {
                      "tgl_ambil": {
                        "time_zone": "+07:00", 
                        "gte": start,
                        "lte": end
                      }
                    }
                  }
                ],
                "must_not": [],
                "should": []
              }
            },
          }
        }, function getMoreUntilDone(error, response) {
          // collect all the records
          response.hits.hits.forEach(function (hit) {
            allRecords.push(hit);
          });
    
          if (response.hits.total !== allRecords.length) {
            // now we can call scroll over and over
            client.scroll({
              scrollId: response._scroll_id,
              scroll: '10s'
            }, getMoreUntilDone);
          } else {
            res.status(200).send({
              status: 1,
              data: allRecords,
    
            })
          }
        });
    
    },
    graph(req, res) {
        const esIndex = process.env.ELASTIC_INDEX;
        const keyword = req.params.keyword;
        const gte = req.params.start_date;
        const lte = req.params.end_date;
        
        const start = gte + "T00:00:00";
        const end = lte + "T23:59:59.999";
        client.search({
          index: esIndex,
          body: {
            "query": {
              "bool": {
                "must": [
                  {
                    "query_string": {
                      "query": keyword,
                      "analyze_wildcard": true,
                      "default_field": "*"
                    }
                  },
                  {
                    "range": {
                      "tgl_ambil": {
                        "time_zone": "+07:00", 
                        "gte": start,
                        "lte": end
                      }
                    }
                  }
                ],
                "must_not": [],
                "should": []
              }
            },
            "sort": [{
              "tgl_ambil": {
                "order": "desc",
              }
            }],
            "aggs": {
              "impact": {
                "filters": {
                  "filters": {
                    "IDEOLOGI": {
                      "query_string": {
                        "query": "Pancasila OR marxisme OR Komunis OR Injil OR Islam OR Kristen OR Protestan OR Gereja OR Masjid OR Klenteng OR Vihara OR Budha OR Hindu OR Rasulullah OR Relijius OR \"yesus\" OR \"komunis\" OR \"PKI\" OR \"marhaen\" OR \"khilafah\" OR \"sosialis\" OR \"bersyariah\" OR \"kejawen\" OR \"menyembah\" OR \"ziarah\" OR \"jihad\"",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    },
                    "POLITIK": {
                      "query_string": {
                        "query": "Pilkada OR \"omnibus law\" OR \"pilkada 2020\" OR \"Ketua Partai\" OR \"Kampanye Politik\" OR \"pemilu 2019\" OR \"politisi\" OR \"reshuffle kabinet\" OR \"jalur perseorangan\" OR \"politikus\" OR \"Anggota DPR\" OR \"Dengar Pendapat\" OR \"diusung partai\" OR \"koalisi\" OR \"RUU HIP\"",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    },
                    "EKONOMI": {
                      "query_string": {
                        "query": "keuangan OR neraca OR bangkrut OR Belanja OR \"Uang Palsu\" OR \"Bursa Saham\" OR \"Kenaikan Harga\" OR Biaya OR \"Belanja Negara\" OR APBN OR APBD OR \"Penerimaan Negara\"  OR \"Tax Ratio\" OR pendanaan OR Insentif OR  Ekonomi",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    },
                    "SOSIAL": {
                      "query_string": {
                        "query": "social OR \"sosial\" OR \"panik berlebihan\" OR lifestyle OR keluarga OR tetangga OR \"identitas diri\" OR Olahraga OR \"stres\" OR \"depresi\" OR \"egois\" OR \"gotong royong\" OR \"bertetangga\" OR \"silaturahmi\" OR \"sombong\"",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    },
                    "BUDAYA": {
                      "query_string": {
                        "query": "Monumen OR Museum OR cagar OR pemahat OR \"karya seni\" OR Lukisan OR desainer OR pelukis OR \"Film produksi nasional\" OR \"alat musik\" OR seniman OR \"ikon budaya\" OR \"budaya lokal\" OR \"Budaya Luar\" OR \"Budaya Asing\" OR \"candi\" OR \"lukisan\" OR \"tari\" OR \"adat istiadat\"",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    },
                    "PERTAHANAN": {
                      "query_string": {
                        "query": "\"Orang ASing\" OR \"Pulau Terluar\" OR \"pindad\" OR \"latihan gabungan\" OR \"latihan militer\" OR \"pesawat tempur\" OR \"teritorial\" OR \"F-16\" OR \"F16\" OR \"jet\" OR \"rudal\" OR \"nuklir\" OR \"perompak\" OR \"illegal fishing\" OR \"imigran gelap\" OR menhan OR \"Menteri Pertahanan\" OR \"Panglima TNI\" OR \"Kerjasama Militer\" OR \"alutsista\" OR KRI OR shukoi OR PINDAD OR DAHANA OR \"PT PAL\" OR \"PT LEN\" OR \"PT DI\" OR \"operasi militer\" OR \"operasi militer selain perang\" OR \"laut cina selatan\" OR natuna OR Sulu OR \"Abu Sayyaf\" OR \"timor leste\" OR Oeccuse OR \"Bikomi\" OR Amfoang OR \"Ndana Rote\" OR \"Ndana Sabu\" OR Naibenu OR \"papua merdeka\" OR \"Benny Wanda\" OR \"Free west Papua\" OR OPM OR ULWP \"Laut Sewu\" OR \"Pulau Bras\" OR \"Pulau Dana\" OR \"Pulau Fani\" OR \"Pulau Fanildo\" OR \"Pulau Marampit\" OR \"Pulau Marore\" OR \"Pulau Miangas\" OR \"Pulau Nipa\" OR \"Pulau Rondo\" OR \"Pulau Sebatik\" OR \"Pulau Sekatung\" \"Pelarian Modal\" OR \"Dana Asing\" OR \"Capital Flight\" OR \"Capital outflow\" OR \"repatriasi modal\" OR spionase OR \"pembobolan sistem\" OR \"wabah penyakit\" OR Pandemik",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    },
                    "KEAMANAN": {
                      "query_string": {
                        "query": "kerusuhan OR Narkoba OR sabu OR inex OR pencurian OR mencuri OR membobol OR penipuan OR menipu OR Penjambretan OR Menjambret OR jambret OR pejambret OR Perampokan OR merampok OR Penggelapan OR Menggelapkan OR curanmor OR maling OR penadah OR curian OR begal OR merampas OR menodongkan OR menodong OR penodong OR bentrokan OR tawuran OR \"Diamuk Massa\" OR \"Massa Mengamuk\" OR preman OR memalak OR pemalakan OR Prostitusi OR \"kejahatan seksual\" OR KDRT OR \"Genk motor\" OR \"kabar bohong\" OR Hoax OR Berjudi OR Perjudian OR \"Main Judi\" OR \"aksi teror\" OR \"jaringan teroris\" OR \"aksi terorisme\" OR \"Aksi teror\" OR \"ledakan bom\" OR \"bom meledak\" OR \"Bom bunuh diri\" OR \"Bom Mobil\" OR \"Meledakkan diri\" OR Pungli OR korupsi OR pungutan OR \"Perdagangan Orang\" OR Illegal OR \"perdagangan bayi\" OR Demo OR \"Aksi Demo\" OR \"Demo Massa\" OR geruduk OR tabrakan OR kemacetan OR Kecelakaan OR tertabrak OR penusukan OR Penganiyaan OR pembunuhan OR dibunuh OR ditusuk OR menyerang OR Penyerangan OR dibunuh OR membunuh OR menewaskan OR Memerkosa OR Diperkosa OR Memperkosa",
                        "analyze_wildcard": true,
                        "default_field": "*"
                      }
                    }
                  }
                }
              },
              "time_series": {
                "date_histogram": {
                  "field": "tgl_ambil",
                  "interval": "1h",
                  "time_zone": "Asia/Jakarta",
                  "min_doc_count": 1
                }
              },
              "top_sumber_url": {
                "terms": {
                  "field": "sumber_url.keyword",
                }
              },
              "top_setiment": {
                "terms": {
                  "field": "sentimen.keyword",
                }
              },
              "top_geo": {
                "terms": {
                  "field": "geo_lokasi.state_name.keyword",
                }
              },
              "top_title": {
                "terms": {
                  "field": "judul.keyword",
                }
              },
              "top_tld": {
                "terms": {
                  "field": "tld_domain.keyword"
                }
              },
              "top_location": {
                "terms": {
                  "field": "entitas_khusus.lokasi.keyword"
                }
              },
              "top_person": {
                "terms": {
                  "field": "entitas_khusus.orang.keyword"
                }
              },
              "top_organisasi": {
                "terms": {
                  "field": "entitas_khusus.organisasi.keyword"
                }
              },
              "location": {
                "terms": {
                  "field": "lokasi.keyword",
                  "size": 500,
                }
              },
              "top_tokenizer": {
                "terms": {
                  "field": "tokenizer.keyword",
                  "size": 500,
                }
              },
    
              "total_data": { "value_count": { "field": "_id"} },
            }
    
          }
        }, (err, result) => {
          if (err) {
            res.status(500).send({
              status: 2,
              message: "Elasticsearch Timeout",
            });
          } else {
            const data = result.hits.hits.map(hit => hit._source);
            const agg = result.aggregations;
            const location = result.aggregations.location.buckets;
            var x = location.map((currElement, index) => {
              let rObj = {};
              rObj['key'] = currElement.key;
              rObj['doc_count'] = Math.floor(Math.random() * 100) + 10;
    
            return rObj;
                
            });
         
            
            // var tod = location.forEach(element => {
            //   let rObj = {};
            //   rObj['key'] = element.key;
            //   rObj['doc_count'] = Math.floor(Math.random() * 100) + 10;
    
            
            // return rObj;
            // });
            
            res.status(200).send({
              status: 1,
              result: data,
              aggregations: agg,
              lot:x
            })
          }
        });
      },
};