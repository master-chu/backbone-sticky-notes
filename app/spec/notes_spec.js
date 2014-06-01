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

    afterEach(function() {
      notesCollection.destroyAllModels(true);
    });

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

      afterEach(function() {
        notesCollection.destroyAllModels(true);
      });

      it('should add the first element', function() {
        expect(notesCollection.length).toBe(1);
      });

      it('should add to the end of an empty list', function() {
        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
      });

      it('should set the sort index to be the end of the list', function() {
        var newNoteModel = new NoteModel();
        notesCollection.add(newNoteModel);
        expect(newNoteModel.get('sortIndex')).toBe(1);
      });

      it('should add to the end of a 1 element list', function() {
        notesCollection.add(new NoteModel());
        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
        expect(notesCollection.at(1).get('sortIndex')).toBe(1);
      });
    });

    describe('Inserting notes with existing sortIndices into an empty list', function() {
      beforeEach(function() {
        notesCollection = new NotesCollection();
      });

      afterEach(function() {
        notesCollection.destroyAllModels(true);
      });

      it('should preserve the sort index even when empty', function() {
        var noteModel = new NoteModel({
          sortIndex: 3
        });
        notesCollection.add(noteModel);
        expect(notesCollection.at(0).get('sortIndex')).toBe(3);
      });
    });

    describe('Inserting/adding notes with existing sortIndices into a sorted list', function() {
      beforeEach(function() {
        notesCollection = new NotesCollection([{
          sortIndex: 0,
          color: 'red'
        }, {
          sortIndex: 1,
          color: 'blue'
        }, {
          sortIndex: 2,
          color: 'green'
        }]);
      });

      afterEach(function() {
        notesCollection.destroyAllModels(true);
      });

      it('should allow for a manual call to updateSortIndices', function() {
        var noteModel = new NoteModel({
          sortIndex: 1,
          color: 'pink'
        });
        notesCollection.add(noteModel, {
          at: noteModel.get('sortIndex')
        });

        notesCollection.updateSortIndices();

        expect(notesCollection.at(0).get('color')).toBe('red');
        expect(notesCollection.at(1).get('color')).toBe('pink');
        expect(notesCollection.at(2).get('color')).toBe('blue');
        expect(notesCollection.at(3).get('color')).toBe('green');

        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
        expect(notesCollection.at(1).get('sortIndex')).toBe(1);
        expect(notesCollection.at(2).get('sortIndex')).toBe(2);
        expect(notesCollection.at(3).get('sortIndex')).toBe(3);
      });

      it('should update the sort index for all models on removal', function() {
        notesCollection.remove(notesCollection.at(1));

        expect(notesCollection.at(0).get('color')).toBe('red');
        expect(notesCollection.at(1).get('color')).toBe('green');

        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
        expect(notesCollection.at(1).get('sortIndex')).toBe(1);
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

      afterEach(function() {
        notesCollection.destroyAllModels(true);
      });

      it('should compare using sortIndex', function() {
        expect(notesCollection.comparator).toBe('sortIndex');
      });

      it('should sort by sortIndex on creation', function() {
        expect(notesCollection.at(0).get('sortIndex')).toBe(0);
        expect(notesCollection.at(1).get('sortIndex')).toBe(1);
        expect(notesCollection.at(2).get('sortIndex')).toBe(2);
      });

    });

  });
});