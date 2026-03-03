# 🚀 INICIO RÁPIDO - 5 PASOS

## ✅ Configuración Inmediata (2 minutos)

### 1️⃣ Inicia XAMPP
```
1. Abre XAMPP Control Panel
2. Haz clic en "Start" junto a Apache
3. Espera a que el estado sea "Running" (verde)
```

### 2️⃣ Verifica la Ruta
```
Tu proyecto está en:
c:\xampp\htdocs\ProyectosPersonales\10GEN-PKM-STARTERS\Web
```

### 3️⃣ Abre en el Navegador
```
Copia y pega esta URL en tu navegador:

http://localhost/ProyectosPersonales/10GEN-PKM-STARTERS/Web/html/index.html

o más corto:

http://localhost/ProyectosPersonales/10GEN-PKM-STARTERS/Web/html/
```

### 4️⃣ ¡Listo! 🎉
```
La aplicación se cargará automáticamente y ejecutará el análisis.
Espera unos segundos mientras se completa el primer análisis.
```

### 5️⃣ Explora las Funcionalidades
```
✅ Ver predicción de cada starter
✅ Ajustar pesos con los sliders
✅ Recalcular predicción
✅ Ver gráficas interactivas
✅ Comparar con generaciones anteriores
✅ Exportar datos en JSON
✅ Guardar simulaciones
✅ Activar modo oscuro
```

---

## 🔧 Si Algo No Funciona

### Apache no inicia en XAMPP
```
1. Verifica que el puerto 80 no esté ocupado
2. Cierra Skype o IIS si los tienes
3. Cambia el puerto en XAMPP Config → httpd.conf
```

### Error 404 - Página no encontrada
```
1. Verifica que Apache esté corriendo (verde en XAMPP)
2. Revisa la URL: debe empezar con http://localhost/
3. Verifica que la carpeta Web existe en la ruta
```

### La página carga pero sin estilos
```
1. Verifica que styles.css existe en /css/
2. Abre la consola del navegador (F12) y busca errores
3. Verifica las rutas relativas en index.html
```

### Las gráficas no aparecen
```
1. Verifica conexión a internet (Chart.js es CDN)
2. Espera a que cargue completamente
3. Revisa la consola del navegador (F12)
```

---

## 📊 Qué Esperar

### Al Cargar la Página:
- ⏳ Loader con animación (2-3 segundos)
- 📊 3 cards con los starters
- 📈 4 gráficas interactivas
- 📋 Análisis detallado en cards
- 🎯 Conclusión automática

### Resultados Típicos:
```
🔥 Pombon (Fuego): ~40-45% probabilidad
💧 Gecqua (Agua): ~30-35% probabilidad
🌱 Browt (Planta): ~25-30% probabilidad

(Basado en datos históricos y simulaciones)
```

---

## 🎮 Primeras Acciones Recomendadas

### 1. Observa la Predicción Inicial
- El starter ganador aparecerá con borde dorado
- Revisa los porcentajes en cada card

### 2. Explora las Gráficas
- Gráfica de dona: Probabilidades finales
- Gráfica de barras: Histórico por tipo
- Gráfica radar: Factores de influencia
- Gráfica de línea: Tendencias de búsqueda

### 3. Ajusta los Pesos
- Mueve los sliders en la sección de controles
- Prueba dar más peso a "Tendencias" o "Encuestas"
- Haz clic en "Recalcular Predicción"

### 4. Compara Generaciones
- Haz clic en "Comparar Generaciones"
- Observa qué tipo ha ganado más veces
- Identifica patrones históricos

### 5. Guarda tu Simulación
- Ajusta parámetros a tu gusto
- Haz clic en "Guardar Simulación Actual"
- Revisa el historial al final de la página

---

## 📱 Atajos de Teclado

- **F5**: Recargar página
- **Ctrl + F5**: Recargar sin caché
- **F12**: Abrir consola del navegador
- **Ctrl + +/-**: Zoom in/out

---

## 💾 Persistencia de Datos

### Lo que se Guarda Automáticamente:
- ✅ Preferencia de modo oscuro/claro
- ✅ Historial de simulaciones (hasta 10)
- ✅ Última configuración de pesos

### Lo que NO se Guarda:
- ❌ Caché de APIs (se limpia cada hora)
- ❌ Estado de gráficas
- ❌ Sección de comparación expandida/contraída

---

## 🎨 Personalización Rápida

### Cambiar Colores del Tema:
```
Edita: Web/css/styles.css
Busca: :root { ... }
Modifica las variables CSS
```

### Cambiar Pesos por Defecto:
```
Edita: Web/js/config.js
Busca: defaultWeights
Modifica los valores (deben sumar 100)
```

### Cambiar Datos de Starters:
```
Edita: Web/js/config.js
Busca: gen10Starters
Modifica nombres, descripciones, etc.
```

---

## 📚 Documentación Completa

Para más detalles, consulta:
- **README.md**: Documentación completa
- **IMAGES_GUIDE.md**: Guía de imágenes
- **config.js**: Archivo de configuración

---

## 🎯 Objetivo del Proyecto

**Predecir qué starter de la Gen 10 será el más elegido**

Basándose en:
- 📊 Datos históricos de 9 generaciones
- 🔍 Tendencias de búsqueda actuales
- 🗳️ Encuestas públicas simuladas
- 🐾 Popularidad de inspiraciones animales
- 🌏 Relevancia cultural de Indonesia

---

## ✨ Características Destacadas

- ✅ **100% Funcional** sin configuración adicional
- ✅ **Responsive** para móviles y tablets
- ✅ **Modo Oscuro** incluido
- ✅ **Sin Base de Datos** requerida
- ✅ **APIs Simuladas** con datos realistas
- ✅ **Exportación JSON** completa
- ✅ **Caché Automático** de 1 hora
- ✅ **Historial Local** persistente

---

## 🏆 Resultado Esperado

```
┌─────────────────────────────────────────┐
│  🔥 POMBON ES EL FAVORITO PARA GANAR   │
│                                         │
│  Probabilidad: ~42%                     │
│                                         │
│  Factores clave:                        │
│  • Tipo Fuego ha ganado 6/9 veces      │
│  • Alta popularidad en encuestas        │
│  • Inspiración (perro) muy popular     │
│  • Tendencia estable y fuerte          │
└─────────────────────────────────────────┘
```

---

## 🎉 ¡Disfruta!

¿Todo funcionó?
✅ **¡Perfecto! Explora todas las funcionalidades**

¿Tienes problemas?
❓ **Revisa la sección "Si Algo No Funciona" arriba**

---

**Proyecto creado con ❤️ para análisis predictivo de Pokémon**

🌱 Browt | 🔥 Pombon | 💧 Gecqua

**¿Cuál elegirás tú?** 🎮
