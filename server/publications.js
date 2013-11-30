Meteor.publish('messages', function() {
	return Messages.find({}, {
		sort : {
			createdAt : 1
		}
	});
});

Meteor.publish('banned', function() {

		return Banned.find({});
});
