import Controller from '@ember/controller';

export default Controller.extend({
  page_title: 'Test Page',

  actions: {
    insert_stat: function() {
      console.log(this.get('credit'));
      var newPost = this.store.createRecord('user', {
        user_id: this.get('session.currentUser.uid'),
        email: this.get('session.currentUser.email'),
        credit: this.get('credit')
      });
      newPost.save();
    }

  }
});
