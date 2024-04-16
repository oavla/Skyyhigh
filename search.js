const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingScreen = document.getElementById('loading-screen');

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    loadingScreen.style.display = 'block';

    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);

        loadingScreen.style.display = 'none';
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
