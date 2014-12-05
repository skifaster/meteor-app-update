ReloadController = Class.extend(function(){

  var _self;
  var reload = Package.reload.Reload;
  var autoUpdate = Package.autoupdate.Autoupdate;
  var hasNewUpdateBool = new ReactiveVar(false);
  var reloadFunction = null;

  this.settings = {
    enabled: true,
    environments: {
      development: true,
      test: true,
      production: true
    }
  }

  this.preventReload = function() {
    if(!_self.settings.enabled)
      return;

    if(_self.settings.enabled) {
      var envSettings = Meteor.settings || {};
      if(!_.isUndefined(envSettings.public) && !_.isUndefined(envSettings.public.env))
      {
        if(!_self.settings.environments.development && envSettings.public.env == "development")
          return;

        if(envSettings.public.env == "test" && !_self.settings.environments.test)
          return;

        if(!_self.settings.environments.production && envSettings.public.env == "production")
          return;
      }

      reload._onMigrate(function(retry) {
        if(Session.get("MeteorReload-ManualReset")) {
          delete Session.keys["MeteorReload-ManualReset"]
          return [true,{}]
        }

        reloadFunction = retry;
        return false;
      })
    }
  }

  this.hasNewUpdate = function() {
    hasNewUpdateBool.set(autoUpdate.newClientAvailable());
    return hasNewUpdateBool.get();
  }

  this.manualReload = function() {
    Session.set("MeteorReload-ManualReset", true);
    reloadFunction();
  }

  this.constructor = function() {
    _self = this;
  }
});

g_reloadController = new ReloadController();