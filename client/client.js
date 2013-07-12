Template.chat.messages = function() {
	return Messages.find({}, {
		sort : {
			createdAt : 1
		}
	}).fetch();
};
Template.onlineusersCount.count =function(){
	return Meteor.presences.find({}).count();
};

Template.chat.currentTime = function() {
	return new Date();
};

Template.chat
		.helpers({
			relativeTime : function(current, previous) {
				var msPerMinute = 60 * 1000;
				var msPerHour = msPerMinute * 60;
				var msPerDay = msPerHour * 24;
				var msPerMonth = msPerDay * 30;
				var msPerYear = msPerDay * 365;

				var elapsed = current - previous;
				if(elapsed < 0){
					return 'few seconds ago';
				}
				if (elapsed < msPerMinute) {
					return Math.round(elapsed / 1000) +' seconds ago';
				}

				else if (elapsed < msPerHour) {
					return Math.round(elapsed / msPerMinute) + ' minutes ago';
				}

				else if (elapsed < msPerDay) {
					return Math.round(elapsed / msPerHour) + ' hours ago';
				}

				else if (elapsed < msPerMonth) {
					return 'approximately ' + Math.round(elapsed / msPerDay)
							+ ' days ago';
				}

				else if (elapsed < msPerYear) {
					return 'approximately ' + Math.round(elapsed / msPerMonth)
							+ ' months ago';
				}

				else {
					return 'approximately ' + Math.round(elapsed / msPerYear)
							+ ' years ago';
				}

			},
			parseSmileys : function(text) {

				var emoticons = {
					':-)' : 'smiley.png',
					':)' : 'smiley.png',
					':D' : 'smiley-grin.png',
					':-D' : 'smiley-grin.png',
					':-(' : 'smiley-sad.png',
					':(' : 'smiley-sad.png',
					':\'(' : 'smiley-cry.png',
					':-O' : 'smiley-surprise.png',
					':O' : 'smiley-surprise.png',
					';)' : 'smiley-wink.png',
					';-)' : 'smiley-wink.png',
					'B)' : 'smiley-cool.png',
					'B-)' : 'smiley-cool.png',
					'x-(' : 'smiley-cool.png',
					':-P' : 'smiley-razz.png',
					':P' : 'smiley-razz.png'
				}, url = "emoticon/", patterns = [], metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

				// build a regex pattern for each defined property
				for ( var i in emoticons) {
					if (emoticons.hasOwnProperty(i)) { // escape metacharacters
						patterns.push('(' + i.replace(metachars, "\\$&") + ')');
					}
				}

				// build the regular expression and replace
				return text
						.replace(
								new RegExp(patterns.join('|'), 'g'),
								function(match) {
									return typeof emoticons[match] != 'undefined' ? '<img src="'
											+ url + emoticons[match] + '"/>'
											: match;
								});
			}
		});

Template.mainPage.rendered = function() {
	$(window).resize(function() {
		positionFooter();
	});
	positionFooter();

};

Template.admin.events({
	"click .banUserConfirm" : function() {
		Meteor.call('BanUser', Session.get("selected_chat_id"));
		// console.log($(event.currentTarget).data("id"));

		alert('banned user');
		return true;
	},
	"click .banbtn" : function() {
		Session.set("selected_chat_id", this._id);
		// console.log(this._id);
		return true;
	}
});



Template.mainPage
		.events({
			"click button.cgroup" : function() {
				var tval = document.getElementsByName("gname")[0].value;
				if (tval != "" && !Groups.findOne({
					name : tval
				})) {
					Groups.insert({
						name : tval
					});
				}
				document.getElementsByName("gname")[0].value = "";
			},
			"submit, click button.pmessage" : function() {
				// event.preventDefault();
				var tval = document.getElementsByName("message")[0].value;
				if (Meteor.user()) {
					if (Meteor.user().profile.name && tval != "") {
						var pictureUrl = "";
						if (Meteor.user().services.twitter) {
							pictureUrl = Meteor.user().services.twitter.profile_image_url;
						} else if (Meteor.user().services.google) {
							pictureUrl = Meteor.user().services.google.picture;
						} else if (Meteor.user().services.facebook) {
							pictureUrl = "https://graph.facebook.com/"
									+ Meteor.user().services.facebook.id
									+ "/picture";
						}

						var result = Messages.insert({
							message : tval,
							from : Meteor.user().profile.name,
							chatUserId : Meteor.user()._id,
							picture : pictureUrl
						});

					} 
				} else if (tval != "") {
					alert('Please Login to Start Chatting');
				}
				document.getElementsByName("message")[0].value = "";
				return false;
			}
			
		});

function positionFooter() {
	var chatH = $(window).height() - 376;
	$('#chat').scrollTop($('#chat')[0].scrollHeight);
	if (chatH > 392) {
		$('#chat').height(chatH);
	} else {
		$('#chat').height(392);
	}
}



