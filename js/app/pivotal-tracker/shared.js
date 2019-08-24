function getMembers(){
    const project_id = window.location.href.match(/\/projects\/(\d+)/)[1];
    const members_link = "https://www.pivotaltracker.com/services/v5/projects/"+project_id+"/memberships?sort_by=name&fields=:default,person(:default,activated,avatar_guid),collaboration_factor,unaccepted_invitations";
    return $.get(members_link);
}