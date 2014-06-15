define(function(require){
  'use strict';
  var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    template = require('text!templates/toolbar.html'),
    infoTemplate = require('text!templates/info.html');
  require('bootstrap');

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