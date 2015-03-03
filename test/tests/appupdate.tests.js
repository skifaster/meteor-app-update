var env = require('system').env;
var url = "http://localhost:3000";

describe("AppUpdate", function() {
  before(function() {
    casper.start(url);
  });
  it("should have a global AppUpdate class", function() {
    casper.then(function() {
      var evalRes = this.evaluate(function() {
        return (_.isObject(AppUpdate))
      });
      evalRes.should.equal(true);
    })
  });
  it("should have a 'reload' object", function() {
    casper.then(function() {
      var evalRes = this.evaluate(function() {
        return (_.isObject(AppUpdate.reload))
      });
      evalRes.should.equal(true);
    })
  });
  it("should have a 'reload.hasNewUpdate' function", function() {
    casper.then(function() {
      var evalRes = this.evaluate(function() {
        return (_.isFunction(AppUpdate.reload.hasNewUpdate))
      });
      evalRes.should.equal(true);
    })
  });
  it("should have a 'reload.preventReload' function", function() {
    casper.then(function() {
      var evalRes = this.evaluate(function() {
        if(_.isFunction(AppUpdate.reload.preventReload)) {
          AppUpdate.reload.settings.environments.development = true;
          AppUpdate.reload.preventReload();
          return true;
        }
        return false
      });
      evalRes.should.equal(true);
    })
  });
  it("should be enabled and enabled in development", function() {
    casper.then(function() {
      var evalRes = this.evaluate(function() {
        return AppUpdate.reload.settings.enabled && AppUpdate.reload.settings.environments.development;
      });
      evalRes.should.equal(true);
    })
  });
  it("should force an update", function() {
    casper.options.waitTimeout = 20000;
    casper.then(function() {
      this.click("#forceUpdate");
    })

  });
  it("should show update prompt", function () {
    casper.then(function() {
      this.waitForSelector(".appupdate-prompt");

    });
  });
  it("should have an update to apply", function() {
    casper.then(function() {
      var evalRes = this.evaluate(function() {
        return AppUpdate.reload.hasNewUpdate();
      });
      evalRes.should.equal(true);
    })
  });
  it("should apply update to client", function() {
    casper.then(function() {
      var meteorReload = this.evaluate(function() {
        AppUpdate.reload.manualReload();
        return Session.get("MeteorReload-ManualReset");
      })
      this.reload();
    })

    casper.waitWhileSelector('.appupdate-prompt', function() {
    });

    casper.then(function() {
      var evalRes = this.evaluate(function() {
        return AppUpdate.reload.hasNewUpdate();
      });
      evalRes.should.equal(false);
    })
  })

})