var Article = function(props){
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.blogTitle = props.blogTitle;
  this.blogBody = props.blogBody;
  this.publishedOn = props.publishedOn;
  this.category = props.category;
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
// need to group these in one function
$(function() {
  blog.render();
  blog.truncateArticles();
  blog.showFilteredArts();
});
// $(document).ready(blog.render());
// $(document).ready(blog.truncateArticles());
// blog.showFilteredArts();
