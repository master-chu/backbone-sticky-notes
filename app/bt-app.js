define(function(require) {
    'use strict';
    var ToolbarView = require('views/toolbar'),
      NotesView = require('views/notes'),
      NoteModel = require('models/note'),
      NotesCollection = require('collections/notes');
      
    var btApp = {
      initialize: function() {

        var notesCollection = new NotesCollection();
        console.log('about to fetch...');
        notesCollection.fetch({
          success: function(collection, response, options) {
            console.log('fetch success');
          },
          failure: function(collection, response, options) {
            console.log('failed fetch');
          }
        });

        var notesView = new NotesView({
          collection: notesCollection
        });
        notesView.setElement('#notes');
        notesView.render();

        var toolbarView = new ToolbarView();
        toolbarView.setElement('#toolbar');
        toolbarView.render();

        notesView.listenTo(toolbarView, 'newNote', notesView.addNote);
        notesView.listenTo(toolbarView, 'deleteAllNotes', notesView.deleteAllNotes);



        this.inPresentationMode = false;
        this.bindPresentationModeShortcuts(toolbarView, notesView);
      },

      bindPresentationModeShortcuts: function(toolbarView, notesView) {
        var self = this;
        $('body').keydown(function(event) {
          var focusedOnUserInput = $(document.activeElement).hasClass('content'),
            pressedKey = event.keyCode,
            p = 80;

          if (!focusedOnUserInput && pressedKey == p) {
            self.togglePresentationMode(toolbarView, notesView);
          }
        });

        $('.p').click(function(){
          self.togglePresentationMode(toolbarView, notesView);
        });
      },

      togglePresentationMode: function(toolbarView, notesView) {
        if(this.inPresentationMode) {
          toolbarView.exitPresentationMode();
          notesView.exitPresentationMode();
        } else {
          toolbarView.enterPresentationMode();
          notesView.enterPresentationMode();
        }

        this.inPresentationMode = !this.inPresentationMode;
      }
    }
    return btApp;
  });