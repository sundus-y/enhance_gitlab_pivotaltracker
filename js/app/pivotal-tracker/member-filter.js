function setMemberEventHandler(){
    const memberEventHandler = document.createElement('script');
    memberEventHandler.textContent =
        "$('div.dropdown-item').click(function(event){" +
            "event.preventDefault();" +
            "let initials = $(this).data('initials');" +
            "let search_field = $(\"input[name='search']\");" +
            "search_field.val(\"mywork:\\\"\"+initials+\"\\\"\");" +
            "search_field.focus().submit();" +
            "$('.ris-pv-dropdown-content').hide();" +
            "setTimeout(function(){$('.ris-pv-dropdown-content').attr('style','');},500);" +
        "});";
    (document.head || document.documentElement).appendChild(memberEventHandler);
}

function createMembersDropDown(members) {
    const members_elems = members.map(member => {
        return "<div class='dropdown-item' data-initials='"+member.initials+"'>"+
                    "<div class='member-initials'>" +
                        member.initials.toUpperCase() +
                    "</div>" +
                    "<div class='member-name'>" +
                        member.name +
                    "</div>" +
                "</div>";
    });
    $($('header>ul')[0]).append("<li class='tc_pull_right'>" +
        "<div class='dropdown'>" +
            "<button class='SMkCk__Button _3jN8d__Button--header Dropdown__button'>Member Filters</button>" +
            "<div class='ris-pv-dropdown-content'>" +
                members_elems.join('') +
            "</div>" +
        "</div>");

    setMemberEventHandler();
}