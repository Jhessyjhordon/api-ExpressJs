const mongoose          = require("mongoose");
//const mongoosePaginate  = require('mongoose-paginate-v2');
mongoose.Promise        = global.Promise;

const db = {};

/* ---------- These Mongoose's Models represents collections in MongoDB database ---------- */

db.mongoose     = mongoose;
db.user         = require("./user.model");
db.role         = require("./role.model");
//db.logement     = require("./logement.model")(mongoose, mongoosePaginate);
db.logement     = require("./logement.model");
db.refreshToken = require("./refreshToken.model");
db.ROLES        = ["user", "admin", "moderator"];

module.exports = db;