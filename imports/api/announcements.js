import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles'
 
export const Announcements = new Mongo.Collection('announcements');

Meteor.methods({
    'announcements.insert'(text) {
        check(text, String);

        const loggedInUser = Meteor.user();

        // Make sure the user is logged in before inserting an announcement
        if (! loggedInUser) {
            throw new Meteor.Error('not-authorized');
        }

        // check if the user is admin
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            alert('Should you really make an annoucement?')
            throw new Meteor.Error(403, "Nice Try")
        }

        Announcements.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });


    },

    'announcements.remove'(annonId) {
        const loggedInUser = Meteor.user();
        console.log(loggedInUser)

        // Make sure the user is logged in before removing an announcement
        if (! loggedInUser) {
            throw new Meteor.Error('not-authorized');
        }

        // check if the user is admin
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            alert('You are in, but nice try')
            throw new Meteor.Error(403, "Nice Try")
        }

        check(annonId, String);

        const annon = Announcements.findOne(annonId);
        if (annon.owner !== loggedInUser._id) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
     
        Announcements.remove(annonId);
      },

      'announcements.setChecked'(annonId, setChecked) {
        const loggedInUser = Meteor.user();

        // Make sure the user is logged in before changing an announcement
        if (! loggedInUser) {
            throw new Meteor.Error('not-authorized');
        }

        // check if the user is admin
        if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
            alert('You are in, but nice try')
            throw new Meteor.Error(403, "Nice Try")
        }

        const annon = Announcements.findOne(annonId);
        if (annon.owner !== loggedInUser._id) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        check(annonId, String);
        check(setChecked, Boolean);

        Announcements.update(annonId, { $set: { checked: setChecked } });
      },
});