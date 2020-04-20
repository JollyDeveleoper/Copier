injectSnackbarStyles()

create()

function create() {
    let div = document.createElement('div');
    div.id = "copierSnackbar";
    div.innerHTML = "<div>Ссылка скопирована в буфер обмена!</div>";
    document.body.append(div)
    show()
}

function show() {
    let copierSnackbar = document.getElementById("copierSnackbar")
    copierSnackbar.className = "show";

    setTimeout(function () {
        copierSnackbar.className = copierSnackbar.className.replace("show", "");
        removeFromDOM()
        removeStyleFromDOM()
    }, 3000);
}

function removeFromDOM() {
    document.getElementById('copierSnackbar').remove()
}

function removeStyleFromDOM() {
    let stylesTags = document.getElementsByTagName('style')
    let lastStyleTag = stylesTags[stylesTags.length - 1]
    lastStyleTag.remove()
}

function injectSnackbarStyles() {
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(getSnackbarStyles()));

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}

function getSnackbarStyles() {
    return `#copierSnackbar{visibility:hidden;font-family:Helvetica,serif;min-width:250px;margin-left:-125px;background-color:#333;color:#fff;text-align:center;border-radius:2px;padding:16px;position:fixed;z-index:1;left:50%;bottom:30px}.show{visibility:visible!important;-webkit-animation:fadein 0.5s,fadeout 0.5s 2.5s;animation:fadein 0.5s,fadeout 0.5s 2.5s}@-webkit-keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@-webkit-keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:0;opacity:0}}@keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:0;opacity:0}}`
}
