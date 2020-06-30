---
---
const staticCacheName = 'static-cache-v022';
const dynamicCacheName = 'dynamic-cache-v022';

const staticAssets = [
    './',
    './index.html',
    './alphabet/index.html',
    {% for post in site.posts %}'.{{ post.url }}index.html',{% endfor %}
    './images/icons/icon-180x180.png',
    './images/icons/icon-512x512.png',
    './offline/index.html',
    {% if site.minimal %}'{{ "./assets/css/minimal.css" }}',
    '{{ "./assets/css/classes.css" }}',
    {% else %}'{{ "./assets/css/style.css" }}',
    {% endif %}
    {% if site.sidebar %}'{{ "./assets/css/sidebar.css" }}',
    {% endif %}
    './assets/fonts/PTSans-Regular.woff',
    './assets/fonts/PTSans-Bold.woff',
    './images/icons/hymnbook.svg',
    './images/icons/mask-hymnbook.svg',
    './assets/fontawesome/icons.svg',
    './js/app.js',
    './images/no-image.jpg'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.jpg') !== -1 || req.url.indexOf('.jpeg') !== -1 || req.url.indexOf('.png') !== -1  || req.url.indexOf('.svg') !== -1) {
            return caches.match('./images/no-image.jpg');
        } else {
            return caches.match('./offline/index.html');
        }
    }
}
