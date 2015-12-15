var repos = {};

repos.allRepos = [];

repos.requstAll = function(callback){
  $.getJSON('https://api.github.com/users/Robertehill/repos?sort=updated');
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/Robertehill/repos?sort=updated&per_page=100',
    headers: {Authorization: 'token ' + githubToken}
  }).done(function(data){
    repos.allRepos = data;
    console.log(data);
  });
  callback;
};
