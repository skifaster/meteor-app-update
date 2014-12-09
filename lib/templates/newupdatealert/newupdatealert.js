Template.appUpdatePrompt.helpers({
  appHasUpdate: function() {
    return AppUpdate.reload.hasNewUpdate();
  }
});

Template.appUpdatePrompt.rendered = function() {
  this.find('#newUpdateWatcher')._uihooks = {
    insertElement: function(node, next) {
      $(node)
      .insertBefore(next)
      .addClass("fadeInDown");
    }
  }
}

Template.appUpdatePrompt.events({
  "click .reload": function() {
    AppUpdate.reload.manualReload();
  }
})