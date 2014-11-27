ReloadController = function(options) {

  var reload = Package.reload.Reload;
  var autoUpdate = Package.autoupdate.Autoupdate;
  var hasNewUpdateBool = new ReactiveVar(false);
  var settings = {
    enabled: true,
    enabledOnProduction: true,
    enabledOnDevelopment: false,
    enabledOnMobile: true,
    enabledOnBrowser: true

  }

  var preventReload = function() {
    if(settings.enabled) {
      var envSettings = Meteor.settings || {};
      if(!_.isUndefined(envSettings.public) && !_.isUndefined(envSettings.public.env))
      {
        if(!settings.enabledOnDevelopment && envSettings.public.env == "development")
          return;

        if(!settings.enabledOnProduction && envSettings.public.env == "production")
          return;
      }

      reload._onMigrate(function() {
        return false;
      })
    }
  }

  var hasNewUpdate = function() {
    hasNewUpdateBool.set(autoUpdate.newClientAvailable());

    return hasNewUpdateBool.get();
  }

  var manualReload = function() {
    window.location.reload(true)
  }

  var applySettings = function() {

  }

  var init = function()  {
    _.extend(settings, options);

  }

  init();

  return {
    hasNewUpdate: hasNewUpdate,
    manualReload: manualReload,
    preventReload: preventReload,
    settings: settings
  }
}

reloadController = new ReloadController();