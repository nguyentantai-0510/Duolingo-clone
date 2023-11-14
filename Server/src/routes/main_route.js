const questions = require("./questions_route");
const levels = require("./levels_route");
const users = require("./user_router");
const types = require('./types_route');
const packages = require('./package_route');
const blog = require("./blog_route");
const momo = require("./momo_route");
const admin = require("./admin_route");
module.exports ={
    questions,
    levels,
    users,
    types,
    packages,
    blog,
    momo,
    admin
}