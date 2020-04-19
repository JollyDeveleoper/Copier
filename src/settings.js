// this is very easy settings.
// todo rewrite on more beautifuler interface
let submit = document.querySelector('#save')
submit.addEventListener('click', () => {
    let value = document.querySelector('#token').value
    chrome.storage.local.set({'vk_token': value}, function() {
        alert('Токен сохранен. Удачно серфинга :)')
    });
})
