require("dotenv").config();
const express = require("express");

express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const prefixPath = process.env.PREFIX_PATH || '/'
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const fs = require('fs')


const bodyParser = require("body-parser");

// ✅ Tăng giới hạn kích thước body lên 10MB
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());

//joining path of directory
const directoryModulesPath = path.join(__dirname, 'modules')

app.prefix(`${prefixPath}`, (appGroup) => {
    fs.readdir(directoryModulesPath, function (err, modules) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err)
        }
        //listing all files using forEach
        modules.forEach((module) => {
            try {
                const moduleRoutes = require(`${directoryModulesPath}/${module}/routes/${module}.route`)
                moduleRoutes(appGroup)
            } catch (e) {
                console.log(e)
                //await notificationService.send(e.message)
            }
        })
    })
});

app.listen(port);

console.log("RESTful API server started on: " + port);

