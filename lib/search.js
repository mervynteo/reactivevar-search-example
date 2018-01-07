// On Client and Server (Search files)

/*
postsIndex    = new EasySearch.Index({
   collection  : Posts,
   fields      : ['message', 'title'],       //url 
   engine      : new EasySearch.MongoDB()
});
*/

/*
until solve dual collection search, switch this off

 commentsIndex = new EasySearch.Index({
   collection  : Comments,
   fields      : ['body'],         //author
   engine      : new EasySearch.MongoDB()
 });

      transform: function(doc) {
         var transformedDoc = Posts._transform(doc);
         return transformedDoc;
      }

      transform: function(doc) {
         var transformedDoc = Comments._transform(doc);
         return transformedDoc;
      }
      beforePublish: function (action, doc) {
         if (doc.postId){
            doc.post = Posts.findOne({ "_id": doc.postId });
         }
         return doc;
      }

    transform: (doc) {
      doc.slug = sluggify(doc.awesomeName);
      return doc;
    }
      transform: function(doc) {
         var transformedDoc = People._transform(doc);
         doc.firstName = transformedDoc.firstName(); 
         return doc;
      }
  beforePublish: function (action, doc) {
      doc.company = Companies.findOne({"_id": doc.companyId }, {
                fields: {
                    slug: 1,
                    name: 1,
                    coverImage: 1
                  }});

  return doc
},
transform: function(doc) {
  doc.location = doc.city;
  return doc;
},
*/
