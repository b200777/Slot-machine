import Route from '@ember/routing/route';

export default Route.extend({
  //beforeModel is needed to know whether we're logged in or not (aka session data)
  beforeModel: function() {
    return this.get('session').fetch()
      .then(() => {
        this.transitionTo('game');
      })
      .catch(() => {});
  }
});
