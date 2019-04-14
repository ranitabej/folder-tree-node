import * as listDir from "./list_dir";
import * as express from "express";

var app = express();

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/list-dir', (req, res) => {
    try {
        listDir.listDir(req.query.path)
            .then(values => {
                console.log(values)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                    error: false,
                    data: JSON.stringify(values, null, 3)
                    // res.write(values[0]);
                })
            })
            .catch((err) => {
                console.log('No such file');
                res.status(404).send({
                    error: true,
                    data: 'No such file'
                }
                )
            })
    } catch (e) {
        throw (e)
    }

})

app.listen(8081, () => {
    console.log('listenning at 8081')
})
