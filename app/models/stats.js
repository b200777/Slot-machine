import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.attr('string'),
  email: DS.attr('string'),
  score: DS.attr('string')
});
