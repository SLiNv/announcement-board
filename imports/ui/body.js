import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'

import { Announcements } from '../api/announcements';
import { MentorRequests } from '../api/mentorRequests';
import { Alerts } from '../api/alerts';

import './announcement.js';
import './mentorRequest.js';
import './body.html';
 
Template.body.onCreated(function bodyOnCreate() {
  this.state = new ReactiveDict();
  Meteor.subscribe('announcements');
  Meteor.subscribe('requests');
  Meteor.subscribe('alerts');
});

Template.body.helpers({
  announcements() {
    const instance = Template.instance();
    if (instance.state.get('hideOld')) {
      // if hide old is checked, filter announcements
      return Announcements.find({ checked: { $ne: true } }, { sort: {createdAt: -1 } });
    }
    // Otherwire, return all of the annoucements
    return Announcements.find({}, { sort: { createdAt: -1 } });
  },

  mentorRequests() {
    return MentorRequests.find({}, { sort: { createdAt: -1 } });
  },

  requestTextPlaceholder() {
    const placeholderString = `Name: 
Where to find you: (room #, table # or something)
Question/problem: (A brief discription of your concerns) `;

    return placeholderString;
  },

  isAdmin() {
    const loggedInUser = Meteor.user();
    // check if the user is admin
    return Roles.userIsInRole(loggedInUser, ['admin']) ? true : false;
  },

  notificationPermission() {
    if (Notification.permission === 'default') {
      return 'ask';
    }
    return Notification.permission;
  },
});



Template.body.events({
  'submit .new-announcement'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    // const target = event.target;
    const target = event.target[0];
    // const text = target.text.value;
    const text = target.value;
    
    if (text === '') {
      return;
    }

    // Insert an announcement into the collection
    Meteor.call('announcements.insert', text);
 
    // Clear form
    // target.text.value = '';
    target.value = '';
  },

  'change .hide-old input'(event, instance) {
    instance.state.set('hideOld', event.target.checked);
  },

  // ========= Template events for mentor requests =========

  'submit .new-request'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    // const target = event.target;
    const target = event.target[0];
    // const text = target.text.value;
    const text = target.value;
    
    if (text === '') {
      return;
    }

    // Insert an announcement into the collection
    Meteor.call('requests.insert', text);
 
    // Clear form
    // target.text.value = '';
    target.value = '';
  },

  // ========= Notification check box =========
  'change .turn-on-notif'(event, instance){
    Notification.requestPermission().then(function(result) {  
      console.log(result);
      if (result === 'granted') {
        location.reload();
      }
      else if (result === 'denied') {
        // uncheck if no perm
        document.getElementById("notif-perm-checkbox").checked = false;
      }
    });
  },
});

Template.body.onRendered(function () {
  // set noti permission checkbox after rendering
  if (Notification.permission === "granted") {
    document.getElementById("notif-perm-checkbox").checked = true;
  }
  else {
    document.getElementById("notif-perm-checkbox").checked = false;
  }

  let query = Alerts.find({});
  let handle = query.observeChanges({
    added: function (id, fields) {
      notify(fields.text);
      Meteor.call('alerts.removeAll');
    }
  });
});

// function to create a notification
function notify(annonText){
  title = "HackRPI: New Announcement";
  options = { 
    "body": annonText, 
    "icon": '/img/hackrpi-circle.jpg',
  };

  // close itself after 10 sec
  var notif = new Notification(title, options);
  setTimeout(notif.close.bind(notif), 10000);

  notif.onclick = function(event) {
    notif.close.bind(notif)
  }
  changeTitle();
}

// Title blink
var isOldTitle = true;
var oldTitle = "Announcement Board";
var newTitle = "** New Announcement **";
var interval = null;
function changeTitle() {
    document.title = isOldTitle ? oldTitle : newTitle;
    isOldTitle = !isOldTitle;
}

interval = setInterval(changeTitle, 500);
window.addEventListener("focus", function(event){
    clearInterval(interval);
    document.title = oldTitle;
});