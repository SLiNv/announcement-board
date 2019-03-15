import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// This collection is for the client side to monitor
// new announcements so that they can create a web 
// browser push notification. (A workaround of invoking
// client side function on the server side)
export const Alerts = new Mongo.Collection('alerts');


if (Meteor.isServer) {
    Meteor.publish('alerts', function alertPublication() {
        return Alerts.find();
    });
}

Meteor.methods({
    'alerts.insert'(text){
        check(text, String);

        Alerts.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },

    'alerts.removeAll'(){
        Alerts.remove({});
    },
})