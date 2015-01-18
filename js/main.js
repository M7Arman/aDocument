/**
 * Created by Arman on 1/18/15.
 */

"use strict";

/**
 * Loads content from url and put in $('.ajax-content') block
 *
 * @param url
 * @constructor
 */
function LoadAjaxContent(url){
    // $('.preloader').show();
    $.ajax({
        mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
        url: url,
        type: 'GET',
        success: function(data) {
            $('#ajax-content').html(data);
            //$('.preloader').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        },
        dataType: "html",
        async: false
    });
}

/**
 * This functionality works when document is ready
 */
$(function () {
    var mainID = $('#main');
    var height = window.innerHeight - 50;
    mainID.css('min-height', height);

    var ajax_url = location.hash.replace(/^#/, ''); // deletes '#' from URL endpoint
    if (ajax_url.length < 1) {
        ajax_url = 'pages/main.html';
    }
    LoadAjaxContent(ajax_url);

    $('.show-sidebar').on('click', function (e) {
        e.preventDefault();
        mainID.toggleClass('sidebar-show');
    });
});