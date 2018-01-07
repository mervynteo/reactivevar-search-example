Template.searchPosts.onCreated( function() { //cannot use ES5 here, throws error

   let template = Template.instance();
      template.searchQuery = new ReactiveVar();
      template.searching   = new ReactiveVar( false ); // hooks to {{#if searching}} in html

   this.autorun( () => {

      Meteor.subscribe( 'searchposts', template.searchQuery.get(), () => { //get recent value
         setTimeout( () => {
            template.searching.set( false );
         }, 200 );
      });

      console.log("searchposts subs is ready");
   });

});

  
Template.searchPosts.helpers({
   searching(){
      return Template.instance().searching.get();
   },
   query(){
      return Template.instance().searchQuery.get();
   },
   searchposts(){
      let posts = Posts.find();
      if ( posts ) {
         return posts;
      }
   },
});

   //   comboIndex: function () { return [postsIndex, commentsIndex]; },

   /*
   postsIndex: () => PostsIndex,    //postsIndex: function () { return postsIndex; },

   searchPosts: function () {
      return index.search(searchString).mongoCursor;
   },
   attributes: function () {
      return { 
         //type           : 'search',
         placeholder    : 'search here lor'
         //class          : 'EasySearch'
      };
   }
   */

   //commentsIndex: function () {
   //   return commentsIndex;
   //},
   /*,
   swapId: function () {
      // index instanceof EasySearch.Index
      var docs = index.search('comboIndex').fetch();

      if (docs.length) {
         docs.forEach(function(doc) {
            makeHappy(doc.__originalId);
         });
      }
   }*/



Template.searchPosts.events({

   'keyup [name="search"]' ( event, template ) {
      let value = event.target.value.trim();          //store input in value variable, trim blank

      if ( value !== '' && event.keyCode === 13 ) {   //only execute if not blank + press enter
         template.searchQuery.set( value );           //set searchQuery to current input value
         template.searching.set( true );
      }

      if ( value === '' ) {
         template.searchQuery.set( value );           //if blank, set query to blank. will return results within limit
      }
   }
});
   /*
   'clickCancel': function(e) {
   // index instanceof EasySearch.index
      index.getComponentMethods('cancelContent')
         .addProps('cancelContent', $(e.target).val());
      console.log(cancelContent);
   }
   */


