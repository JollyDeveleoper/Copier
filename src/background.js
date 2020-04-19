'use strict';


/**
 * VK api version. Not actual on  20.04.2020
 *
 * @type {string}
 */
const VK_API_VERSION = '5.103'

/**
 * Send request to vk.cc for creating short link
 *
 * @param url - string
 */
function copy(url) {
    // todo replace vk_token (not secure) on login/password. Only when will be open source
    chrome.storage.local.get(['vk_token'], function(result) {
        let link = vkUrlBuilder('utils.getShortLink',
            {
                'url': url,
                'private': 1,
                'v': VK_API_VERSION,
                'access_token': result.vk_token
            });
        request(link)
    });

}

/**
 * Build url for vk.cc service for request
 *
 * return string
 */
function vkUrlBuilder(method, params) {
    let host = 'api.vk.com'
    let protocol = 'https'
    return protocol + '://' + host + '/method/' + method + '?' + buildQueryParamsFromObject(params)
}

/**
 * Build url from object to string params
 *
 * @param obj
 * @returns {string}
 */
function buildQueryParamsFromObject(obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

/**
 * API request
 *
 * @param url
 * @returns {*}
 */
async function request(url) {
    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        // todo replace system alert on custom css alert (maybe material...)
        alert(json.response.short_url)
    }
}

/**
 * Click icon extension
 */
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        copy(url)
    });

});
