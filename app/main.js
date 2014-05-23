requirejs.config({
  baseUrl: '../app',
  paths: {
    require: 'lib/require',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    handlebars: 'lib/handlebars',
    bootstrap: 'lib/bootstrap'
  },
  shim: {
    'handlebars': {
      'exports': 'Handlebars'
    },
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['bt-app']);