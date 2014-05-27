define(function(require){
  'use strict';
  var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    template   = require('text!templates/notes.html');

  var NotesView = Backbone.View.extend({

    events: {
      'click .note': 'acknowledgeClick'
    },

    acknowledgeClick: function(event){
      $(event.target).css('color', 'white');
    },

    render: function(){
      var notes = this.collection.toJSON();
      var compiledTemplate = Handlebars.compile(template);
      this.$el.html(compiledTemplate({notes: notes}));

      this.initializeNotes();
    },

    initializeNotes: function(){
      var self = this;

      $('.note').each(function(index, value){
        var note = $(value);

        self.setSize(note);
        self.setColor(note);
      });
    },

    setSize: function(note){
      var width = note.data('width'),
        height = note.data('height');

      note.css('width', width + 'px');
      note.css('height', height + 'px');
    },

    setColor: function(note){
      var color = note.data('color');
      
      note.addClass(color);
    }




  });

  return NotesView;
});