var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {  
  var eg = req.app.get('eg');  
  eg.auth({  
    'path': req.originalUrl,   
    'method': 'GET', 
    'headers': { 'Content-Type': 'application/json'}, 
    'body': '' 
  }); 
  eg.send(function(data, response) {  
    res.json({  
        status: response.statusCode,  
        data: JSON.parse(data)  
      });  
  });  
});

/*POST diagnostic-tools (Generic)*/
router.post('/', function(req, res, next) {
  var eg = req.app.get('eg');
  eg.auth({
    'path': req.originalUrl, 
    'method': 'POST', 
    'headers': {'content-type': 'application/json'}, 
    'body': JSON.stringify(req.body) 
  });
  eg.send(function(data, response) {
    res.json({
      status: response.statusCode,
      data: JSON.parse(data)
    },
  );
  }
);
});

module.exports = router;
