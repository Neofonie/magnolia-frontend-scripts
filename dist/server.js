'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _hbs = require('hbs');

var _hbs2 = _interopRequireDefault(_hbs);

var _hbsUtils = require('hbs-utils');

var _hbsUtils2 = _interopRequireDefault(_hbsUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// request id middleware
var loadDataObjForRoute = function loadDataObjForRoute(req, res, next) {
    var dataDir = '/views/data';
    var currentDataFile = __dirname + dataDir + req.url + '.json';

    _fs2.default.stat(currentDataFile, function (err, stat) {
        if (err == null) {
            res.locals = JSON.parse(_fs2.default.readFileSync(currentDataFile, 'utf8'));
            next();
        } else {
            // console.log('No data file for this route available', currentDataFile);
            next();
        }
    });
};

(0, _hbsUtils2.default)(_hbs2.default).registerWatchedPartials(__dirname + '/views/partials');

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(_express2.default.static(__dirname + '/webresources'));

// General Express and Node API Settings - configure CORS for local dev
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});

app.use(loadDataObjForRoute);

app.get('/*', function (req, res) {

    _fs2.default.stat(__dirname + '/views' + req.url + '.hbs', function (err, stat) {
        if (err == null) {
            // render view with same name as requested URL
            res.render(req.url.slice(1));
        } else {
            res.status(404).send('view not found: ' + __dirname + '/views' + req.url);
        }
    });
});

app.listen(3000, function () {
    _fancyLog2.default.info('Magic happens on port 3000!');
});