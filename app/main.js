require(['paths'], function(paths){
  requirejs.config(paths);

  require(['bt-app'], function(btApp){
    btApp.initialize();
  });
});

