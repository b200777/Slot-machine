import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | testpage', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:testpage');
    assert.ok(route);
  });
});
