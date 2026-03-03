# 🌴 Pokémon Viento y Oleaje - Análisis Predictivo Gen 10

## 📋 Descripción del Proyecto

Aplicación web completa que realiza un **análisis predictivo** sobre cuál starter de la décima generación de Pokémon será el más elegido por los jugadores. Utiliza datos históricos desde la 1ª hasta la 9ª generación, tendencias de búsqueda, encuestas públicas y factores culturales para generar predicciones basadas en algoritmos de machine learning simplificados.

### 🎮 Los Starters de Indonesia - Gen 10

**Región:** Indonesia (Pokémon Viento y Oleaje)

- **🌱 Browt** (Planta) - Pokémon Pollito Haba
- **🔥 Pombon** (Fuego) - Pokémon Perrito  
- **💧 Gecqua** (Agua) - Pokémon Acuageco

---

## 📁 Estructura del Proyecto

```
Web/
├── html/
│   └── index.html              # Página principal
├── css/
│   └── styles.css              # Estilos completos con tema indonesio
├── js/
│   ├── script.js               # Lógica principal e interfaz
│   ├── analysis.js             # Algoritmo predictivo
│   └── api.js                  # Gestión de APIs
├── php/
│   ├── predict.php             # Backend de predicción
│   └── apiFetcher.php          # Fetcher de APIs externas
├── data/
│   ├── historical.json         # Datos históricos de starters
│   └── cache/                  # Caché automático de APIs
└── images/
    └── starters/               # Imágenes de los starters
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **XAMPP** (Apache + PHP 7.4+)
- Navegador web moderno (Chrome, Firefox, Edge)
- Conexión a internet (para APIs externas)

### Pasos de Instalación

1. **Ubicar el proyecto en XAMPP**
   
   El proyecto ya está ubicado en:
   ```
   c:\xampp\htdocs\ProyectosPersonales\10GEN-PKM-STARTERS\Web
   ```

2. **Iniciar Apache en XAMPP**
   
   - Abre XAMPP Control Panel
   - Haz clic en "Start" junto a Apache
   - Verifica que esté en estado "Running"

3. **Crear directorio de caché**
   
   El directorio se crea automáticamente, pero si necesitas crearlo manualmente:
   ```
   Web/data/cache/
   ```

4. **Acceder a la aplicación**
   
   Abre tu navegador y navega a:
   ```
   http://localhost/ProyectosPersonales/10GEN-PKM-STARTERS/Web/html/index.html
   ```

---

## 🔧 Configuración de APIs (Opcional)

### APIs Implementadas

El proyecto funciona inmediatamente con datos simulados realistas. Sin embargo, si deseas conectar APIs reales:

#### 1. **PokéAPI** (Ya integrada, sin configuración necesaria)
- URL: https://pokeapi.co
- Sin necesidad de API key
- Obtiene datos oficiales de Pokémon

#### 2. **Reddit API** (Opcional)
Para conectar Reddit, edita `apiFetcher.php`:
```php
define('REDDIT_CLIENT_ID', 'tu_client_id');
define('REDDIT_SECRET', 'tu_secret');
```

#### 3. **YouTube Data API** (Opcional)
Para conectar YouTube, edita `apiFetcher.php`:
```php
define('YOUTUBE_API_KEY', 'tu_api_key');
```

#### 4. **Google Trends** (Simulado)
Los datos de tendencias están simulados de manera realista. Para datos reales, considera usar servicios como SerpAPI.

---

## 📊 Funcionalidades Principales

### 1. **Análisis Predictivo Avanzado**
- Sistema de puntuación ponderada
- Simulación Monte Carlo (10,000 iteraciones)
- Regresión lineal simple
- Análisis histórico por tipo

### 2. **Visualización de Datos**
- Gráficas interactivas con Chart.js
- Dashboard moderno y responsive
- Modo oscuro/claro
- Animaciones suaves

### 3. **Factores Analizados**
- ✅ Popularidad histórica por tipo (30%)
- ✅ Tendencias actuales de búsqueda (25%)
- ✅ Encuestas públicas (20%)
- ✅ Popularidad de inspiración animal (15%)
- ✅ Relevancia cultural indonesia (10%)

### 4. **Ajuste Manual de Pesos**
- Controles deslizantes para cada factor
- Recalculación en tiempo real
- Restauración de valores por defecto

### 5. **Comparación Histórica**
- Visualización de starters ganadores por generación
- Análisis de patrones históricos
- Estadísticas por tipo

### 6. **Exportación de Datos**
- Exportar resultados en formato JSON
- Incluye todos los datos y predicciones
- Timestamp automático

### 7. **Historial de Simulaciones**
- Guardar simulaciones personalizadas
- Almacenamiento en LocalStorage
- Visualización de cambios en el tiempo

---

## 💻 Uso de la Aplicación

### Pantalla Principal

1. **Ver Predicción Inicial**
   - La aplicación ejecuta automáticamente el análisis al cargar
   - Los resultados aparecen en las cards de cada starter
   - El ganador se resalta con animación dorada

2. **Ajustar Parámetros**
   - Desliza los controles para modificar pesos
   - Los valores se actualizan en tiempo real
   - Haz clic en "Recalcular Predicción" para aplicar cambios

3. **Explorar Análisis Detallado**
   - Revisa las 4 gráficas interactivas
   - Lee el análisis detallado en las cards
   - Consulta la conclusión automática

4. **Comparar Generaciones**
   - Haz clic en "Comparar Generaciones"
   - Visualiza qué tipo ganó en cada generación
   - Identifica patrones históricos

5. **Guardar Simulación**
   - Ajusta los parámetros a tu gusto
   - Haz clic en "Guardar Simulación Actual"
   - Revisa el historial en la parte inferior

6. **Exportar Datos**
   - Haz clic en "Exportar JSON"
   - Se descarga un archivo con todos los datos
   - Incluye predicción y datos completos

### Modo Oscuro

- Haz clic en el botón "🌙 Modo Oscuro" en el header
- El tema se guarda automáticamente
- Cambia a "☀️ Modo Claro" para volver

---

## 🧠 Algoritmo Predictivo

### Metodología

El sistema utiliza un **modelo híbrido** que combina:

1. **Sistema de Puntuación Ponderada**
   ```
   Score Total = (HistóricoScore × 30%) + (TrendsScore × 25%) + 
                 (PollsScore × 20%) + (AnimalScore × 15%) + 
                 (CultureScore × 10%)
   ```

2. **Conversión a Probabilidades**
   ```
   Probabilidad = (Score Individual / Suma de Scores) × 100
   ```

3. **Simulación Monte Carlo**
   - 10,000 iteraciones
   - Distribución basada en probabilidades base
   - Refina estimaciones finales

4. **Regresión Lineal Simple**
   - Analiza tendencias históricas por tipo
   - Identifica patrones crecientes/decrecientes
   - Ajusta predicciones según tendencias

### Factores Detallados

#### 1. Popularidad Histórica (30%)
- Cuenta victorias por tipo en 9 generaciones
- Da más peso a las 3 generaciones más recientes
- Normaliza a escala 0-100

#### 2. Tendencias de Búsqueda (25%)
- Volumen de búsquedas simulado
- Tendencia (rising/stable/declining)
- Bonus por tendencia creciente

#### 3. Encuestas Públicas (20%)
- Promedio de múltiples fuentes
- Twitter, Reddit, YouTube, Serebii, Bulbapedia
- Normalizado a escala 0-100

#### 4. Popularidad Animal (15%)
- Popularidad general del animal
- Relevancia cultural
- Conexión con Indonesia

#### 5. Relevancia Cultural (10%)
- Cultural fit con Indonesia
- Simbolismo local
- Favorabilidad regional

---

## 🎨 Diseño y Estilo

### Paleta de Colores

**Tema Indonesia Tropical:**
- Primario: `#FF6B35` (Naranja tropical)
- Secundario: `#F7931E` (Ámbar)
- Acento: `#4ECDC4` (Turquesa)
- Éxito: `#95E1D3` (Verde agua)

