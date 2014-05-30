define(['models/note', 'collections/notes'], function(NoteModel, NotesCollection) {
  'use strict';

  var notesCollection;

  beforeEach(function(){
    notesCollection = new NotesCollection();
  });

  afterEach(function(){
    
  });

  describe('Note Model', function() {

    it('should have a sortIndex attribute', function(){
      var noteModel = new NoteModel();
      expect(noteModel.sortIndex).toBeDefined();
    });

  });

  describe('Notes Collection', function() {

    it('should exist and be empty by default', function() {
      expect(notesCollection.length).toBe(0);
    });

    it('should add the first element', function() {
      var noteModel = new NoteModel();
      notesCollection.add(noteModel);
      expect(notesCollection.length).toBe(1);
    });
  });
});