import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles'

import { MentorRequests } from '../api/mentorRequests'; 
 
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
  isAdmin() {
    const loggedInUser = Meteor.user();
    // check if the user is admin
    return Roles.userIsInRole(loggedInUser, ['admin']) ? true : false;
  },
  notFound() {
    return MentorRequests.findOne(this._id).notFound;
  },
  onTheWay() {
    return MentorRequests.findOne(this._id).onTheWay;
  }
});

Template.mentorRequest.events({
  // 'click .toggle-checked'() {
  //   // Set the checked property to the opposite of its current value
  //   Meteor.call('requests.setChecked', this._id, !this.checked);
  // },
  'click .delete'() {
    Meteor.call('requests.remove', this._id);
  },
  'click #toggle-ontheway'() {
    Meteor.call('requests.setOnTheWay', this._id, !this.onTheWay);
  },
  'click #toggle-notfound'() {
    Meteor.call('requests.setNotFound', this._id, !this.notFound);
  },
});