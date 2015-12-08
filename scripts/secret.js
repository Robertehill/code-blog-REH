var preview = {};
preview.getFormInfo = function() {
  $('#formInfo').children().on('blur', function(event){
    event.preventDefault();
    var dateObj = new Date();
    var month =  dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var today = year + '-' + month + '-' + day;
    var newPost = {
      blogTitle: $('#formTitle').val(),
      category:  $('#formCategory').val(),
      author: $('#formAuthor').val(),
      authorUrl: $('#formAuthorUrl').val(),
      publishedOn: today,
      blogBody: marked($('#formBody').val())
    };
    var post = new Article(newPost);
    // console.log(post);
    var html = post.compiled(post);
    $('#preview').html(html);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $('#submitButton').on('click', function(event) {
      event.preventDefault();
      var jsonPost = JSON.stringify(newPost);
      $('#stringified').val(jsonPost);
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
  preview.compileTemplate();
});
