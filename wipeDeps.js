var fs = require('fs');
var wipeDeps = function() {
  var file = fs.readFileSync('package.json');
  var content = JSON.parse(file);
  for (var package in content.devDependencies) {
    content.devDependencies[package] = '*';
  }
  fs.writeFileSync('package.json', JSON.stringify(content));
};
if (require.main === module) {
  wipeDeps();
} else {
  module.exports = wipeDeps;
}
