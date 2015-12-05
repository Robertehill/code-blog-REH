var preview = {};

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

    // var source = $('#draft-template').html();
    // var template = Handlebars.compile(source);
    // var html = template(this);
    // $('#preview').append(html);
    $('#preview').find('#preblogTitle').html("<p>" + formTitle  + "</p>");
    $('#preview').find('#preauthor').html("<p>" + formAuthor + "<p>");
    $('#preview').find('#preAuthorUrl').html("<p>" + formAuthorUrl + "</p");
    $('#preview').find('#preblogBody').html(marked(formBody));
    $('#preview').find('#prepub').html("<p>" + today + "</p>");
    $('#preview').find('#precat').html("<p>" + formCategory + "</p>");
    $('#submitButton').on('click', function(event) {
      event.preventDefault();
      var newPost = {
      blogTitle: formTitle,
      category: formCategory,
      author: formAuthor,
      authorUrl: formAuthorUrl,
      publishedOn: today,
      blogBody: formBlogBody
      }

      var jsonPost = JSON.stringify(newPost);
      console.log(jsonPost);
      $('#stringified').html(jsonPost);

    })
  })
};
// $(function() {
  preveiw.getFormInfo();
// })
