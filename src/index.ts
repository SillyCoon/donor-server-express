import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes  from "./routes";
import cors = require('cors');
import helmet = require('helmet');

createConnection().then(async _connection => {

    const app = express();

    // Middleware
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', routes);

    app.listen(3000, () => {
        console.log("Server started on port 3000!")
    });


}).catch(error => console.log(error));
