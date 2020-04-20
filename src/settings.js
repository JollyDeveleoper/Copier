const VK = {
    APP_ID: 7422286,
    SCOPE: 'offline,utils',
    RESPONSE_TYPE: 'token',
    DISPLAY: 'popup',
    API_VERSION: 5.103
}

let loginUrl = document.querySelector('.login__url')
loginUrl.setAttribute('href', buildAuthLink())

/**
 * Build auth link
 * @returns {string}
 */
function buildAuthLink() {
    return 'https://oauth.vk.com/authorize?client_id=' + VK.APP_ID + '&response_type=' + VK.RESPONSE_TYPE +
        '&display=' + VK.DISPLAY + '&scope' + VK.SCOPE + '&v=' + VK.API_VERSION
}
