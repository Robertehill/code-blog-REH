var util = {};
util.toggleAboutMe = function() {
  $('header').on('click', '#showAboutMe', function(event){
    event.preventDefault();
    $('#filteringForm').fadeOut();
    $('.blogPosts').fadeOut();
    $('#aboutMeArticle').fadeIn();
  });
  $('header').on('click', '#showArts', function(event){
    event.preventDefault();
    $('#aboutMeArticle').fadeOut();
    $('#filteringForm').fadeIn();
    $('.blogPosts').fadeIn();
  });
};
util.getTemplate = function (data) {
  Article.prototype.compiled = Handlebars.compile(data);
};
util.templateLoaded = function() {
  util.toggleAboutMe();
  blog.render();
  util.truncateArticles();
  blog.showFilteredArts();
};
util.compileTemplate = function(){
  $.get('templates/article-template.handlebars', util.getTemplate)
    .done(util.templateLoaded);
};
util.truncateArticles = function() {
  $('.blogBody p:not(:first-child)').hide();
  $('main').on('click', '.readOn', function(event){
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};
