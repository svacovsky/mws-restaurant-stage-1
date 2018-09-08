var CACHE_NAME = 'restaurants.cache.v1';
var urlsToChache = [
  '/',
  '/data/restaurants.json',
  '/css/flexbox.css',
  '/css/styles.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js'
];

self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        console.log("Opened Cache!");
        return cache.addAll(urlsToChache);
      }
    )
  );
});

self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.match(event.request)
      .then(function(response){
        if(response){
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response){
            if(!response || response.status !== 200 || response.type !== 'basic'){
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache){
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      }
    )
  );
});
