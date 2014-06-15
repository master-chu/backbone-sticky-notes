define(['backbone', 'handlebars', 'text!templates/toolbar.html', 'text!templates/info.html', 'bootstrap'], 
  function(Backbone, Handlebars, template, infoTemplate){
  'use strict';

  var ToolbarView = Backbone.View.extend({
    events: {
      'click #new-note': 'newNote',
      'click #delete-all-notes': 'deleteAllNotes',
    },

    render: function(){
      var compiledTemplate = Handlebars.compile(template);
      this.$el.html(compiledTemplate());

      var info = $('#info');
      info.data('content', infoTemplate);
      info.popover();
    },

    newNote: function(){
      this.trigger('newNote', 'Woo!');
    },

    deleteAllNotes: function(){
      this.trigger('deleteAllNotes');
    },

    enterPresentationMode: function(){
      this.$el.hide('fast');
    },

    exitPresentationMode: function(){
      this.$el.show();
    }
  });
  return ToolbarView;
});