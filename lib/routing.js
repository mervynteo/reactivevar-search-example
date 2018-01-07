//////////////// Routes for public /////////////////////////
FlowRouter.route('/notFound', {
   action() { BlazeLayout.render('notFound'); }
});

var publicRoutes = FlowRouter.group({
   triggersEnter: [function(context, redirect) { 
      if( Meteor.userId() ){ 
         redirect('new'); 
      }
   }]
});
      publicRoutes.route('/', {
         name: 'home',
         action(){ BlazeLayout.render('home'); }
      });
      publicRoutes.route('/login', {
         name: 'login',
         action(){ BlazeLayout.render('login'); }
      });
      publicRoutes.route('/register', {
         name: 'register',
         action(){ BlazeLayout.render('register'); }
      });



//////////////// Routes for logged in users /////////////////////////

var loggedinRoutes = FlowRouter.group({
   triggersEnter: [function(context, redirect){
      if( !Meteor.user() && !Meteor.loggingIn() ){  
         redirect('/'); 
      }
   }]
});
   /////////////////  post routes //////////////////
      loggedinRoutes.route('/new', {
         name    : 'new',
         action  : function() { 
            //BlazeLayout.render('newPosts');  
            BlazeLayout.render('MainLayout', { content: 'newPosts' });
         }
      });
      loggedinRoutes.route('/posts/:id/edit', { //with _id
         name: 'postEdit',
         action: function(params, queryParams) {
            BlazeLayout.render('MainLayout', { content: 'postEdit' });
         }
      });
      loggedinRoutes.route('/search', {
         action: function() {
            BlazeLayout.render('MainLayout', { content: 'searchPosts' });
         }
      });


      /////////////////  profile routes //////////////////
      loggedinRoutes.route('/profile', {
         name: 'profile',
         action: function() { 
            BlazeLayout.render('MainLayout', { content: 'profile' });
         }
      }); 
      loggedinRoutes.route('/users/:_id', { 
      //loggedinRoutes.route('/users/:id', {  //doesnt work, says no path
         name: 'users.show',
         action: function(params, queryParams) { 
            if( params._id === Meteor.userId() ) {
               FlowRouter.go('profile');
            } else {
               BlazeLayout.render('MainLayout', { content: 'usersShow' });
            }
         }
      });
