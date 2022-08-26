const express = require('express');
//const { default: regex } = require('uuid/dist/regex');
const router = express.Router();

//const db = require('../lib/db.js');

//const userMiddleware = require('../middleware/users.js');

function isNavParamCorrect(param) {
    if (param == "minimize") {
        return true;
    }
}

//TODO secure routes with 'userMiddleware.isLoggedIn'

router.get("/", (req, res) => {
    if (isNavParamCorrect(req.query.nav)) {
        res.render("home", {nav:"minimize"});
    } else {
        res.render("home", {nav:false});
    }
});

router.get("/energy", (req, res) => {
    if (isNavParamCorrect(req.query.nav)) {
        res.render("energy", {nav:"minimize"});
    } else {
        res.render("energy", {nav:false});
    }
});

router.get("/device", (req, res) => {
    if (isNavParamCorrect(req.query.nav)) {
        res.render("device", {nav:"minimize", device_id:req.query.device_id});
    } else {
        res.render("device", {nav:false, device_id:req.query.device_id});
    }
});

/*router.get("/user", (req, res) => {
    if (isNavParamCorrect(req.query.nav)) {
        res.render("user", {nav:"minimize"});
    } else {
        res.render("user", {nav:false});
    }
});

router.get("/login", (req, res) => {
    res.render("user");
});*/

//if someone get to the api, generate error page
router.get("*", (req, res) => {
    if (isNavParamCorrect(req.query.nav)) {
        res.render("error", {nav:"minimize"});
    } else {
        res.render("error", {nav:false});
    }
});

module.exports = router;