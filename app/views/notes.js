define(function(require) {
  'use strict';
  var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    NoteModel = require('models/note'),
    NoteColors = require('utilities/note_colors'),
    template = require('text!templates/notes.html');
  require('jquery-ui');
  require('bootstrap');

  var NotesView = Backbone.View.extend({

    events: {
      'click .close-note': 'deleteNote',
      'mousedown .handle': 'blurContent',
      'mousedown .ui-resizable-handle': 'blurContent',
      'blur .content': 'updateContent',
      'click .color': 'updateColor',
      'mouseenter .note': 'enableEdit',
      'mouseleave .note': 'disableEdit',
      'click .increase-font-size': 'increaseFontSize',
      'click .decrease-font-size': 'decreaseFontSize',
      'mousedown .note': 'pretendToBringToFront'
    },

    render: function() {
      console.log('render');
      var notes = this.collection.toJSON();
      var compiledTemplate = Handlebars.compile(template);
      this.$el.html(compiledTemplate({
        notes: notes,
        colors: NoteColors
      }));

      this.zIndex = 0;
      this.inPresentationMode = false;
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
        minWidth: 225,
        minHeight: 75,
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
      this.initializeFontSize(note);
      this.initializeContent(note);
    },

    initializeSize: function(note) {
      var width = note.data('width'),
        height = note.data('height');

      note.css('width', width + 'px');
      note.css('height', height + 'px');

    },

    initializeColor: function(note) {
      var color = note.data('color');
      note.css('background-color', color);
    },

    initializePosition: function(note) {
      var x = note.data('x'),
        y = note.data('y');

      note.offset({
        left: x,
        top: y
      });
    },

    initializeFontSize: function(note) {
      var fontSize = note.data('font-size'),
        content = this.getContent(note);

      content.css('font-size', fontSize + 'px');
    },

    initializeContent: function(note) {
      var newContent = note.data('content'),
        content = this.getContent(note);

      content.html(newContent);
    },

    pretendToBringToFront: function(event) {
      var note = $(event.target).closest('.note'),
        index = this.getIndex(note),
        noteModel = this.collection.get(index);

      this.zIndex += 1;
      note.css('z-index', this.zIndex);
      console.log('z-index: ' + this.zIndex);
    },

    bringToFront: function(note) {
      console.log('bring to front');

      var index = this.getIndex(note),
        noteModel = this.collection.get(index);

      this.collection.remove(noteModel);
      this.collection.add(noteModel, {
        at: this.collection.length
      });

      noteModel.trigger('rearrange', noteModel, this.collection);
    },

    updateSize: function(event, ui) {
      var note = $(event.target),
        index = this.getIndex(note),
        noteModel = this.collection.get(index),
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
      this.bringToFront(note);
    },

    updateColor: function(event) {
      var note = this.getNote(event),
        index = this.getIndex(note),
        color = $(event.target).data('color'),
        noteModel = this.collection.get(index);

      noteModel.save({
        color: color
      }, {
        success: function() {
          console.log('saved color');
        },
        failure: function() {
          console.log('failed to save color');
        }
      });
      this.bringToFront(note);
      this.render();
    },

    updatePosition: function(event, ui) {
      var note = this.getNote(event),
        index = this.getIndex(note),
        noteModel = this.collection.get(index),
        newX = note.offset().left,
        newY = note.offset().top;

      note.data('x', newX);
      note.data('y', newY);

      note.effect('bounce', {
        distance: 4,
        times: 2
      }, 'fast', function() {

      });

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
      this.bringToFront(note);
    },

    updateContent: function(event) {
      var note = this.getNote(event),
        index = this.getIndex(note),
        newContent = this.getContent(note).html();

      var noteModel = this.collection.get(index);
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
      this.bringToFront(note);
    },

    enterPresentationMode: function() {
      var handles = $('.handle'),
        handleHeight = handles.height(),
        notes = $('.note'),
        contents = $('.content');

      handles.hide();
      contents.attr('contenteditable', 'false');

      notes.mousedown(function(event) {
        event.stopPropagation();
      });

      notes.each(function(index, value) {
        $(value).height(function(index, noteHeight) {
          return noteHeight - handleHeight;
        });
      });

      this.inPresentationMode = true;
    },

    exitPresentationMode: function() {
      this.render();
      this.inPresentationMode = false;
    },

    addNote: function(param) {
      var self = this;
      self.collection.create({ /* see model defaults */ }, {
        success: function() {
          self.render();
          console.log('created new note');
        }
      });

    },

    deleteNote: function(event) {
      var note = this.getNote(event),
        index = this.getIndex(note);

      var noteModel = this.collection.get(index);
      noteModel.destroy({
        success: function() {
          console.log('destroyed model');
        },
        failure: function() {
          console.log('failed to destroy model');
        }
      });
      this.render();
    },

    deleteAllNotes: function(param) {
      this.collection.destroyAllModels();
      this.render();
    },

    increaseFontSize: function(event) {
      var note = this.getNote(event),
        content = this.getContent(note),
        currentFontSize = parseInt(content.css('font-size'), 10),
        newFontSize = currentFontSize + 8,
        index = this.getIndex(note);

      if (newFontSize <= 50) {
        content.css('font-size', newFontSize + 'px');
        var noteModel = this.collection.get(index);
        noteModel.save({
          fontSize: newFontSize
        }, {
          success: function() {
            console.log('saved font size');
          },
          failure: function() {
            console.log('failed to save font size');
          }
        });
      }
    },

    decreaseFontSize: function(event) {
      var note = this.getNote(event),
        content = this.getContent(note),
        currentFontSize = parseInt(content.css('font-size'), 10),
        newFontSize = currentFontSize - 8,
        index = this.getIndex(note);

      if (newFontSize >= 10) {
        content.css('font-size', newFontSize + 'px');
        var noteModel = this.collection.get(index);
        noteModel.save({
          fontSize: newFontSize
        }, {
          success: function() {
            console.log('saved font size');
          },
          failure: function() {
            console.log('failed to save font size');
          }
        });
      }
    },

    blurContent: function(event) {
      var note = this.getNote(event),
        content = this.getContent(note);

      content.blur();
    },

    enableEdit: function(event) {
      var note = this.getNote(event),
        content = this.getContent(note),
        zIndex = note.css('z-index');

      if (!this.inPresentationMode) {
        note.resizable('enable');
        content.css('overflow', 'scroll');
      }

      $('.ui-resizable-handle').css('z-index', zIndex);
    },

    disableEdit: function(event) {
      var note = this.getNote(event),
        content = this.getContent(note);

      content.css('overflow', 'hidden');
      note.resizable('disable');
    },

    getNote: function(event) {
      return $(event.target).closest('.note');
    },

    getContent: function(note) {
      return note.find('.content');
    },

    getIndex: function(note) {
      return note.data('id');
    }
  });

  return NotesView;
});