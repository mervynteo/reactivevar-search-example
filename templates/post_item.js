Template.postItem.helpers({
   ownPost() {           //to ensure own postings 
      return this.userId == Meteor.userId();
   }
});
