var repos = {};
repos.rawRepos = [];
repos.sortedRepos = [];
repos.requstAll = function(callback){
  $.ajax({
    url: '/github/user/repos?sort=updated&per_page=100' +
          '?per_page=100' +
          '&sort=updated',
    type: 'GET',
    success: function(data, message, xhr) {
      repos.rawRepos = data;
    }
  }).done(callback);
};
repos.filterRepoList = function(){
  repos.sortedRepos = [];
  $.each(repos.rawRepos,function(){
    // console.log(this);
    if (!this.fork){
      repos.sortedRepos.push(this);
    }
  });
};
repos.render = function(){
  repos.sortedRepos = [];
  repos.filterRepoList();
  //could be done with a template
  $.each(repos.sortedRepos, function(index, value){
    $('#repo-list')
    .append($('<li>')
    .append($('<a>')
    .attr('href',this.html_url)
    .attr('target','_blank')
    .text(this.full_name + ' was last updated on ' + this.updated_at.slice(0,10))))
    .append($('<ul>')
    .append($('<li>').text(this.stargazers_count + ' people watching this repo'))
    .append($('<li>').text(this.forks + ' forks of this repo')));
  });
};
