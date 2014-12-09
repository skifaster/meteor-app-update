if (Meteor.isClient) {

  Template.forceServerUpdate.events({
    "click #forceUpdate": function() {
      Meteor.call("makeServerUpdate", function(error, result) {

      });
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    makeServerUpdate: function() {
      console.log('server here!!');
      var fs = Npm.require("fs");

      var path = process.env.PWD + "/";
      var fileName = "testchange.js"

      fs.writeFileSync(path + fileName, "var a = 'b-" + Random.id() + "';");
    }
  })
}
