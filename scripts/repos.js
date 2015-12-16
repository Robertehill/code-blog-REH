var repos = {};
repos.rawRepos = [];
repos.sortedRepos = [];
repos.requstAll = function(callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/Robertehill/repos?sort=updated&per_page=100',
    headers: {Authorization: 'token ' + githubToken}
  }).done(function(data){
    repos.rawRepos = data;
    console.log(data);
  }).done(callback);
};
repos.filterRepoList = function(){

  $.each(repos.rawRepos,function(){
    // console.log(this);
    if (this.fork === false){
      repos.sortedRepos.push(this);
    }
  });
};
repos.render = function(){
  repos.sortedRepos = [];
  repos.filterRepoList();

  $.each(repos.sortedRepos, function(index, value){
    $('#repo-list')
    .append($('<li>')
    .append($('<a>')
    .attr('href',this.html_url)
    .html(this.full_name)))
    .append($('<ul>')
    .append($('<li>').text(this.stargazers_count + ' people watching this repo'))
    .append($('<li>').text(this.forks + ' forks of this repo')));
  });
};
