var Article = function (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);
  this.markdown = marked(this.markdown);
};
Article.prototype.daysSincePost = function(){
  var today = new Date();
  var oneDay = 24*60*60*1000;
  var postDate = new Date(this.publishedOn);
  return Math.round(Math.abs((postDate.getTime()-today.getTime())/(oneDay)));
};
// Article.prototype.toHTML = function(){
//   var html = this.compiled(this);
//   $('main').append(html);
// };
Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (blogTitle, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.blogTitle, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown],
      }
    ],
    callback
  );
};
