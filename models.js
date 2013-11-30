/*******************************************************************************
 * Copyright (c) 2013 Pahan Sarathchandra.
 * All rights reserved. 
 *******************************************************************************/
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
			
			var pictureUrl = "";
			if (Meteor.user().services && Meteor.user().services.twitter) {
				pictureUrl = Meteor.user().services.twitter.profile_image_url;
			} else if (Meteor.user().services && Meteor.user().services.google) {
				pictureUrl = Meteor.user().services.google.picture;
			} else if ( Meteor.user().services && Meteor.user().services.facebook) {
				pictureUrl = "https://graph.facebook.com/"
						+ Meteor.user().services.facebook.id
						+ "/picture";
			}
			message.picture = pictureUrl;
			
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

