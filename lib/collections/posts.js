Posts = new Mongo.Collection('posts');

// indexing search for ReactiveVar 
if ( Meteor.isServer ) {
   Posts._ensureIndex({ 'title'   : 1, 'message' : 1, 'author'  : 1 });    //from MeteorChef
}

Posts.allow({
   insert: () => false,
   update (userId, post) { return ownsDocument(userId, post); },
   remove (userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
   update (userId, post, fieldNames) {  
      return (_.without(fieldNames, 'title', 'message').length > 0);    //'url'
   }          
});

Posts.deny({
   update (userId, post, fieldNames, modifier) {
      var errors = validatePost(modifier.$set);
         return errors.title || errors.message;
      }
});


validatePost = function (post) {
   var errors = {};
   if (!post.title)   errors.title    = "no title";
   if (!post.message) errors.message  = "no message";
   return errors;
};

Meteor.methods({

   postInsert (postAttributes) {
      check(this.userId, String);           
      check(postAttributes, {
         title:   String,
         message: String
      });
         
      var user = Meteor.user();
      var post = _.extend(postAttributes, {
         userId:         user._id, 
         author:         user.username, 
         submitted:      new Date().getTime(),
         commentsCount:  0
      });         
      var postId = Posts.insert(post);
      return { _id: postId };
   }
});
