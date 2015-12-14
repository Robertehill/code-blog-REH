var preview = {};
preview.savePost = function(post) {
  var savedPost = JSON.stringify(post);
  localStorage.setItem('secretBlogPage', savedPost);
};
preview.loadPost = function(){
  var savedPost = localStorage.getItem('secretBlogPage');
  var parsePost = JSON.parse(savedPost);
  $('#formTitle').val(parsePost.blogTitle);
  $('#formCategory').val(parsePost.category);
  $('#formAuthor').val(parsePost.author);
  $('#formAuthorUrl').val(parsePost.authorUrl);
  $('#formBody').val(parsePost.markdown);
};
preview.getFormInfo = function() {
  $('#formInfo').children().on('blur', function(event){
    event.preventDefault();
    var newPost = {
      blogTitle: $('#formTitle').val(),
      category:  $('#formCategory').val(),
      author: $('#formAuthor').val(),
      authorUrl: $('#formAuthorUrl').val(),
      publishedOn: util.getToday(),
      markdown: $('#formBody').val()
    };
    var post = new Article(newPost);
    preview.savePost(post);
    post.markdown = marked(post.markdown);
    // var html = post.compiled(post);
    $('#preview').html(post.compiled(post));
    //removed pre becuase it would not highlight code tags without the pre tags
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $('#submitButton').on('click', function(event) {
      event.preventDefault();
      var jsonPost = JSON.stringify(newPost);
      $('#stringified').val(jsonPost);
      //post.updateRecord();//here for future use.
    });
  });
};
preview.compileTemplate = function(){
  $.get('templates/article-template.handlebars', function(data){
    Article.prototype.compiled = Handlebars.compile(data);
  }).done(function() {
    preview.getFormInfo();
  });
};
$(function() {
  webDB.init();
  webDB.setupTables();
  preview.compileTemplate();
  preview.loadPost();
});
