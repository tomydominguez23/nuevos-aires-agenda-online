const CACHE_NAME = 'nuevos-aires-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Archivos que se cachearán inmediatamente
const PRECACHE_URLS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/favicon.ico',
  OFFLINE_URL
];

// Archivos que se cachearán bajo demanda
const RUNTIME_CACHE_URLS = [
  '/static/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://cdn.tailwindcss.com/'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Pre-cacheando archivos esenciales');
        return cache.addAll(PRECACHE_URLS.map(url => new Request(url, {
          credentials: 'same-origin'
        })));
      })
      .then(() => {
        console.log('Service Worker: Instalación completada');
        // Forzar la activación inmediata
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error durante la instalación:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Eliminar cachés antiguos
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Eliminando caché antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activación completada');
        // Tomar control de todas las pestañas abiertas
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Service Worker: Error durante la activación:', error);
      })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar peticiones GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Estrategia: Cache First para archivos estáticos
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.destination === 'font') {
    
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then(response => {
              // Verificar si la respuesta es válida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clonar la respuesta para el caché
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(request, responseToCache);
                });
              
              return response;
            });
        })
        .catch(() => {
          // Si es una imagen, devolver una imagen por defecto
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#ec4899"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14">Imagen no disponible</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        })
    );
    return;
  }
  
  // Estrategia: Network First para navegación y API
  if (request.mode === 'navigate' || 
      url.pathname.startsWith('/api/') ||
      request.destination === 'document') {
    
    event.respondWith(
      fetch(request)
        .then(response => {
          // Si es navegación y la respuesta es válida, cachear
          if (request.mode === 'navigate' && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          // Si no hay conexión, servir desde caché o página offline
          return caches.match(request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // Para navegación, servir página offline
              if (request.mode === 'navigate') {
                return caches.match(OFFLINE_URL);
              }
              
              // Para otros recursos, devolver respuesta de error
              return new Response(
                JSON.stringify({
                  error: 'Sin conexión a internet',
                  message: 'Esta funcionalidad requiere conexión a internet'
                }),
                {
                  headers: { 'Content-Type': 'application/json' },
                  status: 503,
                  statusText: 'Service Unavailable'
                }
              );
            });
        })
    );
    return;
  }
  
  // Para otros tipos de peticiones, estrategia Cache First con Network Fallback
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Actualizar caché en segundo plano si es necesario
          fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(request, responseToCache);
                  });
              }
            })
            .catch(() => {
              // Silenciar errores de actualización en segundo plano
            });
          
          return cachedResponse;
        }
        
        return fetch(request)
          .then(response => {
            if (!response || response.status !== 200) {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// Manejo de mensajes desde la aplicación
self.addEventListener('message', event => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        type: 'VERSION',
        payload: { version: CACHE_NAME }
      });
      break;
      
    case 'CLEAN_CACHE':
      caches.delete(CACHE_NAME)
        .then(() => {
          event.ports[0].postMessage({
            type: 'CACHE_CLEANED',
            payload: { success: true }
          });
        })
        .catch(error => {
          event.ports[0].postMessage({
            type: 'CACHE_CLEANED',
            payload: { success: false, error: error.message }
          });
        });
      break;
      
    case 'CACHE_URLS':
      if (payload && payload.urls) {
        caches.open(CACHE_NAME)
          .then(cache => {
            return cache.addAll(payload.urls);
          })
          .then(() => {
            event.ports[0].postMessage({
              type: 'URLS_CACHED',
              payload: { success: true }
            });
          })
          .catch(error => {
            event.ports[0].postMessage({
              type: 'URLS_CACHED',
              payload: { success: false, error: error.message }
            });
          });
      }
      break;
      
    default:
      console.log('Service Worker: Mensaje no reconocido:', type);
  }
});

// Manejo de notificaciones push (para futuras implementaciones)
self.addEventListener('push', event => {
  if (!event.data) {
    return;
  }
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Nueva notificación de Nuevos Aires',
    icon: '/logo192.png',
    badge: '/badge-72x72.png',
    image: data.image,
    tag: data.tag || 'general',
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [
      {
        action: 'open',
        title: 'Ver',
        icon: '/icons/open-icon.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/close-icon.png'
      }
    ],
    data: {
      url: data.url || '/',
      timestamp: Date.now()
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Nuevos Aires', options)
  );
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const { action, data } = event;
  
  if (action === 'close') {
    return;
  }
  
  const urlToOpen = data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Si ya hay una ventana abierta, enfocarla
        for (let client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Sincronización en segundo plano (para futuras implementaciones)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-appointments') {
    event.waitUntil(
      // Aquí se implementaría la sincronización de citas
      syncAppointments()
    );
  }
});

// Función auxiliar para sincronización de citas
async function syncAppointments() {
  try {
    // Implementar lógica de sincronización
    console.log('Service Worker: Sincronizando citas...');
    
    // Ejemplo de implementación:
    // 1. Obtener datos pendientes del IndexedDB
    // 2. Enviar al servidor
    // 3. Actualizar estado local
    
    return Promise.resolve();
  } catch (error) {
    console.error('Service Worker: Error en sincronización:', error);
    throw error;
  }
}

// Logging para debugging
self.addEventListener('error', event => {
  console.error('Service Worker: Error global:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Promise rechazada no manejada:', event.reason);
});

console.log('Service Worker: Archivo cargado correctamente');
