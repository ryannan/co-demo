var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
  var r1 = yield readFileThunk('./package.json');
  console.log(r1.toString());

  var r2 = yield readFileThunk('./package.json');
  console.log(r2.toString());
}

var g = gen();

var r1 = g.next();

console.log(r1);

console.log(r1.value);
