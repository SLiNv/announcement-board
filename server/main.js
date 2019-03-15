import '../imports/api/mentorRequests';
import '../imports/api/announcements';
import '../imports/api/alerts';

import { Roles } from 'meteor/alanning:roles'

Meteor.startup(function() {
    const default_admin_username = 'hackrpi_admin';
    const default_admin_password = 'hackrpi_admin';

    default_admin = Meteor.users.findOne({
        'username': default_admin_username
    });

    if (!default_admin) {
        console.log("creating default admin");

        admin_id = Accounts.createUser({
            'username': default_admin_username,
            'password': default_admin_password
        })

        // give the admin admin rights
        const adminUser = Meteor.users.findOne({ "_id":admin_id });
        Roles.addUsersToRoles(adminUser, 'admin');
    }
});