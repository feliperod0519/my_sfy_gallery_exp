var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');

var app = express();

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

var user = 'azat_co';
var story_slug = 'kazan';

var router = express.Router();

router.get('/', function (req, res)
{
    superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug).query({ api_key: "", username: "", _token: "" }).set({ Accept: 'application/json' }).end(function (error, response)
    {
        if (error) next(error);
        return res.render('index', response.body.content);
    });
});

app.use('/', router);


app.listen(3001);