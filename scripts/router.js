page('/', function() {
  console.log('router /');
  articleController.loadALLArts();
});
// shows aboutME when clicking the link or typing in the URL
// but not hiding the body when the URL is entered
page('/about', function() {
  console.log('router /about');
  articleController.showAboutMe();
});

page.start();
