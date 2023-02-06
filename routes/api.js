var express = require('express');
var cors = require('cors');
var router = express.Router();

const newsController = require("../controllers").news;

router.use(cors());
router.options('*', cors());

/* GET SEARCH */
router.get(
   "/news/:start_date/:end_date/:keyword",
   function (request, res, next) {
     newsController.search(request, res);
   }
 );
 router.get(
   "/news/graph/:start_date/:end_date/:keyword",
   function (request, res, next) {
     newsController.graph(request, res);
   }
 );

module.exports = router;
