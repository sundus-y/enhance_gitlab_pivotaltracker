jQuery(document).ready(function () {
    if (window.location.href.match(/https:\/\/www.pivotaltracker.com\/n\/projects\//)){
        setTimeout(enhancePivotalTracker,2000);
    }
});

function enhancePivotalTracker() {
    setSelectedEventHandler();
    setReCalVelocityEventHandler();
    getMembers().done(function(data){
        const members = data.map(function(d){
            return d.person;
        });
        createMembersDropDown(members);
        createVelocityCalc(members);
    });
}