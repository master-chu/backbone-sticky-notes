define('collections/notes', ['backbone', 'localstorage', 'models/note'], function(Backbone, NoteModel){
  'use strict';
  
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage('collections/notes')
  });

  return NotesCollection;
});