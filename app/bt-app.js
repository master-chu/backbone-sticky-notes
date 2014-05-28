define(['views/toolbar', 'views/notes', 'models/note', 'collections/notes'], 
  function(ToolbarView, NotesView, NoteModel, NotesCollection){
  'use strict';

  var btApp = {
    initialize: function(){
      var note1 = new NoteModel({
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        color: 'crimson',
        content: 'The first note'
      });
      var note2 = new NoteModel({
        x: 500,
        y: 100,
        width: 200,
        height: 300,
        color: 'skyblue',
        content: 'The second note'
      });

      var notesCollection = new NotesCollection();
      notesCollection.add([
        note1,
        note2
      ]);

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