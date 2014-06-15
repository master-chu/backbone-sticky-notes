define(function() {

  var paths = {
    baseUrl: '../app',
    paths: {
      require: 'lib/require',
      text: 'lib/text',
      jquery: 'lib/jquery',
      'jquery-ui': 'lib/jquery-ui/js/jquery-ui',
      underscore: 'lib/underscore',
      backbone: 'lib/backbone',
      localstorage: 'lib/backbone.localStorage',
      handlebars: 'lib/handlebars',
      bootstrap: 'lib/bootstrap/bootstrap',

      'jasmine': 'lib/jasmine-2.0.0/jasmine',
      'jasmine-html': 'lib/jasmine-2.0.0/jasmine-html',
      'boot': 'lib/jasmine-2.0.0/boot'
    },
    shim: {
      'handlebars': {
        'exports': 'Handlebars'
      },
      "bootstrap": {
        deps: ["jquery"],
        exports: "$.fn.popover"
      },
      'jquery-ui': {
        deps: ['jquery']
      },

      'jasmine': {
        exports: 'window.jasmineRequire'
      },
      'jasmine-html': {
        deps: ['jasmine'],
        exports: 'window.jasmineRequire'
      },
      'boot': {
        deps: ['jasmine', 'jasmine-html'],
        exports: 'window.jasmineRequire'
      }
    }
  }

  return paths;
});