import Controller from '@ember/controller';

export default Controller.extend({
	sortProperties: ['timestamp'],
  sortAscending: false, // sorts post by timestamp
  actions: {
    publishPost: function() {
      var newPost = this.store.createRecord('post', {
        title: this.get('title'),
        body: this.get('body'),
        timestamp: new Date().getTime()
      });
      newPost.save();
    }
  }
});
