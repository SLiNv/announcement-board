import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles'
 
import './mentorRequest.html';

Template.mentorRequest.helpers({
  isOwner() {
    const loggedInUser = Meteor.user();
    // check if the user is admin
    if (Roles.userIsInRole(loggedInUser, ['admin'])) {
        return true;
    }

    return this.owner === Meteor.userId();
  },
});

Template.mentorRequest.events({
  // 'click .toggle-checked'() {
  //   // Set the checked property to the opposite of its current value
  //   Meteor.call('requests.setChecked', this._id, !this.checked);
  // },
  'click .delete'() {
    Meteor.call('requests.remove', this._id);
  },
});