define(function(require){
  'use strict';
  var Backbone = require('backbone');

  var NoteModel = Backbone.Model.extend({
    defaults: {
      x: 100,
      y: 100,
      width: 300,
      height: 200,
      color: 'aliceblue',
      content: 'default content'
    }
  });

  return NoteModel;
});