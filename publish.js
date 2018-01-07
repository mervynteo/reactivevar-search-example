Meteor.publish('posts', function() {
	return Posts.find();  
});

//reactiveVar search function
Meteor.publish( 'searchposts', function( search ) {			// search = query from client 
	check( search, Match.OneOf( String, null, undefined ) );	// check if either string, bull or undefined

  	let query  = { },											//new obj passed as query to call to Posts.find()
	  	projection = { limit: 10, sort: { title: 1 } };

  	if ( search ) {
    	let regex = new RegExp( search, 'i' );
	   query = {
	   	$or: [
	   		{ title	 : regex },
	        	{ message : regex }
	      ]
	   };
   	projection.limit = 50;
  	}
  	return Posts.find( query, projection );
});


//User stuff - cannot use ES6 format ..throws error
Meteor.publish('me', function() {
	if (!this.userId) this.ready();
	else return [
		Meteor.users.find( this.userId, {
			fields: { profile: 1, username: 1, profileImg: 1, emails: 1, md5hash: 1 }
    	}), 
     	Posts.find({ userId: this.userId })
	];
});

Meteor.publish('otherUser', function(_id) {
	if(!_id) this.ready();

	else { 

		check(_id, String);
		return [
			Meteor.users.find(_id, { 
				fields: { profile: 1, username: 1, profileImg: 1, emails: 1, md5hash: 1 }
			}), 
     		Posts.find({ userId: _id })
		];
		
	}
});

Meteor.publish('allUsers', function() {
  	return Meteor.users.find( {}, { 
  		fields: { profile: 1, username: 1, profileImg: 1, emails: 1, md5hash: 1 }
  	});
});


/*
Meteor.publish('users.editProfile', function usersProfile() {
  	return Meteor.users.find(this.userId, {
		fields: { profile: 1, username: 1, profileImg: 1, emails: 1, md5hash: 1 }
  	});
});
*/
