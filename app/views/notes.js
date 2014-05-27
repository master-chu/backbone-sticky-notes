define(['backbone', 'handlebars', 'text!templates/notes.html', 'jquery-ui'], 
  function(Backbone, Handlebars, template){
  'use strict';

  var NotesView = Backbone.View.extend({

    events: {
      'mouseup .handle': 'handleReleaseHandler'
    },

    handleReleaseHandler: function(event){
      var handle = $(event.target),
        parentNote = handle.closest('.note'),
        newX = parentNote.offset().top,
        newY = parentNote.offset().left;

      // var oldX = parentNote.data('x'),
      //   oldY = parentNote.data('y');

      parentNote.data('x', newX);
      parentNote.data('y', newY);
      
      // console.log("{" + oldX + ", " + oldY + "}");
      
      parentNote.effect('bounce', { distance: 4, times: 2}, 'fast');
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
        self.initializeNote($(value));
      });

      $('.note').draggable({
        containment: "#notes",
        handle: '.handle'
      });

      $('.handle').hover()
    },

    initializeNote: function(note){
      this.setSize(note);
      this.setBackgroundColor(note);
      this.setPosition(note);
    },

    setSize: function(note){
      var width = note.data('width'),
        height = note.data('height');

      note.css('width', width + 'px');
      note.css('height', height + 'px');
    },

    setPosition: function(note){
      var x = note.data('x'),
        y = note.data('y');

      note.offset({
        left: x,
        top: y
      });
    },

    setBackgroundColor: function(note){
      var color = note.data('color');
      note.css('background-color', color);
    }
  });

  return NotesView;
});