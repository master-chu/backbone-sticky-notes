/* SPEC RUNNER ENTRY POINT ONLY */
require(['paths'], function(paths) {
  requirejs.config(paths);

  var specs = ['spec/example_spec'];

  require(['boot'], function() {
    require(specs, function(){
      window.onload();
    })
  });
});