var Article = function(props){
  this.author = props.author;
  this.blogTitle = props.blogTitle;
  this.blogBody = props.blogBody;
  this.publishDate = props.publishDate;
}

Article.prototype.toHTML = function(first_argument){
  return '<article>'+'<h1>'+ this.blogTitle +'</h1>'+'</article>'
}
