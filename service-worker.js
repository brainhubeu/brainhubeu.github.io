"use strict";var precacheConfig=[["/index.html","4aed1f47d2142d505c4b638a3b2831fa"],["/static/css/main.95280dd9.css","17356b1ef59bfd084dfee2f4f870a4f9"],["/static/js/main.077d3f5c.js","a82c1269fc522617bbe33c9e8979fa7d"],["/static/media/carousel-image-2.0153fe2f.jpg","0153fe2fcb34e81b4ca7b4054f2e1930"],["/static/media/carousel-image-3.393b99fc.jpg","393b99fca03e3524087f4cb421c58e1b"],["/static/media/carousel-image-4.7c8baca7.jpg","7c8baca74f97d957dc86f7827ea44375"],["/static/media/carousel-image-5.4b70e6e7.jpg","4b70e6e71b8894529161c1af60d256ee"],["/static/media/carousel-image-6.7bf395c9.jpg","7bf395c912ae27bed71c6b5aa83418fc"],["/static/media/carousel-image-7.2084a847.jpg","2084a84749a23a807fe1682ba91abe04"],["/static/media/carousel-image-9.bdbf49c7.jpg","bdbf49c7272feedf8641432588c0fa01"],["/static/media/header-bg.83b1c50b.jpg","83b1c50b0d0c733e8f1650ef11af24fa"],["/static/media/hkgrotesk-bold.31426d63.ttf","31426d63286277786ac09568f81209e0"],["/static/media/hkgrotesk-bold.4c6b6aa0.woff","4c6b6aa013cc7866dfa5875accac5581"],["/static/media/hkgrotesk-bold.d7586cd5.woff2","d7586cd579d4289cf6894211febf9af7"],["/static/media/hkgrotesk-light.779072f4.woff2","779072f4431e263c696bd7c94bcb9cb0"],["/static/media/hkgrotesk-light.d49ed8f4.ttf","d49ed8f41ec4104dc1f23557d8439efd"],["/static/media/hkgrotesk-light.e4419568.woff","e4419568cba078658cbd72dc51b907ba"],["/static/media/hkgrotesk-regular.1c8a9092.ttf","1c8a9092cb7a53300dc5da4fdca69317"],["/static/media/hkgrotesk-regular.cbfb45dd.woff","cbfb45ddc7d2320d9f0e0090ecacc8c3"],["/static/media/hkgrotesk-regular.ed7e5e83.woff2","ed7e5e83bf419050c15e135d7c2681f3"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,r){var c=new URL(e);return r&&c.pathname.match(r)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),c=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,r),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});