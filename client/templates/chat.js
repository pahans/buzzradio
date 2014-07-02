/*******************************************************************************
 * Copyright (c) 2013 Pahan Sarathchandra.
 * All rights reserved.
 *******************************************************************************/
Template.chat.messages = function() {
  return Messages.find({}, {
    sort: {
      createdAt: 1
    }
  }).fetch();
};
Template.chat.currentTime = function() {
  return new Date();
};
Template.chat.relativeTime = RelativeTime;
Template.chat.parseSmileys = SimpleSmiley;

Template.chat.rendered = function() {
  $(window).resize(function() {
    positionFooter();
  });
  positionFooter();
};
Template.chat.events({
  "click .banbtn": function() {
    var banUserId = this._id;
    var shareDialogInfo = {
      template: Template.banUser,
      title: "Ban User",
      buttons: {
        "cancel": {
          class: 'btn-danger',
          label: 'Cancel'
        },
        "yes": {
          class: 'btn-info',
          label: 'Yes'
        }

      }
    }
    var rd = ReactiveModal.initDialog(shareDialogInfo);
    rd.show();
    rd.buttons.yes.on('click', function(buttons){
      Meteor.call('BanUser', banUserId, function(err, result){
        if(!err){
          alert('banned user');
        } else {
          alert('banned user failed '+ banUserId);
        } 
      });
    });
    return true;
  },
  "submit, click button.pmessage": function(e) {
    e.preventDefault();
    var tval = document.getElementsByName("message")[0].value;
    if (Meteor.user()) {
      if (Meteor.user().profile.name && tval != "") {
        var pictureUrl = "";
        if (Meteor.user().services && Meteor.user().services.twitter) {
          pictureUrl = Meteor.user().services.twitter.profile_image_url;
        } else if (Meteor.user().services && Meteor.user().services.google) {
          pictureUrl = Meteor.user().services.google.picture;
        } else if (Meteor.user().services && Meteor.user().services.facebook) {
          pictureUrl = "https://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture";
        }

        Messages.insert({
          message: tval,
          from: Meteor.user().profile.name,
          chatUserId: Meteor.user()._id,
          picture: pictureUrl
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
  var chatH = $(window).height() - 356;
  $('#chat').scrollTop($('#chat')[0].scrollHeight);
  if (chatH > 392) {
    $('#chat').height(chatH);
  } else {
    $('#chat').height(392);
  }
}
