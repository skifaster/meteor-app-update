AppUpdate = {}
AppUpdate.Class = ClassX.extend(ClassX.Class, function(base) {
  Object.defineProperty(this, "namespace", { get: function() {return AppUpdate;}})

  var getNamespace = function() { return Panorama; };

  this.constructor = function AppUpdate() {
    if(base && base.constructor) base.constructor.call(this);
  }
})