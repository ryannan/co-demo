var fs = require('fs');

var Thunk = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    return function (callback) {
      args.push(callback);
      return fn.apply(this, args);
    }
  }
}

var readFileThunk = Thunk(fs.readFile);

var gen = function* () {
  var r1 = yield readFileThunk('./package.json', 'utf-8');
  console.log(r1.toString());

  var r2 = yield readFileThunk('./package.json', 'utf-8');
  console.log(r2.toString());
}

var g = gen();

var r1 = g.next();

r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
