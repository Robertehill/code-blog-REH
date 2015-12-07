var preview = {};
// I know anyone can just look at the source code to find this password this was just for fun
// preview.password = function(argument){
//   var password = prompt('Please enter password');
//   while(password !== 'guest'){
//     password = prompt('What is your name?');
//   }
// };
// preview.password();
preview.getFormInfo = function() {
  $('#formInfo').children().on('blur', function(event){
    event.preventDefault();

    var formTitle = $('#formTitle').val();
    var formAuthor = $('#formAuthor').val();
    var formAuthorUrl = $('#formAuthorUrl').val();
    var formCategory = $('#formCategory').val();
    var formBody = marked($('#formBody').val());

    var dateObj = new Date();
    var month =  dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var today = year + '-' + month + '-' + day;
    var newPost = {
      blogTitle: formTitle,
      category: formCategory,
      author: formAuthor,
      authorUrl: formAuthorUrl,
      publishedOn: today,
      blogBody: formBody
    };
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    var source = $('#draft-template').html();
    var template = Handlebars.compile(source);
    var html = template(newPost);
    $('#preview').html(html);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $('#submitButton').on('click', function(event) {
      event.preventDefault();
      var jsonPost = JSON.stringify(newPost);
      // console.log(jsonPost);
      $('#stringified').val(jsonPost);

    });
  });
};
$(function() {
  preview.getFormInfo();
});
