# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Agenda Online de Nuevos Aires Huecuraba! 

## 🌟 Cómo Contribuir

### 🐛 Reportar Bugs
1. Verifica que el bug no haya sido reportado antes
2. Crea un [nuevo issue](https://github.com/tomydominguez23/nuevos-aires-agenda-online/issues/new)
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducir el error
   - Comportamiento esperado vs actual
   - Screenshots si es necesario
   - Información del navegador/dispositivo

### 💡 Sugerir Mejoras
1. Abre un [nuevo issue](https://github.com/tomydominguez23/nuevos-aires-agenda-online/issues/new)
2. Etiquétalo como "enhancement"
3. Describe:
   - La funcionalidad propuesta
   - Por qué sería útil
   - Posible implementación

### 🔧 Contribuir con Código

#### Configuración del Entorno
```bash
# Clonar el repositorio
git clone https://github.com/tomydominguez23/nuevos-aires-agenda-online.git
cd nuevos-aires-agenda-online

# Crear rama para tu feature
git checkout -b feature/nombre-de-tu-feature

# Realizar cambios y hacer commit
git add .
git commit -m "feat: descripción clara del cambio"

# Subir cambios
git push origin feature/nombre-de-tu-feature
```

#### Estándares de Código
- **HTML**: Semántico y accesible
- **CSS/Tailwind**: Classes utilitarias, responsive-first
- **JavaScript**: ES6+, código limpio y comentado
- **React**: Componentes funcionales con hooks

#### Convenciones de Commit
Usa el formato [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato/estilo
- `refactor:` Refactoring de código
- `test:` Agregar o corregir tests

### 📝 Pull Request Process
1. Asegúrate de que tu código funcione correctamente
2. Actualiza la documentación si es necesario
3. Crea el Pull Request con:
   - Título descriptivo
   - Descripción detallada de los cambios
   - Referencias a issues relacionados
   - Screenshots si hay cambios visuales

## 🎯 Áreas de Contribución

### 🏆 Prioridad Alta
- [ ] Integración con base de datos real
- [ ] Sistema de autenticación
- [ ] Notificaciones push
- [ ] Mejoras de accesibilidad
- [ ] Tests automatizados

### 🚀 Prioridad Media
- [ ] Nuevas funcionalidades de marketing
- [ ] Integración con APIs de pago
- [ ] Análisis avanzado de datos
- [ ] Optimizaciones de rendimiento
- [ ] Temas personalizables

### 💡 Ideas Bienvenidas
- [ ] Integraciones con redes sociales
- [ ] Funciones de IA/ML
- [ ] Módulos adicionales
- [ ] Mejoras UX/UI
- [ ] Documentación mejorada

## 🔍 Revisión de Código

### Criterios de Aceptación
- ✅ Código limpio y bien comentado
- ✅ Funcionalidad completa y sin bugs
- ✅ Responsive y accesible
- ✅ Compatible con navegadores principales
- ✅ Documentación actualizada

### Proceso de Review
1. **Revisión automática** - GitHub Actions
2. **Revisión técnica** - Mantenedores del proyecto
3. **Testing manual** - Funcionalidad en diferentes dispositivos
4. **Merge** - Una vez aprobado

## 📚 Recursos Útiles

### Documentación Técnica
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

### Herramientas Recomendadas
- **Editor**: VS Code con extensiones React/Tailwind
- **Navegador**: Chrome DevTools
- **Design**: Figma para mockups
- **Testing**: Manual en múltiples dispositivos

## 🎨 Guía de Diseño

### Colores Principales
```css
/* Esquema de colores del salón */
Primary: #ec4899 (Rosa)
Secondary: #0ea5e9 (Azul)
Success: #10b981 (Verde)
Warning: #f59e0b (Amarillo)
Error: #ef4444 (Rojo)
```

### Tipografía
- **Font Family**: Inter (Google Fonts)
- **Tamaños**: Escala tipográfica de Tailwind CSS
- **Weights**: 300, 400, 500, 600, 700, 800

### Componentes
- **Botones**: Rounded corners, gradients, hover effects
- **Cards**: Subtle shadows, border-left accent
- **Inputs**: Focus states, proper validation
- **Icons**: Emoji-based for universal compatibility

## 🤔 ¿Necesitas Ayuda?

### Canales de Comunicación
- **Issues**: Para bugs y features específicas
- **Email**: tomasdominguezcarrizo.23@gmail.com
- **WhatsApp**: +56 9 1234 5678 (solo para consultas urgentes)

### Preguntas Frecuentes

**Q: ¿Puedo usar este código para mi propio salón?**
A: ¡Sí! Está bajo licencia MIT, puedes usarlo libremente.

**Q: ¿Cómo personalizo los datos del salón?**
A: Edita las variables en `index.html` en la sección `salonInfo`.

**Q: ¿Puedo agregar nuevas funcionalidades?**
A: ¡Por supuesto! Crea un issue primero para discutir la implementación.

**Q: ¿Hay algún roadmap del proyecto?**
A: Sí, revisa el README.md para ver las próximas funcionalidades.

## 🎉 Reconocimientos

Todos los contribuidores serán reconocidos en:
- README.md del proyecto
- Releases notes
- Créditos en la aplicación

### Tipos de Contribución
- 💻 **Code**: Contribuciones de código
- 🎨 **Design**: Mejoras de diseño/UX
- 📖 **Documentation**: Mejoras en documentación
- 🐛 **Bug Reports**: Reportes de bugs detallados
- 💡 **Ideas**: Sugerencias de funcionalidades
- 🔍 **Testing**: Testing manual en diferentes dispositivos

---

## 📄 Código de Conducta

### Nuestro Compromiso
Nos comprometemos a hacer de la participación en nuestro proyecto una experiencia libre de acoso para todos, independientemente de:
- Edad, tamaño corporal, discapacidad visible o invisible
- Etnia, características sexuales, identidad y expresión de género
- Nivel de experiencia, educación, estatus socioeconómico
- Nacionalidad, apariencia personal, raza, religión
- Identidad y orientación sexual

### Estándares de Comportamiento
**Ejemplos de comportamiento que contribuye a crear un ambiente positivo:**
- Usar lenguaje acogedor e inclusivo
- Ser respetuoso de diferentes puntos de vista y experiencias
- Aceptar críticas constructivas de buena manera
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

**Ejemplos de comportamiento inaceptable:**
- Uso de lenguaje o imágenes sexualizadas y atención sexual no deseada
- Comentarios insultantes/despectivos y ataques personales o políticos
- Acoso público o privado
- Publicar información privada de otros sin permiso explícito
- Otras conductas que podrían considerarse inapropiadas en un entorno profesional

### Aplicación
Los casos de comportamiento abusivo, acosador o inaceptable pueden ser reportados contactando al equipo del proyecto en tomasdominguezcarrizo.23@gmail.com.

---

**¡Gracias por contribuir al futuro digital de los salones de belleza!** 💄✨
