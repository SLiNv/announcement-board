import '../imports/api/mentorRequests';
import '../imports/api/announcements';
import '../imports/api/alerts';

import { Roles } from 'meteor/alanning:roles'

Meteor.startup(function() {
    const default_admin_username = Meteor.settings.private.default_admin_username;
    const default_admin_password = Meteor.settings.private.default_admin_password;

    const default_mentor_admin_username = Meteor.settings.private.default_mentor_admin_username;
    const default_mentor_admin_password = Meteor.settings.private.default_mentor_admin_password;

    if (default_admin_password){
        let default_admin = Meteor.users.findOne({
        'username': default_admin_username
        });

        if (!default_admin) {
            console.log("creating default admin");
    
            let admin_id = Accounts.createUser({
                'username': default_admin_username,
                'password': default_admin_password
            })
    
            // give the admin admin rights
            const adminUser = Meteor.users.findOne({ "_id":admin_id });
            Roles.addUsersToRoles(adminUser, 'admin');
        }
    }

    if (default_mentor_admin_password){
        let default_mentor_admin = Meteor.users.findOne({
        'username': default_mentor_admin_username
        });

        if (!default_mentor_admin) {
            console.log("creating default admin");
    
            let admin_id = Accounts.createUser({
                'username': default_mentor_admin_username,
                'password': default_mentor_admin_password
            })
    
            // give the admin admin rights
            const adminUser = Meteor.users.findOne({ "_id":admin_id });
            Roles.addUsersToRoles(adminUser, 'admin');
        }
    }
});