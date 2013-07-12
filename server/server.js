/*******************************************************************************
 * Copyright (c) 2013 Pahan Sarathchandra.
 * All rights reserved. 
 *******************************************************************************/

Meteor
		.startup(function() {
			var query = Messages.find({});
			var handle = query.observeChanges({
				added : function(id, message) {
					var todel = Messages.find({}, {
						sort : {
							createdAt : -1
						},
						skip : 150
					});
					todel.forEach(function(message) {
						Messages.remove({
							_id : message._id
						});
					});
				}
			});

			var query1 = Meteor.users.find({});
			var handle1 = query1
					.observeChanges({
						added : function(id, user) {
							// console.log("user added");
							if (user.services.twitter
									&& (user.services.twitter.screenName == "pahans"
											|| user.services.twitter.screenName == "ambarox"
											|| user.services.twitter.screenName == "ZoRoLK"
											|| user.services.twitter.screenName == "lishwish" || user.services.twitter.screenName == "BuzzRadiolk")) {
								Meteor.users.update({
									"_id" : id
								}, {
									$addToSet : {
										roles : {
											$each : [ 'admin' ]
										}
									}
								});
								if (user.roles.length > 0) {
									Roles.addUsersToRoles(id, user.roles);
								}
								// console.log("admin awith " + id);
							}
						}
					});

		});