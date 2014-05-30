define(['views/toolbar', 'views/notes', 'models/note', 'collections/notes'],
  function(ToolbarView, NotesView, NoteModel, NotesCollection) {
    'use strict';

    var btApp = {
      initialize: function() {

        var notesCollection = new NotesCollection();
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
        notesView.listenTo(notesCollection, 'add', notesView.render);
        notesView.listenTo(notesCollection, 'remove', notesView.render);
        notesView.listenTo(notesCollection, 'updateColor', notesView.render);

        this.inPresentationMode = false;
        this.bindKeyboardShortcuts(toolbarView, notesView);
      },

      bindKeyboardShortcuts: function(toolbarView, notesView) {
        var self = this;
        $('body').keydown(function(event) {
          var focusedOnUserInput = $(document.activeElement).hasClass('content'),
            pressedKey = event.keyCode,
            p = 80;

          if (!focusedOnUserInput && pressedKey == p) {
            self.togglePresentationMode(toolbarView, notesView);
          }
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