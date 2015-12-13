// var Article = function(props){
//   this.author = props.author;
//   this.authorUrl = props.authorUrl;
//   this.blogTitle = props.blogTitle;
//   this.markdown = marked(props.markdown);
//   this.publishedOn = props.publishedOn;
//   this.category = props.category;
//   this.daysSincePost = function(){
//     var today = new Date();
//     var oneDay = 24*60*60*1000;
//     var postDate = new Date(this.publishedOn);
//     return Math.round(Math.abs((postDate.getTime()-today.getTime())/(oneDay)));
//   };
// };
/////////taken from demo//////////////////////////////////
function Article (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);

  this.markdown = marked(this.markdown);
}
///////////////////////////////////////////////////////
Article.prototype.daysSincePost = function () {
  var today = new Date();
  var oneDay = 24*60*60*1000;
  var postDate = new Date(this.publishedOn);
  if(postDate < today){
    var days = Math.round(Math.abs((postDate.getTime()-today.getTime())/(oneDay)));
    return ' was posted '+ days + ' ago.';
  }
  else{
    var futureDays = Math.round(Math.abs((today.getTime()-postDate.getTime())/(oneDay)));
    return ' was somehow posted '+ futureDays + ' from now?!' ;
  }
};
Article.prototype.toHTML = function(){
  var html = this.compiled(this);
  $('main').append(html);
};
Article.prototype.updateRecord = function(callback) {
  webDB.execute(
    [{
      'sql': 'UPDATE articles SET blogTitle=? author=? authorUrl=? category=? publishedOn=? markdown=? WHERE id=?',
      'data': [this.blogTitle, this.author, this.authorUrl, this.category, this,publishedOn, this.markdown]
    }]
  );
  callback;
};
Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    [{
      'sql': 'DELETE FROM articles WHERE id=this.id'

    }]
  );
  callback;
};
Article.prototype.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute(
    [{
      'sql': 'DROP TABLE articles'
    }]
  );
  callback;
};
/////////taken from demo, here for easy reference//////////////////////////
// Article.prototype.updateRecord = function(callback) {
//   //update article record in databse
//   webDB.execute(
//
//     callback
//   );
// };
//
// Article.prototype.deleteRecord = function(callback) {
//   // Delete article record in database
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
//
// Article.prototype.truncateTable = function(callback) {
//   // Delete all records from given table.
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
