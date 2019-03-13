import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'
 
import { Announcements } from '../api/announcements';
 
import './announcement.js';
import './body.html';
 
Template.body.onCreated(function bodyOnCreate() {
  this.state = new ReactiveDict();
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
});

Template.body.events({
  'submit .new-announcement'(event) {
    console.log(event);
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
});
