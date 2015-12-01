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
  this.category = props.category;
}

Article.prototype.toHTML = function(){
  var $artClone = $('#template').clone();
  // console.log($artClone);
  $artClone.find('.blogTitle').html(this.blogTitle);
  $artClone.find('.author').html('A post about ' + this.category +' by ' +'<a href ='+'"'+ this.authorUrl+'"' +'>' + this.author+'</a> ' + daysSincePost(this.publishedOn) +' days since posted');
  $artClone.find('.blogBody').html(this.blogBody);
  daysSincePost(this.publishedOn);
  $("main").append($artClone);
}

function render(){
  blog.rawData.sort(function(a, b) {
    a = new Date(a.publishedOn);
    b = new Date(b.publishedOn);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  for (var i = 0; i < blog.rawData.length; i++){
      var art = new Article(blog.rawData[i]);
      art.toHTML();
    }
}
render();
