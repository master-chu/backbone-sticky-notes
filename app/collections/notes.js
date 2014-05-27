define(['backbone', 'models/note'], function(Backbone, NoteModel){
  'use strict';

  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel
  });

  return NotesCollection;
});