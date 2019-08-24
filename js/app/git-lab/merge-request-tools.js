function addMergeRequestTools() {
    var merge_requests_page = jQuery("li.active:contains('Merge Requests')");
    if (merge_requests_page.size() == 2) {
        var merge_requests = getMergeRequests();
        merge_requests.forEach(function (merge_request) {
            if (merge_request.story_number) {
                addPivotalTrackerContent(merge_request);
            }
        });
    }
}

function getMergeRequests() {
    var prs = jQuery('li.merge-request');
    return prs.map(function (i, pr) {
        var merge_request_tile = jQuery(pr).find('span.merge-request-title-text > a')[0];
        var id = merge_request_tile.href.match(/merge_requests\/(.*)/)[1];
        var story_number = merge_request_tile.text.match(/^(\d*).*/);
        if (story_number) {
            story_number = story_number[1];
        }
        return {
            id: id,
            name: 'Test',
            elem: pr,
            story_number: story_number,
            pivotal_trakcer_url: `https://www.pivotaltracker.com/services/v5/stories/${story_number}?fields=:default,reviews(:default,review_type)`,
        }
    }).toArray();
}

function addPivotalTrackerContent(merge_request) {
    getPivotalTrackerData(merge_request).done(function (storyData) {
        createPivotalTrackerContainer(merge_request);
        storyData.labels.forEach(function (label) {
            addLabel(merge_request, label.name);
        });
        addStateWithLink(merge_request, storyData);
    });
}

function getPivotalTrackerData(merge_request) {
    var storyDataReady = jQuery.Deferred();
    jQuery.get(merge_request.pivotal_trakcer_url).done(function (data) {
        storyDataReady.resolve(data);
    }).fail(function (data) {
        storyDataReady.reject();
    });
    return storyDataReady;
}

function createPivotalTrackerContainer(merge_request) {
    jQuery(merge_request.elem)
        .find('div.issuable-info')
        .append('<div class="pivotal_tracker_container">' +
            '<ul class="controls"></ul>' +
            '</div>');
}

function addLabel(merge_request, label) {
    jQuery(merge_request.elem)
        .find('div.pivotal_tracker_container > ul')
        .append('<li>' +
            `<span class="badge color-label pivotal_tacker_label">${label}</span>` +
            '</li>');

}

function addStateWithLink(merge_request, data) {
    var state_css = '';
    switch (data.current_state) {
        case 'accepted':
            state_css = 'text-white bg-success';
            break;
        case 'rejected':
            state_css = 'text-white bg-danger';
            break;
        case 'delivered':
            state_css = 'text-white bg-info';
            break;
        case 'finished':
            state_css = 'text-white bg-info';
            break;
        case 'started':
            state_css = 'text-dark bg-light';
            break;
    }
    var reviews_label = '';
    data.reviews.forEach(function (review) {
        reviews_label += ` (${review.review_type.name}-${review.status})`;
    });

    jQuery(merge_request.elem)
        .find('div.pivotal_tracker_container > ul')
        .prepend('<li>' +
            `<a target="_blank" href="${data.url}">` +
            `<span class="badge color-label ${state_css}">${data.current_state.toUpperCase()}${reviews_label}</span>` +
            '</a>' +
            '</li>');
}