import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles'
 
export const MentorRequests = new Mongo.Collection('requests');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('requests', function requestPublication() {
        const loggedInUser = Meteor.user();
        // check if the user is admin
        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            return MentorRequests.find({});
        }

        return MentorRequests.find({
            $or: [
              { private: { $ne: true } },
              { owner: this.userId },
            ],
          });
    });
}

Meteor.methods({
    'requests.insert'(text) {
        
        const loggedInUser = Meteor.user();
        // Make sure the user is logged in before inserting a request
        if (! loggedInUser) {
            throw new Meteor.Error('not-authorized');
        }

        check(text, String);
        MentorRequests.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            private: true,
            notFound: false,
        });
    },

    'requests.remove'(reqid) {
        const loggedInUser = Meteor.user();

        // Make sure the user is logged in before removing a request
        if (! loggedInUser) {
            throw new Meteor.Error('not-authorized');
        }

        check(reqid, String);

        if (Roles.userIsInRole(loggedInUser, ['admin'])) {

            MentorRequests.remove(reqid);
            return;
        }

        const request = MentorRequests.findOne(reqid);
        if (request.owner !== loggedInUser._id) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
     
        MentorRequests.remove(reqid);
      },

    'requests.setOnTheWay'(requestId, setOnTheWay) {
        check(requestId, String);
        check(setOnTheWay, Boolean);

        const request = MentorRequests.findOne(requestId);

        const loggedInUser = Meteor.user();
        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            MentorRequests.update(requestId, { $set: { onTheWay: setOnTheWay } });
        }
    },
    'requests.setNotFound'(requestId, setNotFound) {
        check(requestId, String);
        check(setNotFound, Boolean);

        const request = MentorRequests.findOne(requestId);

        const loggedInUser = Meteor.user();
        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            MentorRequests.update(requestId, { $set: { notFound: setNotFound } });
        }
      },
});