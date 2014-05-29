define(['views/toolbar', 'views/notes', 'models/note', 'collections/notes'], 
  function(ToolbarView, NotesView, NoteModel, NotesCollection){
  'use strict';

  var btApp = {
    initialize: function(){

      var notesCollection = new NotesCollection();
      
      notesCollection.fetch({
        success: function(collection, response, options){
          console.log('fetch success');
        },
        failure: function(collection, response, options){
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
    }    
  }
  return btApp;
});