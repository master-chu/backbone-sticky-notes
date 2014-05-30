define(['models/note', 'collections/notes'], function(NoteModel, NotesCollection) {
  'use strict';

  describe('Note Model', function() {
    var noteModel = new NoteModel();

    it('should have a sortIndex attribute', function() {
      expect(noteModel.get('sortIndex')).toBeDefined();
    });

    it('should have a sortIndex of -1 before being added', function() {
      expect(noteModel.get('sortIndex')).toBe(-1);
    });

  });

  describe('Notes Collection', function() {

    var notesCollection;

    it('should exist and be empty by default', function() {
      notesCollection = new NotesCollection();
      expect(notesCollection.length).toBe(0);
    });

    describe('Adding unaltered (default) notes', function() {
      beforeEach(function() {
        notesCollection = new NotesCollection();
        var noteModel = new NoteModel();
        notesCollection.add(noteModel);
      });

      it('should add the first element', function() {
        expect(notesCollection.length).toBe(1);
      });

      it('should add to the end of an empty list', function() {
        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
      });

      it('should add to the end of a 1 element list', function() {
        notesCollection.add(new NoteModel());
        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
        expect(notesCollection.at(1).get('sortIndex')).toBe(1);
      });
    });

    describe('Inserting/adding notes with existing sortIndeces', function(){
      beforeEach(function() {
        emptyNotesCollection = new NotesCollection();

        notesCollection = new NotesCollection([{
          sortIndex: 2
        }, {
          sortIndex: 0
        }, {
          sortIndex: 1
        }]);
      });

      it('should add to an empty list without changing the sort index', function(){

      });
    });

    describe('Sorting by sortIndex', function() {
      beforeEach(function() {
        notesCollection = new NotesCollection([{
          sortIndex: 2
        }, {
          sortIndex: 0
        }, {
          sortIndex: 1
        }]);
      });

      it('should compare using sortIndex', function() {
        expect(notesCollection.comparator).toBe('sortIndex');
      });

      it('should sort by sortIndex on creation', function() {
        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
        expect(notesCollection.at(1).get('sortIndex')).toBe(1);
        expect(notesCollection.at(2).get('sortIndex')).toBe(2);
      });

      it('should sort when a model is added with a specified sort index', function() {
        notesCollection.unshift(new NoteModel({sortIndex: 3}));
        expect(notesCollection.at(3).get('sortIndex')).toBe(3);
      });

    });
  
  });
});