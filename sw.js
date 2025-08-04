const CACHE_NAME = 'nuevos-aires-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// Install event - Cache resources
self.addEventListener('install', (event) => {
  console.log('✂️ Nuevos Aires SW: Install event');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✂️ Nuevos Aires SW: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✂️ Nuevos Aires SW: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✂️ Nuevos Aires SW: Activate event');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('✂️ Nuevos Aires SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✂️ Nuevos Aires SW: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://unpkg.com') &&
      !event.request.url.startsWith('https://cdn.tailwindcss.com') &&
      !event.request.url.startsWith('https://fonts.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('✂️ Nuevos Aires SW: Serving from cache:', event.request.url);
          return response;
        }

        console.log('✂️ Nuevos Aires SW: Fetching from network:', event.request.url);
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('✂️ Nuevos Aires SW: Background sync event:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('✂️ Nuevos Aires SW: Push event received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de Nuevos Aires',
    icon: '/manifest-icon-192.maskable.png',
    badge: '/manifest-icon-192.maskable.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: '/manifest-icon-192.maskable.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/manifest-icon-192.maskable.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Nuevos Aires Huecuraba', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('✂️ Nuevos Aires SW: Notification click received');
  
  event.notification.close();

  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    event.notification.close();
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    console.log('✂️ Nuevos Aires SW: Performing background sync');
    
    // Here you would sync data with your backend
    // For now, we'll just log the sync
    
    // Example: Send pending appointments
    const pendingData = await getStoredData('pendingAppointments');
    if (pendingData && pendingData.length > 0) {
      // Send to server
      console.log('✂️ Nuevos Aires SW: Syncing pending appointments:', pendingData.length);
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('✂️ Nuevos Aires SW: Background sync failed:', error);
    return Promise.reject(error);
  }
}

// Helper function to get stored data
async function getStoredData(key) {
  return new Promise((resolve) => {
    // In a real app, you'd get this from IndexedDB
    resolve([]);
  });
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('✂️ Nuevos Aires SW: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('✂️ Nuevos Aires SW: Service Worker loaded successfully');
