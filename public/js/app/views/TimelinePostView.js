define(["app/app",
        "text!templates/timelinePostTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelinePostView = Ember.View.extend({
    templateName: 'timeline-post',
    template: Ember.Handlebars.compile(tpl),

    isEdit: false,
    isFormVisible: false,

    isOwner: function() {
      var userId = this.get('controller.session.currentUser')
      if (userId) userId = userId.id
      var ownerId = this.get('content.model.createdBy.id')
      return userId == ownerId
    }.property('content.model.createdBy'),

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      },

      toggleCommentForm: function() {
        this.toggleProperty('isFormVisible')

        if (!this.get('isFormVisible'))
          this.set('controller.newComment', '')
      }
    }
  })
})
