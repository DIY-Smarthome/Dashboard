const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Eventhandler = require('../lib/EventHandler/dist/Eventhandler').default;

/*const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../lib/db.js');*/

eh = new Eventhandler(8000, "dashboard");
eh.init();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/*const userMiddleware = require('../middleware/users.js');

var config;
fs.readFile('./config/config.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading config: ${err}`);
    }else{
        config = JSON.parse(data);
    }
});

router.post('/sign-up', [userMiddleware.isLoggedIn, userMiddleware.validateRegister], (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        db.query(
                            `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, ${db.escape(hash)}, now())`,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        return res.status(401).send({
                            msg: 'Username or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id
                        },
                        config.jwt.secret_key,
                        {
                            expiresIn: config.jwt.jwt_expire
                        }
                        );
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});

router.get('/user', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    //TODO router for user content
});*/

router.post('/device', async (req, res, next) => {
    let request_object = req.body;
    let device_type;
    let outlet_id = 0;//FIXME
    switch (request_object['device_id']) {
        case 1:
            device_type = "mss425f";
            break;
        case 2:
            device_type = "mss3100";
            break;
    }

    if (request_object['get_status']) {
        let response = await eh.request("get_outlet_status", {device: device_type, outlet: outlet_id});
        if (response['status'] == "on") {
            res.send({status: "on"});
        } else {
            res.send({status: "off"});
        }
    } else if (request_object['get_usage']) {
        let response = await eh.request("get_outlet_usage", {device: device_type, outlet: outlet_id});
        res.send({usage: response['usage']});
    } else if (request_object['set_status']) {
        let response = await eh.request("set_outlet_status", {device: device_type, outlet: outlet_id, status_change: request_object['set_status']});
        res.send({usage: response['status']});       
    }
});

router.post('/energy', async (req, res, next) => {
    let request_object = req.body;

    if (request_object['type'] == "schedule") {
        let response = await eh.request("set_energy_schedule", {request_object});
        if (response['change'] == true) {
            res.send({change: true});
        } else {
            res.send({change: false});
        }
    } else if (request_object['type'] == "usage") {
        let response = await eh.request("set_energy_usage", {request_object});
        if (response['change'] == true) {
            res.send({change: true});
        } else {
            res.send({change: false});
        }
    } else if (request_object['get_usage'] == true) {
        let response = await eh.request("get_energy_usage", {request_object});
        res.send({usage: response.getContentsFlat()[0]});
    } else if (request_object['get_schedule'] == true) {
        let response = await eh.request("get_energy_schedule", {request_object});
        res.send(response);
    }
});

module.exports = router;