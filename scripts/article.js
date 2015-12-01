function daysSincePost(postDate){
  var today = new Date();
  var oneDay = 24*60*60*1000;
  var postDate = new Date(postDate);
  var currentDate = today;
  // console.log(today);
  // console.log(postDate);
  return Math.round(Math.abs((postDate.getTime()-currentDate.getTime())/(oneDay)));
}

var Article = function(props){
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.blogTitle = props.blogTitle;
  this.blogBody = props.blogBody;
  this.publishedOn = props.publishedOn;
}

Article.prototype.toHTML = function(){
  var $artClone = $('#template').clone();
  // console.log($artClone);
  $artClone.find('.blogTitle').html(this.blogTitle);
  $artClone.find('.author').html('by ' +'<a href ='+'"'+ this.authorUrl+'"' +'>' + this.author+'</a> ' + daysSincePost(this.publishedOn) +' days since posted');
  $artClone.find('.blogBody').html(this.blogBody);
  daysSincePost(this.publishedOn);
  $("main").append($artClone);
}



for (var i = 0; i < blog.rawData.length; i++){
  var art = new Article(blog.rawData[i]);
  art.toHTML();
 // console.log(blog.rawData[i].blogTitle);
}
