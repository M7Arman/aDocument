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
function loadAjaxContent(url){
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

var fileName;
/**
 * TODO: Add comment
 */
function sendJson(url, body){
	console.log('Sending json to ' + url);
	var jsonBody = JSON.stringify(body);
    $.ajax({
        type: 'POST',
		url: url,
		data: jsonBody,
		contentType: 'application/json; charset=utf-8',
		success: function(data) {
			fileName = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
        },
    });
	
}


/**
 * Loads a plugin from the given path and execute the given function after that.
 * @param path
 * @param name
 * @param callback
 */
function loadPlugin(path, pluginName, callback) {
    if (!$.fn.pluginName){
        $.getScript(path, callback);
    }
    else {
        if (callback && typeof(callback) === "function") {
            callback();
        }
    }
}

/**
 * This functionality works when the document is ready
 */
$(function () {
    var mainID = $('#main');
    var height = window.innerHeight - 50;
    mainID.css('min-height', height);

    var ajax_url = location.hash.replace(/^#/, ''); // deletes '#' from URL endpoint
    if (ajax_url.length < 1) {
        ajax_url = 'pages/home.html';
    }
    loadAjaxContent(ajax_url);

    $('.navbar-brand').on('click', function (e) {
        e.preventDefault();
        location.hash = '';
        loadAjaxContent('pages/home.html');
    });

    $('.show-sidebar').on('click', function (e) {
        e.preventDefault();
        mainID.toggleClass('sidebar-show');
    });

    $('.main-menu').on('click', 'a', function (e) {
        e.preventDefault();
        clickOnMenuItem($(this));
    });

});


/**
 * This functionality is responsible for correcting the left navbar shown.
 */
var clickOnMenuItem = function(item) {
    var allItems = $('.main-menu a');

    if(item.hasClass('parent')) {
        allItems.removeClass('active');
        item.addClass('active')
        //TODO: close previous submenu.
    } else {
        item.closest('ul').find('a').removeClass('active');
        item.addClass('active')
    }

    if (item.hasClass('ajax-link')) {
        var url = item.attr('href');
        if(url == 'pages/home.html') {
            location.hash = '';
        } else {
            location.hash = url;
        }
        loadAjaxContent(url);
    }
}