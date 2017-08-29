var config=require('./config/defalut');
var Mongolass=require('mongolass');
var mongolass=new Mongolass();
mongolass.connect(config.mongodb);