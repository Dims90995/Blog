"use strict";

var mongoose = require('mongoose');

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          mongoose.set('strictQuery', false);
          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGODB_URI));

        case 4:
          conn = _context.sent;
          console.log("Database Connected: ".concat(conn.connection.host));
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = connectDB;