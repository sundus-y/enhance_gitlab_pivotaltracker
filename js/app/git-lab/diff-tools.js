// function addDiffTool() {
//     clean();
//     var on_commits_page = window.location.href.indexOf("/commits") !== -1;
//     if (on_commits_page) {
//         var commits = jQuery('div.commit-content').toArray();
//         commits.forEach(function (commit) {
//             var commit_link = jQuery(commit).find('a.item-title').last()[0];
//             var first_link = jQuery(commit).find('a.item-title').first()[0];
//             jQuery("<span class='diff-btn-container'>" +
//                 `<button class='diff btn btn-primary btn-small' data-link='${commit_link.href}'>Show Diff</button> - ` +
//                 '</span>').insertBefore(first_link);
//         });
//         jQuery('button.diff').click(function () {
//             cleanDiff();
//             var response = loadDiff(this);
//             renderDiff(response)
//         });
//     }
// }
// 
// function clean() {
//     var diff = jQuery("span.diff-btn-container");
//     var in_review = jQuery("span.in_review");
//     diff.remove();
//     in_review.remove();
// }

// function cleanDiff() {
//     var diff_box = jQuery("#diff_container");
//     var diff_overlay = jQuery("#overlay");
//     diff_box.remove();
//     diff_overlay.remove();
// }

// function loadDiff(elem) {
//     return jQuery(elem).data('link');
// }

// function renderDiff(diff_page) {
//     var body = jQuery('body');
//     body.prepend("<div id='overlay'></div>");
//     jQuery.get(diff_page).done(function (response) {
//         jQuery('#overlay').append("<iframe id='diff_container' srcdoc='" + response + "'></iframe>>");
//         var cont = $('#diff_container');
//         cont.load(function () {
//             // $(this.contentDocument).find('nav').remove();
//             // $(this.contentDocument).find('div.aui-sidebar').hide();
//             // $(this.contentDocument).find('.aui-page-panel').css('padding-left','0px');
//             this.contentDocument.body.addEventListener('keyup', function (e) {
//                 if (e.keyCode === 27 /* Esc key */) { cleanDiff(); }
//                 return true;
//             }, false);
//         });

//         jQuery('#overlay').click(function () {
//             cleanDiff();
//         });
//     });
// }
