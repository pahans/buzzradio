Messages = new Meteor.Collection("messages");
Banned = new Meteor.Collection("banned");

Banned.allow({
	remove : function(userId, group) {
		if (Roles.userIsInRole(userId, [ 'admin' ])) {
			return true;

		} else {
			return false;
		}
	}
});

Messages.allow({
	insert : function(userId, message) {

		if (userId == null) {
			return false;
		}
		if (Banned.find({
			_id : userId
		}).count() > 0) {
			return false;
		} else {
			message.createdAt = new Date();
			return true;
		}

	}
});

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

