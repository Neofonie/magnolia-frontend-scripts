import express  from 'express';
import flog     from 'fancy-log';
import fs       from 'fs';
import hbs      from 'hbs';
import hbsutils from 'hbs-utils';

const app = express();

// request id middleware
const loadDataObjForRoute = (req, res, next) => {
    const dataDir = '/views/data';
    const currentDataFile = __dirname + dataDir + req.url + '.json';

    fs.stat(currentDataFile, function (err, stat) {
        if (err == null) {
            res.locals = JSON.parse(fs.readFileSync(currentDataFile, 'utf8'));
            next();
        } else {
            // console.log('No data file for this route available', currentDataFile);
            next();
        }
    });
};

hbsutils(hbs).registerWatchedPartials(__dirname + '/views/partials');

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/webresources'));

// General Express and Node API Settings - configure CORS for local dev
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});

app.use(loadDataObjForRoute);

app.get('/*', (req, res) => {

    fs.stat(__dirname + '/views' + req.url + '.hbs', function (err, stat) {
        if (err == null) {
            // render view with same name as requested URL
            res.render(req.url.slice(1));
        } else {
            res.status(404).send('view not found: ' + __dirname + '/views' + req.url);
        }
    });
});

app.listen(3000, () => {
    flog.info('Magic happens on port 3000!');
});



