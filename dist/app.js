"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var listDir = require("./list_dir");
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('hello world');
});
app.get('/list-dir', function (req, res) {
    try {
        listDir.listDir(req.query.path)
            .then(function (values) {
            console.log(values);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
                error: false,
                data: JSON.stringify(values, null, 3)
                // res.write(values[0]);
            });
        })
            .catch(function (err) {
            console.log('No such file');
            res.status(404).send({
                error: true,
                data: 'No such file'
            });
        });
    }
    catch (e) {
        throw (e);
    }
});
app.listen(8081, function () {
    console.log('listenning at 8081');
});
//# sourceMappingURL=app.js.map