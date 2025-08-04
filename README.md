# 💄 Nuevos Aires Huecuraba - Sistema de Agenda Online

![Status](https://img.shields.io/badge/Status-Activo-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Sistema de agenda online profesional para Nuevos Aires Huecuraba** - Gestión integral de salón de belleza con tecnología moderna y interfaz intuitiva.

## 🌟 Características Principales

### 📅 **Gestión de Agenda Avanzada**
- ✅ Vista de citas por día con filtros inteligentes
- ✅ Estados de citas (confirmada, pendiente, cancelada)
- ✅ Búsqueda por cliente, profesional o servicio
- ✅ Estadísticas en tiempo real
- ✅ Integración directa con WhatsApp

### 👥 **Base de Datos de Clientes**
- ✅ Perfiles completos con historial de servicios
- ✅ Sistema VIP automático
- ✅ Seguimiento de servicios frecuentes
- ✅ Comunicación directa via WhatsApp
- ✅ Recordatorios de cumpleaños

### 📦 **Control de Inventario Inteligente**
- ✅ Stock en tiempo real con alertas automáticas
- ✅ Categorización por proveedores
- ✅ Valorización automática del inventario
- ✅ Alertas de stock crítico y bajo

### 💰 **Panel Financiero Completo**
- ✅ Reportes de ingresos diarios y mensuales
- ✅ Cálculo automático de comisiones por profesional
- ✅ Estadísticas de servicios más populares
- ✅ Análisis visual con gráficos interactivos

### 📱 **Marketing Automatizado**
- ✅ Campañas automáticas (recordatorios, recuperación de clientes)
- ✅ Mensajes rápidos predefinidos
- ✅ Envío masivo personalizado
- ✅ Integración completa con WhatsApp Business

### ⚙️ **Configuración Profesional**
- ✅ Gestión de profesionales y horarios
- ✅ Catálogo completo de servicios y precios
- ✅ Información del salón editable
- ✅ Configuración de redes sociales

## 🚀 **Acceso Directo**

### 🌐 **Usar Online (Recomendado)**
👉 **[ABRIR APLICACIÓN](https://tomydominguez23.github.io/nuevos-aires-agenda-online/)**

*La aplicación funciona directamente en tu navegador, sin instalaciones.*

### 📱 **Instalar como App Móvil**
1. Abre la aplicación en tu móvil
2. Aparecerá opción "Agregar a pantalla de inicio"
3. ¡Listo! Tendrás la app como aplicación nativa

## 💻 **Instalación Local (Para Desarrolladores)**

```bash
# 1. Clonar el repositorio
git clone https://github.com/tomydominguez23/nuevos-aires-agenda-online.git
cd nuevos-aires-agenda-online

# 2. Abrir index.html en cualquier navegador
# O usar un servidor local:
python -m http.server 8000
# Luego abrir: http://localhost:8000
```

## 📊 **Datos del Salón**

### 🏪 **Información General**
- **Nombre:** Nuevos Aires Huecuraba
- **Dirección:** Av. Pedro Fontova 6651, Local 27, Huechuraba
- **Teléfono:** +56 9 1234 5678
- **Email:** contacto@nuevosaireshuecuraba.com

### 👥 **Equipo Profesional**
- **María González** - Estilista Senior (8 años de experiencia)
- **Carlos Ruiz** - Especialista en Color (6 años de experiencia)
- **Ana López** - Estilista (4 años de experiencia)
- **Sofía Martín** - Manicurista/Recepción (3 años de experiencia)

### ✂️ **Servicios Disponibles**
| Servicio | Precio | Duración |
|----------|--------|----------|
| Corte Mujer | $28.000 | 45 min |
| Corte Hombre | $20.000 | 30 min |
| Tinte Global | $48.000 | 120 min |
| Mechas/Highlights | $65.000 | 180 min |
| Tratamiento Keratina | $85.000 | 150 min |
| Manicure Spa | $18.000 | 45 min |
| Pedicure Spa | $22.000 | 60 min |
| Uñas Acrílicas | $25.000 | 90 min |

## 🎯 **Beneficios del Sistema**

### ⚡ **Para la Administración**
- **Reduce 80% el tiempo** en gestión manual de WhatsApp
- **Automatiza recordatorios** de citas
- **Controla inventario** en tiempo real
- **Genera reportes** financieros automáticos
- **Optimiza comunicación** con clientes

### 💡 **Para los Clientes**
- **Experiencia profesional** y moderna
- **Comunicación directa** via WhatsApp
- **Recordatorios automáticos** de citas
- **Atención personalizada** con historial completo

### 📈 **Para el Negocio**
- **Aumenta retención** de clientes con sistema VIP
- **Mejora eficiencia** operacional
- **Reduce pérdidas** por stock descontrolado
- **Incrementa ventas** con marketing automatizado

## 🛠️ **Tecnologías Utilizadas**

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** React 18 (vía CDN)
- **Estilos:** Tailwind CSS 3.x
- **Hosting:** GitHub Pages
- **PWA:** Service Worker, Manifest
- **Responsive:** Mobile-first design

## 📱 **Compatibilidad**

### ✅ **Navegadores Soportados**
- Chrome 90+ ✅
- Firefox 88+ ✅  
- Safari 14+ ✅
- Edge 90+ ✅

### 📱 **Dispositivos**
- **Desktop** - Experiencia completa ✅
- **Tablet** - Interfaz adaptada ✅
- **Móvil** - Optimizado para uso táctil ✅

## 🔧 **Personalización**

### 🎨 **Cambiar Colores del Salón**
Edita las variables CSS en `index.html`:
```css
:root {
  --primary-color: #ec4899; /* Rosa principal */
  --secondary-color: #0ea5e9; /* Azul secundario */
}
```

### 📝 **Modificar Datos del Salón**
En `index.html`, busca y modifica:
```javascript
const salonInfo = {
  nombre: 'TU SALÓN',
  direccion: 'TU DIRECCIÓN',
  telefono: 'TU TELÉFONO',
  // ... más configuraciones
};
```

## 🚀 **Roadmap de Mejoras**

### 🔜 **Próximas Versiones**
- [ ] **Base de datos real** (Firebase/Supabase)
- [ ] **Sistema de usuarios** con roles
- [ ] **Pagos online** integrados
- [ ] **Análisis avanzado** con IA
- [ ] **App móvil nativa**
- [ ] **Integración con redes sociales**

## 📞 **Soporte y Contacto**

### 🤝 **¿Necesitas Ayuda?**
- **Issues:** [Crear un issue](https://github.com/tomydominguez23/nuevos-aires-agenda-online/issues)
- **Email:** tomasdominguezcarrizo.23@gmail.com
- **WhatsApp:** +56 9 1234 5678

### 💼 **Para Otros Salones**
¿Quieres este sistema para tu salón? Contáctanos para:
- ✅ Personalización completa
- ✅ Instalación y configuración
- ✅ Capacitación del equipo
- ✅ Soporte técnico continuo

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**¡Transforma tu salón con tecnología moderna!** 

[![GitHub stars](https://img.shields.io/github/stars/tomydominguez23/nuevos-aires-agenda-online?style=social)](https://github.com/tomydominguez23/nuevos-aires-agenda-online/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tomydominguez23/nuevos-aires-agenda-online?style=social)](https://github.com/tomydominguez23/nuevos-aires-agenda-online/network)

*Desarrollado con ❤️ para Nuevos Aires Huecuraba*

</div>