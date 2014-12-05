Package.describe({
  "name": "arsnebula:appupdate",
  "summary": "Control Meteor Hotcode push and gracefully notify the user of an update.",
  "version": "1.0.0",
  "git": "git@bitbucket.org:arsnebula/meteor-appupdate.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@0.9.2");
  api.use("meteor-platform");
  api.use("reactive-var");
  api.use("arsnebula:classx")

  api.addFiles(
    [
      "lib/js/classes/reloadcontroller.js",
      "lib/templates/newupdatealert/newupdatealert.html",
      "lib/templates/newupdatealert/newupdatealert.css",
      "lib/templates/newupdatealert/newupdatealert.js",
      "_namespace.js"
    ], ["client"])

  api.export("AppUpdate");

});
