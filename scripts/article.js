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
/////////taken from demo/////
function Article (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);

  this.markdown = marked(this.markdown);
}
//////////////////////////////
Article.prototype.daysSincePost = function () {
  var today = new Date();
  var oneDay = 24*60*60*1000;
  var postDate = new Date(this.publishedOn);
  return Math.round(Math.abs((postDate.getTime()-today.getTime())/(oneDay)));
};
Article.prototype.toHTML = function(){
  var html = this.compiled(this);
  $('main').append(html);
};
Article.prototype.updateRecord = function(callback) {
  webDB.execute(

  );
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
