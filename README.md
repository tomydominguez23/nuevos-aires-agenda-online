# 💇‍♀️ Nuevos Aires Huecuraba - Sistema de Agenda Online

![Nuevos Aires Logo](https://img.shields.io/badge/Nuevos%20Aires-Sistema%20de%20Agenda-ec4899?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-9C27B0?style=for-the-badge&logo=pwa)

## 📋 Descripción

Sistema integral de gestión para **Nuevos Aires Huecuraba**, un salón de belleza con más de 15 años de experiencia. Esta aplicación web moderna permite gestionar completamente las operaciones del salón, desde reservas hasta inventario y marketing automatizado.

### 🌟 Características Principales

- **📅 Gestión de Agenda Completa**
  - Reservas en tiempo real
  - Vista diaria, semanal y mensual
  - Estados de citas (confirmada, pendiente, cancelada)
  - Asignación de profesionales
  - Filtros avanzados

- **👥 Gestión de Clientes**
  - Base de datos completa de clientes
  - Historial de servicios
  - Sistema VIP automático
  - Seguimiento de gastos totales

- **📦 Control de Inventario**
  - Stock en tiempo real
  - Alertas de productos bajos
  - Categorización automática
  - Valorización de inventario

- **💰 Panel Financiero**
  - Ingresos diarios y mensuales
  - Cálculo automático de comisiones
  - Reportes por profesional
  - Estadísticas de servicios populares

- **📱 Marketing Automatizado**
  - Campañas automáticas por WhatsApp
  - Recuperación de clientes inactivos
  - Recordatorios de citas
  - Promociones personalizadas

- **⚙️ Configuración Avanzada**
  - Gestión de profesionales
  - Servicios y precios
  - Horarios de trabajo
  - Configuración del salón

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18+** - Librería principal para UI
- **Tailwind CSS** - Framework de estilos utilitarios
- **Lucide React** - Iconografía moderna
- **JavaScript ES6+** - Programación moderna

### Funcionalidades Web
- **PWA (Progressive Web App)** - Instalable como app nativa
- **Service Worker** - Funcionalidad offline
- **Responsive Design** - Adaptable a todos los dispositivos
- **SEO Optimizado** - Metadatos completos

### Herramientas de Desarrollo
- **Create React App** - Base del proyecto
- **ESLint** - Calidad de código
- **Git** - Control de versiones

## 📱 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tomydominguez23/nuevos-aires-agenda-online.git
cd nuevos-aires-agenda-online
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
```

### 3. Ejecutar en Desarrollo
```bash
npm start
# o
yarn start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### 4. Compilar para Producción
```bash
npm run build
# o
yarn build
```

## 📂 Estructura del Proyecto

```
nuevos-aires-agenda-online/
├── public/
│   ├── index.html          # HTML base con configuración PWA
│   ├── manifest.json       # Configuración PWA
│   ├── sw.js              # Service Worker
│   └── robots.txt         # SEO
├── src/
│   ├── App.js             # Componente principal
│   ├── App.css            # Estilos personalizados
│   ├── index.js           # Punto de entrada
│   └── index.css          # Estilos base
├── package.json           # Dependencias y scripts
├── README.md             # Documentación
└── .gitignore           # Archivos ignorados por Git
```

## 🔧 Configuración Personalizada

### Datos del Salón
Edita la información del salón en `src/App.js`:

```javascript
// Información del salón
const salonInfo = {
  nombre: "Nuevos Aires Huecuraba",
  direccion: "Av. Pedro Fontova 6651, local 27",
  telefono: "+56 9 1234 5678",
  email: "contacto@nuevosaireshuechuraba.com"
};
```

### Profesionales
Configura el equipo de trabajo:

```javascript
const profesionales = [
  { id: 1, nombre: 'María González', especialidad: 'Estilista Senior', color: '#FF6B6B' },
  { id: 2, nombre: 'Carlos Ruiz', especialidad: 'Estilista', color: '#4ECDC4' },
  // Agregar más profesionales...
];
```

### Servicios y Precios
Personaliza los servicios ofrecidos:

```javascript
const servicios = [
  { id: 1, nombre: 'Corte Mujer', precio: 25000, duracion: 45, categoria: 'Corte' },
  { id: 2, nombre: 'Corte Hombre', precio: 18000, duracion: 30, categoria: 'Corte' },
  // Agregar más servicios...
];
```

## 📱 Características PWA

### Instalación como App
- La aplicación puede instalarse como una app nativa en móviles y escritorio
- Icono personalizado en el escritorio
- Funciona offline con Service Worker
- Actualizaciones automáticas

### Accesos Directos
- **Nueva Cita**: Agendar rápidamente
- **Ver Agenda**: Revisar citas del día
- **Clientes**: Gestionar base de datos
- **Inventario**: Controlar stock

## 🎨 Personalización de Diseño

### Colores Principales
```css
:root {
  --primary-color: #ec4899;    /* Rosa principal */
  --primary-dark: #be185d;     /* Rosa oscuro */
  --success-color: #10b981;    /* Verde éxito */
  --warning-color: #f59e0b;    /* Amarillo advertencia */
  --error-color: #ef4444;      /* Rojo error */
}
```

### Tipografía
- **Font Principal**: Inter (Google Fonts)
- **Tamaños**: Responsive con clamp()
- **Pesos**: 300, 400, 500, 600, 700, 800

## 📊 Funcionalidades Destacadas

### Dashboard Interactivo
- Estadísticas en tiempo real
- Gráficos de rendimiento
- Indicadores de estado
- Alertas importantes

### Sistema de Filtros
- Por fecha
- Por profesional
- Por estado de cita
- Por cliente
- Búsqueda global

### Responsive Design
- **Móvil First**: Diseñado primero para móviles
- **Tablet Optimizado**: Experiencia perfecta en tablets
- **Desktop Complete**: Funcionalidad completa en escritorio

## 🔐 Seguridad y Privacidad

### Datos Locales
- Todos los datos se almacenan localmente
- Sin conexión a servidores externos
- Privacidad total del cliente

### Service Worker
- Cacheo inteligente de recursos
- Funcionalidad offline
- Actualizaciones automáticas

## 🚀 Despliegue

### Netlify (Recomendado)
1. Conectar repositorio
2. Comando build: `npm run build`
3. Directorio público: `build`
4. Configurar redirects para SPA

### Vercel
1. Importar proyecto
2. Configurar automáticamente
3. Deploy instantáneo

### GitHub Pages
1. `npm run build`
2. Deploy carpeta `build`
3. Configurar dominio personalizado

## 📈 Roadmap Futuro

### Versión 1.1
- [ ] Integración con WhatsApp Business API
- [ ] Notificaciones push
- [ ] Sincronización con Google Calendar
- [ ] Reportes PDF automáticos

### Versión 1.2
- [ ] Sistema de pagos online
- [ ] Integración con redes sociales
- [ ] App móvil nativa
- [ ] Sistema de reviews

### Versión 2.0
- [ ] Inteligencia artificial para recomendaciones
- [ ] Multi-sucursal
- [ ] API pública
- [ ] Dashboard analytics avanzado

## 🤝 Contribución

### Reportar Bugs
1. Abrir issue describiendo el problema
2. Incluir pasos para reproducir
3. Especificar navegador y versión

### Sugerir Mejoras
1. Abrir issue con tag "enhancement"
2. Describir la funcionalidad deseada
3. Explicar el caso de uso

### Pull Requests
1. Fork del repositorio
2. Crear rama feature
3. Commit con mensaje descriptivo
4. Pull request a main

## 📞 Contacto y Soporte

### Nuevos Aires Huecuraba
- **Dirección**: Av. Pedro Fontova 6651, local 27, Huechuraba
- **Teléfono**: [Agregar número real]
- **Email**: [Agregar email real]
- **Web**: [nuevosaireshuechuraba.com](https://nuevosaireshuechuraba.com)

### Soporte Técnico
- **GitHub Issues**: Para reportar bugs
- **Email**: [Agregar email de soporte]
- **WhatsApp**: [Agregar número de soporte]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **Equipo Nuevos Aires Huecuraba** - Por confiar en esta solución
- **Comunidad React** - Por las herramientas increíbles
- **Tailwind CSS** - Por el framework de estilos
- **Lucide** - Por los iconos hermosos

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Made with ❤️ by [tomydominguez23](https://github.com/tomydominguez23)

</div>
