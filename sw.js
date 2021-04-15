---
---
const staticCacheName = 'static-cache-novchurch-songs-v004';
const dynamicCacheName = 'dynamic-cache-novchurch-songs-v004';

const staticAssets = [
    '{{ "/" | relative_url }}',
    '{{ "/alphabet/" | relative_url }}',
    {% for post in site.posts %}'{{ post.url | relative_url }}',
    {% endfor %}'{{ "/offline/" | relative_url }}',
    {% if site.minimal %}'{{ "/assets/css/minimal.css" | relative_url }}',
    '{{ "/assets/css/classes.css" | relative_url }}',
    {% else %}'{{ "/assets/css/style.css" | relative_url }}',{% endif %}{% if site.sidebar %}'{{ "/assets/css/sidebar.css" | relative_url }}',{% endif %}
    '{{ "/assets/fonts/PTSans-Regular.woff" | relative_url }}',
    '{{ "/assets/fonts/PTSans-Bold.woff" | relative_url }}',
    '{{ "/images/icons/hymnbook.svg" | relative_url }}',
    '{{ "/images/icons/mask-hymnbook.svg" | relative_url }}',
    '{{ "/assets/fontawesome/icons.svg" | relative_url }}',
    '{{ "/favicon.ico" | relative_url }}',
    '{{ "/js/app.js" | relative_url }}',
    '{{ "/images/no-image.jpg" | relative_url }}'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    console.log('Service worker now caching all content...');
    await cache.addAll(staticAssets);
    
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
            return caches.match('{{ "/images/no-image.jpg" | relative_url }}');
        } else {
            return caches.match('{{ "/offline/" | relative_url }}');
        }
    }
}