**Tipos de Pokémon:**
- Planta: `#78C850`
- Fuego: `#F08030`
- Agua: `#6890F0`

### Responsive Design

- Desktop: 1400px max-width
- Tablet: Grid adaptativo
- Mobile: Columna única
- Breakpoint: 768px

---

## 🔍 APIs y Datos

### Datos Históricos

El archivo `historical.json` contiene:
- 9 generaciones completas
- Información detallada de cada starter
- Popularidad y cultural impact
- Años y regiones

### Caché de APIs

Las respuestas de APIs se cachean automáticamente:
- Duración: 1 hora
- Ubicación: `data/cache/`
- Formato: JSON
- Limpieza: Automática por expiración

### Fallback de Datos

Si alguna API falla:
- Se usan datos simulados realistas
- No se interrumpe la funcionalidad
- Se muestra mensaje en consola

---

## 🐛 Solución de Problemas

### La página no carga

1. Verifica que Apache esté corriendo en XAMPP
2. Comprueba la URL: `http://localhost/ProyectosPersonales/10GEN-PKM-STARTERS/Web/html/index.html`
3. Revisa la consola del navegador (F12)

### Errores de PHP

1. Verifica que PHP esté habilitado en Apache
2. Revisa los logs de Apache: `xampp/apache/logs/error.log`
3. Asegúrate de que el directorio `data/cache/` tenga permisos de escritura

### Las gráficas no aparecen

1. Verifica conexión a internet (Chart.js se carga desde CDN)
2. Revisa la consola del navegador
3. Limpia caché del navegador

### Datos no se actualizan

1. Borra caché: `Web/data/cache/`
2. Limpia LocalStorage del navegador
3. Recarga la página con Ctrl+F5

---

## 📈 Próximas Mejoras

- [ ] Integración real con Reddit API
- [ ] Conexión a YouTube Data API
- [ ] Sistema de votación en tiempo real
- [ ] Base de datos MySQL para historial
- [ ] Panel de administración
- [ ] Exportación a PDF
- [ ] Compartir en redes sociales
- [ ] Versión PWA (Progressive Web App)

---

## 📝 Créditos y Licencia

### Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Backend:** PHP 7.4+
- **Gráficas:** Chart.js 3.x
- **APIs:** PokéAPI, Wikipedia API
- **Servidor:** XAMPP (Apache)

### Datos de Pokémon

- PokéAPI: https://pokeapi.co
- Datos históricos compilados desde fuentes oficiales
- Starters Gen 10 son ficticios para este proyecto

### Autor

Proyecto desarrollado para análisis educativo y demostración de habilidades en desarrollo web full-stack.

### Licencia

Este proyecto es de código abierto para fines educativos.

---

## 📞 Soporte

Si encuentras problemas o tienes sugerencias:

1. Revisa la sección de Solución de Problemas
2. Verifica la consola del navegador (F12)
3. Revisa los logs de Apache en XAMPP

---

## 🎉 ¡Disfruta del Análisis Predictivo!

**¿Qué starter de la Gen 10 elegirás?**

🌱 ¿El adorable Browt?  
🔥 ¿El popular Pombon?  
💧 ¿El inteligente Gecqua?

**¡Que el análisis te guíe!** 🎮✨
