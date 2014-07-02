Meteor.methods({
  BanUser : function(chatId) {
    var Cchat = Messages.findOne({
      _id : chatId
    });
    var Cuser = Meteor.users.findOne({
      _id : Cchat.chatUserId
    });
    // Banned.insert
    Banned.insert({
      _id : Cchat.chatUserId,
      name : Cuser.name
    });
  }
});
