var Article = function(props){
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.blogTitle = props.blogTitle;
  this.blogBody = props.blogBody;
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
  // var $artClone = $('#template').clone();
  // $artClone.removeAttr('id');
  // $artClone.attr('id', this.blogTitle);
  // $artClone.attr('class', 'blogPosts');
  // $artClone.find('.blogTitle').text(this.blogTitle);
  // $artClone.find('.authorLink').attr('href', this.authorUrl).text('By ' + this.author);
  // $artClone.find('.author').after('A post about ' + this.category + ' that is ' +blog.daysSincePost(this.publishedOn) +' days old');
  // $artClone.find('.blogBody').html(this.blogBody);
  // $artClone.find('.readOn').show();
  // $('main').append($artClone);
  var source = $('#post-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  $('main').append(html);
};

$(function() {
  blog.render();
  blog.truncateArticles();
  blog.showFilteredArts();
});
