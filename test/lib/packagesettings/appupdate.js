if(Meteor.isClient) {
  AppUpdate.reload.settings.environments.development = true;
  AppUpdate.reload.preventReload();
}