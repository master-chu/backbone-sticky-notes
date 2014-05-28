define(['backbone', 'handlebars', 'models/note', 'text!templates/notes.html', 'jquery-ui'], 
  function(Backbone, Handlebars, NoteModel, template){
  'use strict';

  var NotesView = Backbone.View.extend({

    events: {
      'click .close': 'deleteNote'
    },

    addNote: function(param){
      this.collection.add(new NoteModel());
    },

    deleteNote: function(event){
      var note = $(event.target).closest('.note'),
        index = note.data('index');

      var noteModel = this.collection.at(index);
      this.collection.remove(noteModel);
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
        containment: '#notes',
        handle: '.handle',
        stop: function(event, ui){
          var note = $(event.target).closest('.note'),
            index = note.data('index'),
            noteModel = self.collection.at(index),
            newX = note.offset().left,
            newY = note.offset().top,
            parent = $('#notes'),
            parentX = parent.offset().left,
            parentY = parent.offset().top,
            dataX = newX + parentX,
            dataY = newY + parentY;

          note.data('x', newX);
          note.data('y', newY);

          noteModel.set({
             x: newX,
             y: newY
           });
          note.effect('bounce', { distance: 4, times: 2}, 'fast');
        }
      });

      $('.note').resizable({
        containment: '#notes',
        minWidth: 150,
        minHeight: 150,
        maxWidth: 500,
        maxHeight: 500,
        stop: function(event, ui){
          var note = $(event.target),
            index = note.data('index'),
            noteModel = self.collection.at(index),
            newWidth = ui.size.width,
            newHeight = ui.size.height;

          note.data('width', newWidth);
          note.data('height', newHeight);
          
          noteModel.set({
            width: newWidth,
            height: newHeight
          });
        }
      });

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