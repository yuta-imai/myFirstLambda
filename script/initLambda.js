var fs = require('fs');
var config = {
  region: '',
  description: '',
  role: '',
  memorySize: '128',
  timeout: '3'
};
fs.writeFileSync('./lambdaConfig.json',JSON.stringify(config));
