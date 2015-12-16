var repoController = {};

repoController.showAboutMe = function(){
  console.log('AC about me show');

  $('#filteringForm').hide();
  $('.blogPosts').hide();
  if ($('#repo-list').has('li').length){
    console.log('show repo');
    $('#aboutMeArticle').fadeIn();
  }
  else{
    console.log('load repos');
    repos.requstAll(repos.render);
    $('#aboutMeArticle').fadeIn();
  }
};
// repoController.index = function(){
//   repos.requestAll(repoVeiw);
// };
