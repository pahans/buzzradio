Router.configure({
  layoutTemplate: 'default',
  // loadingTemplate: 'loading',
  // notFoundTemplate: 'pageNotFound',
  waitOn: function(){
    return [
    this.subscribe('messages'),
    this.subscribe('banned')]
  },
  onBeforeAction: [function() {
    document.title = "♪♫♪♫♪. Buzz Radio .♪♫♪♫♪ | Buzzradio.lk | Srilanka's Leading Non Commercial Internet Radio"
  }]
});

Router.map(function(){
  this.route('home', {
    template:'chat',
    path: '/'
  });
  this.route('aboutUs',{
    template: 'aboutUs',
    path: '/about-buzzradio'
  });
  this.route('contactUs',{
    template: 'contactUs',
    path: '/contact-buzzradio'
  });
  this.route('privacy',{
    template: 'privacy',
    path: '/privacy-policy'
  });
  this.route('code',{
    template: 'code',
    path: '/spread-the-word'
  })
});