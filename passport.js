const express = require('express')
const router = express.Router()
const { db } = require('./db');
const { User } = db.models;
const passport = require("passport");
const passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log("payload received", jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);
router.use(passport.initialize());

const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

module.exports = { jwtOptions }