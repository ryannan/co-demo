var fs = require('fs');

var callback = function (err, data) {
  console.log(data);
  // ...
}

var Thunk = function (fn) {
  return function (callback) {

  }
}

var gen = function* () {
  var r1 = yield fs.readFile('./package.json', 'utf-8', function (err, data) {
    callback(err, data);
  });
  console.log(r1.toString());

  var r2 = yield fs.readFile('./package.json', 'utf-8', function (err, data) {
    callback(err, data);
  });
  console.log(r2.toString());
}

var g = gen();

var r1 = g.next();

console.log(r1);
