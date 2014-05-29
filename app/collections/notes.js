define(['backbone', 'models/note', 'localstorage'], function(Backbone, NoteModel){
  'use strict';
  
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("Master Chu's Sticky Notes")
  });

  return NotesCollection;
});