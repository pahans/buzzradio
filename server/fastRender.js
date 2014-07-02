FastRender.onAllRoutes(function(path) {
  this.subscribe('messages');
  this.subscribe('banned');
});  
