import Component from '@ember/component';

export default Component.extend({
  pos: 0,
  didInsertElement() {
    this._super(...arguments);

    this.$(`#${this.get('id')}`).slotMachine({
      active: this.get('pos'),
      delay: 450,
      auto: 3000
    });
  }
});
