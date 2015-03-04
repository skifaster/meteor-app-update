Package.describe({
  "name": "arsnebula:appupdate",
  "summary": "Control Meteor Hotcode push and gracefully notify the user of an update.",
  "version": "1.0.3",
  "git": "https://github.com/arsnebula/meteor-app-update.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  api.use("meteor-platform");
  api.use("reactive-var");
  api.use("arsnebula:classx@2.0.5");

  api.addFiles(
    [
      "lib/js/appupdate.namespace.js",
      "lib/js/classes/reloadcontroller.js",
      "lib/templates/newupdatealert/newupdatealert.html",
      "lib/templates/newupdatealert/newupdatealert.css",
      "lib/templates/newupdatealert/newupdatealert.js",
    ], ["client"])

  api.export("AppUpdate");

});
