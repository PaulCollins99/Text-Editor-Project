/* eslint-disable no-restricted-globals */
const myCache = 'pages-cache-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(myCache).then((cache) => cache.addAll([
      './',
      './sw.js',
      './index.html',
      './editor.html',
      './style/layout.css',
      './style/startscreen.css',
      './style/stylesheet.css',
      './resources/background.jpg',
      './scripts/initialScript.js',
      './scripts/script.js',
    ])),
  );
});
