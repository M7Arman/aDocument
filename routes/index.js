var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

/* POST the document form content as a json.*/ 
router.post('/courswork/create', function(req, res, next) {
	console.log("Request: %j", req.body);
	var fileName = 'VIH208b_Labs_ARM.docx';
	res.status(200);
	res.send(fileName);
});

module.exports = router;
