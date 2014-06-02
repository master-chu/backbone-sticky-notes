define(['backbone', 'handlebars', 'text!templates/toolbar.html'], 
  function(Backbone, Handlebars, template){
  'use strict';

  var ToolbarView = Backbone.View.extend({
    events: {
      'click #new-note': 'newNote',
      'click #delete-all-notes': 'deleteAllNotes'
    },

    newNote: function(){
      this.trigger('newNote', 'Woo!');
    },

    deleteAllNotes: function(){
      this.trigger('deleteAllNotes');
    },

    render: function(){
      var compiledTemplate = Handlebars.compile(template);
      this.$el.html(compiledTemplate());
    },

    enterPresentationMode: function(){
      this.$el.hide();
    },

    exitPresentationMode: function(){
      this.$el.show();
    }
  });
  return ToolbarView;
});