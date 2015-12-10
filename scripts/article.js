var Article = function(props){
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.blogTitle = props.blogTitle;
  this.markdown = marked(props.markdown);
  this.publishedOn = props.publishedOn;
  this.category = props.category;
  this.daysSincePost = function(){
    var today = new Date();
    var oneDay = 24*60*60*1000;
    var postDate = new Date(this.publishedOn);
    return Math.round(Math.abs((postDate.getTime()-today.getTime())/(oneDay)));
  };
};
Article.prototype.toHTML = function(){
  var html = this.compiled(this);
  $('main').append(html);
};
