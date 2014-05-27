define(function(require){
  'use strict';
  var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    template   = require('text!templates/note.html');

  var NotesView = Backbone.View.extend({
    render: function(){
      var notes = this.collection.toJSON();
      var compiledTemplate = Handlebars.compile(template);
      this.$el.html(compiledTemplate({notes: notes}));
    }
  });

  return NotesView;
});