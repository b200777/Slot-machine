import Controller from '@ember/controller';
import { observer } from '@ember/object';

export default Controller.extend({
  new_user: null,
  just_logged_in: false, //to prevent setting session data twice

  actions: {
    toGame: function() {
      this.transitionToRoute('game');
    },

    toPlayerChart: function(){
    this.transitionToRoute('stats');
      // TODO: call transitionToRoute to stats page
    },

    //log in the user ('provider' will be google)
    signIn: function(provider) {
      this.set('just_logged_in', true);
      var self = this; //so we can access "this" inside the GET

      //step 1. log em in
      this.get('session').open('firebase', {
        provider: provider
      }).then(function(data) {
        self.set('new_user', null);
        console.log("Logged in as: " + data.currentUser.email);

        //step 2. check to see if this user is a new user (based on email), if old user set session data
        self.store.findAll('user').then(function(users) {
          users.forEach(function(user) {
            if (data.currentUser.email == user.email) {
              self.set('new_user', false);

              //set session data
              console.log("welcome back!");
              self.set('session.currentUser.credits', user.credit);
            }
          });

          //new user!
          if (self.get('new_user') == null) {
            self.set('new_user', true)
          }
        }).then(function() {

          //step 3. if new user, give em 500 credits to start off with. then set session data
          if (self.get('new_user')) {
            console.log("new user, welcome! here's 500 credit");
            var new_user_post = self.store.createRecord('user', {
              user_id: data.currentUser.uid,
              email: data.currentUser.email,
              credit: 500
            });
            new_user_post.save();

            //set session data
            self.set('session.currentUser.credits', 500);
          }
        });

      })
      .then(() => {
        this.transitionToRoute('game');
      });
    },

    //sign out the user
    signOut: function() {
      this.get('session').close();
      this.transitionToRoute('login');
    },

    test: function() {
      console.log("test function: ");
    }
  },

  //looks at logged in user and pulls in extra values from firebase from that user (like their 'credits')
  set_user_data: function() {
    var self = this;
    var my_email = this.get('session.currentUser.email');

    self.store.findAll('user').then(function(users) {
      users.forEach(function(user) {
        if (my_email == user.email) {
          //set session data
          console.log("Hello " + user.email);
          self.set('session.currentUser.credits', user.credit);
        }
      });
    });
  },

  //check is authentication data has been loaded
  observe_session_load: observer ('session.isAuthenticated', function() {
    if (this.get('session.isAuthenticated') && !this.get('just_logged_in')) {
      this.set_user_data();
    }
  })
});
