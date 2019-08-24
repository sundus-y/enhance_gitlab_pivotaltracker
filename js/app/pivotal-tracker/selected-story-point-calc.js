function setupSelectedStoriesViewPort() {
    var container = jQuery('div.selectedStoriesControls')[0];
    if (container) {
        jQuery(container).append('<div class="selectedStoriesPoint__container">' +
                '<span class="selectedStoriesPoint__value odometer">0</span>' +
                '<span class="selectedStoriesPoint__label">Points</span>' +
            '</div>');
        new Odometer({ el: jQuery('span.selectedStoriesPoint__value')[0] });
    }
}

function setSelectedEventHandler() {
    jQuery('body').on('click', 'a.selector', function (event) {
        var sp_container = jQuery('div.selectedStoriesPoint__container')[0];
        if (!sp_container) {
            setTimeout(function () {
                setupSelectedStoriesViewPort();
            }, 200);
        }
        setTimeout(function () {
            var selected_stories = jQuery('a.selected').toArray();
            var total_size = 0;
            if (selected_stories.length > 0) {
                var list_of_story = [];
                selected_stories.forEach(function (selected_story) {
                    var story_name = jQuery(selected_story).closest('div.story').find('span.tracker_markup').text();
                    if(list_of_story.indexOf(story_name) === -1){
                        var size = parseInt(jQuery(selected_story).siblings('span.meta').text());
                        if (size > 0) total_size += size;
                        list_of_story.push(story_name);
                    }
                });
            }
            jQuery('span.selectedStoriesPoint__value').text(total_size);
        }, 400);
    });
}
