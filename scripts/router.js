page('/', function() {
  console.log('router /');
  articleController.loadALLArts();
});
page('/about', function() {
  console.log('router /about');
  articleController.showAboutMe();
});

page.start();
