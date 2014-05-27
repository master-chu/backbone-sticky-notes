define(['views/notes', 'models/note', 'collections/notes'], function(NotesView, NoteModel, NotesCollection){
  'use strict';
  var btApp = {
    initialize: function(){
      var note1 = new NoteModel({
        content: 'The first note'
      });
      var note2 = new NoteModel({
        color: 'red',
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
    }    
  }
  return btApp;
});