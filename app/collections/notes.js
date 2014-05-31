define(['backbone', 'models/note', 'localstorage'], function(Backbone, NoteModel) {
  'use strict';

  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage('Master Chu\'s Sticky Notes'),
    comparator: 'sortIndex',

    initialize: function() {

      this.on('add', function(noteModel, notesCollection, options) {
        if (noteModel.get('sortIndex') === -1) {
          var newEndOfList = notesCollection.length - 1;
          noteModel.set('sortIndex', newEndOfList);
          notesCollection.sort();
        } else {
          notesCollection.updateSortIndices();
        }
      });

      this.on('remove', function(noteModel, notesCollection, options) {
        notesCollection.updateSortIndices();
      });
    },

    updateSortIndices: function() {
      this.each(function(model, index, someThirdThingUnknown) {
        model.set('sortIndex', index);
      });

      console.log('updated sort indices');
    }
  });

  return NotesCollection;
});