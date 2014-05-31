define(['backbone', 'handlebars', 'models/note', 'utilities/note_colors', 'text!templates/notes.html', 'jquery-ui', 'bootstrap'],
  function(Backbone, Handlebars, NoteModel, NoteColors, template) {
    'use strict';

    var NotesView = Backbone.View.extend({

      events: {
        'click .close': 'deleteNote',
        'mousedown .handle': 'blurContent',
        'mousedown .ui-resizable-handle': 'blurContent',
        'blur .content': 'updateContent',
        'click .color': 'updateColor',
        'click .bring-to-front': 'bringToFront',
        'mouseenter .note': 'enableEdit',
        'mouseleave .note': 'disableEdit'
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
        var self = this,
          notes = $('.note');

        notes.each(function(index, value) {
          self.initializeNote($(value));
        });

        notes.draggable({
          containment: '#notes',
          handle: '.handle',
          stop: function(event, ui) {
            self.updatePosition(event, ui);
          }
        });

        notes.resizable({
          containment: '#notes',
          minWidth: 150,
          minHeight: 150,
          maxWidth: 500,
          maxHeight: 500,
          stop: function(event, ui) {
            self.updateSize(event, ui);
          }
        });

        notes.resizable('disable');
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

      bringToFront: function(event) {
        console.log('bring to front');

        var note = $(event.target).closest('.note'),
          index = note.data('index'),
          noteModel = this.collection.at(index);

        this.collection.remove(noteModel);
        this.collection.add(noteModel, {
          at: this.collection.length
        });

        this.collection.each(function(model) {
          if (model.changedAttributes()) {
            model.save({}, {
              success: function() {
                console.log('moved to front');
              }
            });
          }
        });
      },

      updateSize: function(event, ui) {
        var note = $(event.target),
          index = note.data('index'),
          noteModel = this.collection.at(index),
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

      updatePosition: function(event, ui) {
        var note = $(event.target).closest('.note'),
          index = note.data('index'),
          noteModel = this.collection.at(index),
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
      },

      updateContent: function(event) {
        var note = $(event.target).closest('.note'),
          index = note.data('index'),
          newContent = note.find('.content').text();

        var noteModel = this.collection.at(index);
        if (noteModel.get('content') !== newContent) {
          noteModel.save({
            content: newContent
          }, {
            success: function() {
              console.log('saved content');
            },
            failure: function() {
              console.log('failed to save content');
            }
          });
        }
      },

      enterPresentationMode: function() {
        var handleHeight = $('.handle').height(),
          notes = $('.note'),
          content = $('.content');

        $('.handle').hide();
        notes.resizable('disable');
        content.attr('contenteditable', 'false');

        notes.each(function(index, value) {
          $(value).height(function(index, noteHeight) {
            return noteHeight - handleHeight;
          });
        });
      },

      exitPresentationMode: function() {
        var handleHeight = $('.handle').height(),
          notes = $('.note'),
          content = $('.content');

        $('.handle').show();
        notes.resizable('enable');
        content.attr('contenteditable', 'true');

        notes.each(function(index, value) {
          $(value).height(function(index, noteHeight) {
            return noteHeight + handleHeight;
          });
        });
      },

      addNote: function(param) {
        this.collection.create({ /* see model defaults */ }, {
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

      blurContent: function(event) {
        var note = $(event.target).closest('.note'),
          content = note.find('.content');

        content.blur();
      },

      enableEdit: function(event) {
        var note = $(event.target).closest('.note');
        note.resizable('enable');
      },

      disableEdit: function(event) {
        var note = $(event.target).closest('.note');
        note.resizable('disable');
      },

    });

    return NotesView;
  });