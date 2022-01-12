var express = require('express');
var app = express();
var _app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')
const ip = require('ip');

var hostedFiles = []
var server_url = ""

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(cors());

_app.use(bodyParser.urlencoded({ extended: true }));
_app.use(bodyParser.json({ limit: '50mb' }));
_app.use(bodyParser.raw({ limit: '50mb' }));
_app.use(cors());
_app.use(express.json());

app.use(express.static(path.join(__dirname, './public')))

app.get('/', function (req, res) {
    res.send('Home')
});

app.get('/files', function (req, res) {
    res.send(hostedFiles)
});

_app.get('/files', function (req, res) {
    res.send(hostedFiles)
});

_app.get('/config', function (req, res) {
    res.send({ server_url: server_url })
});

_app.post('/add', function (req, res) {
    req.body.forEach(file => {
        console.log(file)
        if (!fs.lstatSync(file.path).isDirectory() && !hostedFiles.some(x => x.path == file.path)) {
            hostedFiles.push(file)
        }
    });
    res.send(hostedFiles)
});

app.get('/download', function (req, res) {
    res.download(req.query.file);
});

_app.listen(8060, () => { })

// require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//     console.log('addr: ' + add);
//     server_url = "http://" + add + ":8090"
//     startServer(add)
// })

server_url = "http://" + ip.address() + ":8090"
startServer(ip.address())

function startServer(ip) {
    var server = app.listen(8090, ip, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        app.emit('appstarted', server.address())
    });
}
