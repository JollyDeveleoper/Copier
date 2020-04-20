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
    chrome.storage.local.get(['vk_token'], function (result) {
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
        copyToClipboard(json.response.short_url)
        chrome.tabs.executeScript({
            file: 'src/snackbar.js'
        });
    }
}

/**
 * Copy text to clipboard
 * navigator api is not working in chrome extension, i'm don't understand why
 * @param text
 */
function copyToClipboard(text) {
    const fuckingClipboardAPI = document.createElement('textarea');
    fuckingClipboardAPI.value = text;
    document.body.appendChild(fuckingClipboardAPI);
    fuckingClipboardAPI.select();
    document.execCommand('copy');
    document.body.removeChild(fuckingClipboardAPI);
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

/**
 * Listen auth user
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'loading' && changeInfo.url !== undefined) {
        if (!changeInfo.url.startsWith('https://oauth.vk.com/blank.html')) return;
        let hash = changeInfo.url.split('#').pop();
        let token = hash.substr(13).split('&')[0]
        chrome.storage.local.set({'vk_token': token}, function () {
            // redirect to google.com after saved token
            chrome.tabs.getCurrent(function (tab) {
                chrome.tabs.remove(tab.id, function () {
                });
            });
            chrome.tabs.update({url: "https://google.com"});

        });
    }
})
