import Route from '@ember/routing/route';


export default Route.extend({
  //beforeModel is needed to know whether we're logged in or not (aka session data)
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

   model: function() {
    var stats = this.get('store').findAll('user').then(results => results.sortBy('credit').reverse());

console.log(stats);
     return stats;
  //   sortedResults(stats);
  },

});
