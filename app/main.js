requirejs.config({
  baseUrl: '../app',
  paths: {
    require: 'lib/require',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    handlebars: 'lib/handlebars',
  },
  shim: {
    'handlebars': {
      'exports': 'Handlebars'
    },
  }
});

require(['backbone', 'handlebars'], function(bb, hb) {
  debugger
});