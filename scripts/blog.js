var blog = {};
blog.filtAut = [];
blog.filtCat = [];
blog.article = [];
blog.render = function(){
  // here for testing. remove when JSON stuff is work, which might be sometime around.. never....
  blog.article = blog.rawData;
  blog.article.sort(function(a, b) {
    a = new Date(a.publishedOn);
    b = new Date(b.publishedOn);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  for (var i = 0; i < this.rawData.length; i++){
    var art = new Article(this.article[i]);
    art.toHTML();
  }
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
blog.getTemplate = function (data) {
  Article.prototype.compiled = Handlebars.compile(data);
};
blog.templateLoaded = function() {
  util.toggleAboutMe();
  blog.render();
  blog.truncateArticles();
  blog.showFilteredArts();
  
};
blog.compileTemplate = function(){
  $.get('templates/article-template.handlebars', blog.getTemplate)
    .done(blog.templateLoaded);
};
blog.truncateArticles = function() {
  $('.blogBody p:not(:first-child)').hide();
  $('main').on('click', '.readOn', function(event){
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};
blog.makeFilterList = function(array, prop) {
  for (var i = 0; i < this.rawData.length; i++){
    var x = this.rawData[i][prop];
    if(array.indexOf(x) === -1){
      array.push(x);
    }
  }
  for (var i = 0; i < array.length; i++) {
    var $opt = $('<option></option>');
    $opt.attr('value', array[i]);
    $opt.attr('id', array[i]);
    $opt.text(array[i]);
    $('#'+prop +'List').append($opt);
  }
};
blog.showFilteredArts = function() {
  blog.makeFilterList(blog.filtAut, 'author');
  blog.makeFilterList(blog.filtCat, 'category');
  $('#categoryList').change(function() {
    $('main').find('article').show();
    console.log(this.value);
    $('#authorList').find(':first-child').attr('selected', true);
    if(this.value === 'reset'){
      $('main').find('article').show();
    }
    else{
      //need to refactor this using data element it's macthing partial names.
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
  $('#authorList').change(function() {
    $('main').find('article').show();
    $('#categoryList').find(':first-child').attr('selected', true);
    if(this.value === 'reset'){
      $('main').find('article').show();
    }
    else{
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
};
$(function() {
  blog.compileTemplate();
});
