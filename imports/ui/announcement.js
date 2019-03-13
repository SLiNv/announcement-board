import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './announcement.html';


Template.announcement.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('announcements.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('announcements.remove', this._id);
  },
});