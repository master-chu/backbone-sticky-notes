requirejs.config({
  baseUrl: '../app',
  paths: {
    require: 'lib/require',
    text: 'lib/text',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    handlebars: 'lib/handlebars',
    bootstrap: 'lib/bootstrap',

    collections: 'collections',
    models: 'models',
    templates: 'templates',
    views: 'views'

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

require(['bt-app'], function(btApp){
  btApp.initialize();
});