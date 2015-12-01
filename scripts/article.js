var Article = function(props){
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.blogTitle = props.blogTitle;
  this.blogBody = props.blogBody;
  this.publishDate = props.publishDate;
}

Article.prototype.toHTML = function(){
  var $artClone = $('#template').clone();
  // console.log($artClone);
  $artClone.find('.blogTitle').html(this.blogTitle);
  $artClone.find('.author').html('by ' + this.author + ' on ' + this.publishDate);
  // $artClone.find('.author').html(this.author);

  $("main").append($artClone);
}
for (var i = 0; i < blog.rawData.length; i++){
  var art = new Article(blog.rawData[i]);
  art.toHTML();
 // console.log(blog.rawData[i].blogTitle);
}
