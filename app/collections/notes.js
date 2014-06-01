define(['backbone', 'models/note', 'localstorage'], function(Backbone, NoteModel) {
  'use strict';

  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage('Master Chu\'s Sticky Notes'),
    comparator: 'sortIndex',

    initialize: function() {

      this.on('add', function(noteModel, notesCollection, options) {
        notesCollection.checkIfNewNote(noteModel);
      });

      this.on('remove', function(noteModel, notesCollection, options) {
        notesCollection.updateSortIndices();
      });

      this.on('rearrange', function(noteModel, notesCollection) {
        notesCollection.updateSortIndices();
      })
    },

    checkIfNewNote: function(noteModel) {
      if (noteModel.get('sortIndex') === -1) {
        var newEndOfList = this.length - 1;
        noteModel.set('sortIndex', newEndOfList);
        this.sort();
      }
    },

    updateSortIndices: function() {
      this.each(function(model, index, someThirdThingUnknown) {
        model.set({
          sortIndex: index
        })
      });
      console.log('updated sort indices');
      this.saveAllModels();
    },

    saveAllModels: function() {
      this.each(function(model, index, someThirdThingUnknown) {
        model.save({}, {
          success: function() {
            console.log('saved ' + model.get('color'));
          }
        });
      });
    },

    destroyAllModels: function(silentAndWait) {
      silentAndWait = silentAndWait || false
      while (!this.isEmpty()) {
        var noteModel = this.at(0);
        noteModel.destroy({
          wait: silentAndWait,
          silent: silentAndWait
        });
      }
    }

  });

  return NotesCollection;
});