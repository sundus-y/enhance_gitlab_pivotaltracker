function setReCalVelocityEventHandler(){
    let reCalVelocityHandler = document.createElement('script');
    reCalVelocityHandler.textContent = "" +
        "function reCalcVelocity() {" +
            "const numberOfMembers = $('.days-off-input').toArray().length;" +
            "let totalDaysOff = $('.days-off-input').toArray().map((m)=>parseInt($(m).val())).filter((f)=>f>0).reduce((t,v)=>t+v,0);" +
            "let totalHoursOff = $('.hours-off-input').toArray().map((m)=>parseInt($(m).val())).filter((f)=>f>0).reduce((t,v)=>t+v,0);" +
            "let totalHolidayDaysOff = parseInt($('.holiday-days-off-input').val()) || 0;" +
            "let totalHolidayHoursOff = parseInt($('.holiday-hours-off-input').val()) || 0;" +
            "totalHoursOff += (totalDaysOff * 8);" +
            "totalHolidayHoursOff += (totalHolidayDaysOff * 8);" +
            "totalHoursOff += (totalHolidayHoursOff * numberOfMembers);" +
            "const fullPercentHours = 80 * numberOfMembers;" +
            "const velocityResult = ((fullPercentHours - totalHoursOff)/fullPercentHours)*100;" +
            "$('#velocityResult')[0].innerHTML = velocityResult.toPrecision(4)+'%';" +
        "};" +
        "function reSetVelocityFields() {" +
            "$('.days-off-input').toArray().map((m)=>$(m).val(''));" +
            "$('.hours-off-input').toArray().map((m)=>$(m).val(''));" +
            "$('.holiday-days-off-input').val('');" +
            "$('.holiday-hours-off-input').val('');" +
            "reCalcVelocity();" +
        "};";
    (document.head || document.documentElement).appendChild(reCalVelocityHandler);
}

function createVelocityCalc(members) {
    const members_elems = members.map(member => {
        return  "<tr>" +
                    "<td>"+member.name+"</td>" +
                    "<td><input class='velocity-calc-input days-off-input' type='number' min='0' max='10' onchange='reCalcVelocity()'/></td>" +
                    "<td><input class='velocity-calc-input hours-off-input' type='number' min='0' max='8' onchange='reCalcVelocity()'/></td>" +
                "</tr>";
    });
    $($('header>ul')[0]).append("<li class='tc_pull_right'>" +
        "<div class='dropdown'>" +
            "<button class='SMkCk__Button _3jN8d__Button--header Dropdown__button'>Velocity Calc</button>" +
            "<div class='velocity-calc-dropdown-content'>" +
                "<table class='velocity-calc-table'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th>Member</th>" +
                            "<th>Days Off</th>" +
                            "<th>Hours Off</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        members_elems.join('') +
                        "<tr>" +
                            "<td>Holidays/Risks</td>" +
                            "<td><input class='velocity-calc-input holiday-days-off-input' type='number' min='0' max='10' onchange='reCalcVelocity()'/></td>" +
                            "<td><input class='velocity-calc-input holiday-hours-off-input' type='number' min='0' max='8' onchange='reCalcVelocity()'/></td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td colspan='3'>" +
                                "Velocity: <span id='velocityResult'>100%</span>" +
                                "<button class='velocity-reset-button' onclick='reSetVelocityFields()'>Reset</button>" +
                            "</td>" +
                        "</tr>" +
                    "</tbody>" +
                "</table>"+
            "</div>" +
        "</div>");
}