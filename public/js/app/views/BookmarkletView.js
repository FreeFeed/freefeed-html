define(["app/app",
        "text!templates/bookmarkletTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.BookmarkletView = Ember.View.extend({
    templateName: 'bookmarklet',
    template: Ember.Handlebars.compile(tpl),

    didInsertElement: function() {
      var field = this.$("#bookmarklet-recipients")
      field.select2({ width: '100%' })

      // When the select2 became multiline it change bookmarklet height, but we can't
      // handle this via CSS rules, so use JS to increase iframe size accordingly
      // Only way to interact with the scripts outside the iframe is postMessage
      field.on('change', function() {
        window.parent.postMessage(window.document.documentElement.offsetHeight, '*')
      })
    },

    selectInstagramThumbnail: function() {
      var re = /https?:\/\/www\.instagram\.com\/p\/([\w-]+)\//i;
      var m = document.referrer.match(re)
      if (m && m[1]) {
        location.hash = 'https://www.instagram.com/p/' + m[1] + '/media/?size=l'
      }
    }.on('didInsertElement'),

    selectYoutubeThumbnail: function() {
      var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)[?=&+%\w.-]*/i;
      var m = document.referrer.match(re)
      if (m && m[1]) {
        location.hash = 'https://i.ytimg.com/vi/' + m[1] + '/hqdefault.jpg'
      }
    }.on('didInsertElement')
  })
})
