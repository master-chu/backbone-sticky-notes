define(['backbone', 'handlebars', 'models/note', 'utilities/note_colors', 'text!templates/notes.html', 'jquery-ui', 'bootstrap'],
  function(Backbone, Handlebars, NoteModel, NoteColors, template) {
    'use strict';

    var NotesView = Backbone.View.extend({

      events: {
        'click .close': 'deleteNote',
        'mousedown .handle': 'blurContent',
        'mousedown .ui-resizable-handle': 'blurContent',
        'blur .content': 'updateContent',
        'click .color': 'updateColor'
      },

      addNote: function(param) {
        this.collection.create({/* see model defaults */}, {
          success: function() {
            console.log('created new note');
          }
        });
      },

      deleteNote: function(event) {
        var note = $(event.target).closest('.note'),
          index = note.data('index');

        var noteModel = this.collection.at(index);
        noteModel.destroy({
          success: function() {
            console.log('destroyed model');
          },
          failure: function() {
            console.log('failed to destroy model');
          }
        })
      },

      updateContent: function(event) {
        var note = $(event.target).closest('.note'),
          index = note.data('index'),
          content = note.find('.content').text();

        var noteModel = this.collection.at(index);
        noteModel.save({
          content: content
        }, {
          success: function() {
            console.log('saved content');
          },
          failure: function() {
            console.log('failed to save content');
          }
        });
      },

      blurContent: function(event) {
        $(event.target).closest('.note').
          find('.content').blur();
      },

      updateColor: function(event) {
        var note = $(event.target).closest('.note'),
          index = note.data('index'),
          color = $(event.target).data('color'),
          noteModel = this.collection.at(index);

        noteModel.save({
          color: color
        }, {
          success: function() {
            noteModel.trigger('updateColor');
            console.log('saved color');
          },
          failure: function() {
            console.log('failed to save color');
          }
        });
      },

      render: function() {
        console.log('render');
        var notes = this.collection.toJSON();
        var compiledTemplate = Handlebars.compile(template);
        this.$el.html(compiledTemplate({
          notes: notes,
          colors: NoteColors
        }));

        this.initializeNotes();
      },

      initializeNotes: function() {
        var self = this;

        $('.note').each(function(index, value) {
          self.initializeNote($(value));
        });

        $('.note').draggable({
          containment: '#notes',
          handle: '.handle',
          stop: function(event, ui) {
            var note = $(event.target).closest('.note'),
              index = note.data('index'),
              noteModel = self.collection.at(index),
              newX = note.offset().left,
              newY = note.offset().top;

            note.data('x', newX);
            note.data('y', newY);

            note.effect('bounce', {
              distance: 4,
              times: 2
            }, 'fast');

            noteModel.save({
              x: newX,
              y: newY
            }, {
              success: function() {
                console.log('saved position');
              },
              failure: function() {
                console.log('failed to save position');
              },
            });
          }
        });

        $('.note').resizable({
          containment: '#notes',
          minWidth: 150,
          minHeight: 150,
          maxWidth: 500,
          maxHeight: 500,
          stop: function(event, ui) {
            var note = $(event.target),
              index = note.data('index'),
              noteModel = self.collection.at(index),
              newWidth = ui.size.width,
              newHeight = ui.size.height;

            note.data('width', newWidth);
            note.data('height', newHeight);

            noteModel.save({
              width: newWidth,
              height: newHeight
            }, {
              success: function() {
                console.log('saved size');
              },
              failure: function() {
                console.log('failed to save size');
              },
            });
          }
        });
      },

      initializeNote: function(note) {
        this.initializeSize(note);
        this.initializeColor(note);
        this.initializePosition(note);
      },

      initializeSize: function(note) {
        var width = note.data('width'),
          height = note.data('height');

        note.css('width', width + 'px');
        note.css('height', height + 'px');
      },

      initializePosition: function(note) {
        var x = note.data('x'),
          y = note.data('y');

        note.offset({
          left: x,
          top: y
        });
      },

      initializeColor: function(note) {
        var color = note.data('color');
        note.css('background-color', color);
      },

      enterPresentationMode: function(){
        $('.handle').hide();
        $('.note').resizable("disable");
      },

      exitPresentationMode: function() {
        $('.handle').show();
        $('.note').resizable("enable");
      }
    });

    return NotesView;
  });