define(['backbone', 'handlebars', 'text!templates/toolbar.html', 'jquery-ui'], 
  function(Backbone, Handlebars, template){
  'use strict';

  var ToolbarView = Backbone.View.extend({
    events: {
      'click #new-note': 'newNoteHandler'
    },

    newNoteHandler: function(){
      this.trigger('newNote', 'Woo!');
    },

    render: function(){
      var compiledTemplate = Handlebars.compile(template);
      this.$el.html(compiledTemplate());
    }
  });
  return ToolbarView;
});