# 🔥💧🌱 Pokémon Viento y Oleaje - Predictor de Starter Más Popular

<div align="center">

![Pokémon](https://img.shields.io/badge/Pok%C3%A9mon-Gen%2010-ffcc00?style=for-the-badge&logo=pokemon&logoColor=white)
![Status](https://img.shields.io/badge/Status-Activo-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Data](https://img.shields.io/badge/Datos-26%2C407%20Votos%20Reales-red?style=for-the-badge)

**Sistema de Análisis Predictivo basado en Machine Learning y Datos Reales**

[Demo en Vivo](#) • [Reportar Bug](../../issues) • [Solicitar Feature](../../issues)

</div>

---

## 📖 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso en Local](#-uso-en-local)
- [Funcionamiento del Sistema](#-funcionamiento-del-sistema)
- [Fuentes de Datos](#-fuentes-de-datos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Metodología](#-metodología)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 🎯 Sobre el Proyecto

**Pokémon Viento y Oleaje - Predictor de Starter** es un sistema de análisis predictivo que determina cuál de los tres starters de la Generación 10 será el más elegido por los jugadores. Utiliza una combinación de:

- 📊 **Datos reales de 26,407 votos** de la encuesta "Sparklez Squad 2025" en Reddit
- 🧮 **Algoritmo de Machine Learning** con 5 factores ponderados
- 🎲 **Simulación Monte Carlo** (10,000 iteraciones)
- 📈 **Análisis de tendencias** en redes sociales
- 🕐 **Patrones históricos** de las 9 generaciones anteriores

### 🏆 Resultado de la Predicción

> **Ganador Predicho: POMBON** (Tipo Fuego)  
> Confianza del modelo: **71.8%**

---

## ✨ Características Principales

### 📚 Storytelling Interactivo
- ✅ Navegación por capítulos (6 secciones)
- ✅ Animaciones visuales (olas, viento, efectos de respiración)
- ✅ Diseño responsivo para móviles y tablets

### 📊 Visualizaciones de Datos
- ✅ Gráficas interactivas con Chart.js
- ✅ Timeline histórica de ganadores por generación
- ✅ Tablas comparativas con código de colores
- ✅ Análisis de tendencias en tiempo real

### 🔬 Análisis Científico
- ✅ Matriz de factores ponderados (5 variables)
- ✅ Simulación Monte Carlo con 10,000 iteraciones
- ✅ Análisis de impacto viral en redes sociales
- ✅ Estudio de popularidad de animales inspiradores

### 📄 Exportación de Resultados
- ✅ Descarga de informe completo en PDF
- ✅ 9 páginas con gráficas capturadas
- ✅ Análisis detallado de cada factor
- ✅ Sin emojis problemáticos (compatibilidad total)

### 🎨 Diseño Visual
- ✅ Tema inspirado en aguas tropicales de Indonesia
- ✅ Paleta de colores: Cyan (#4ECDC4), Azul (#6890F0), Aqua (#95E1D3)
- ✅ Modo oscuro/claro
- ✅ Efectos de olas, viento y gradientes animados

---

## 🛠️ Tecnologías Utilizadas

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Backend
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)

### Herramientas y Librerías
- **Chart.js 4.x** - Visualización de gráficas interactivas
- **jsPDF 2.5.1** - Generación de reportes PDF
- **html2canvas 1.4.1** - Captura de elementos HTML para PDF
- **PokéAPI** - Obtención de datos de Pokémon (opcional)
- **XAMPP** - Servidor local Apache + PHP

### Datos y Análisis
- **Reddit Survey Data** - 26,407 votos reales de "Sparklez Squad 2025"
- **Google Trends** - Tendencias de búsqueda
- **Redes Sociales** - Twitter, TikTok, Instagram, DeviantArt
- **Algoritmo Monte Carlo** - Simulación probabilística

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **XAMPP** (Apache + PHP 7.4+) o cualquier servidor web local
  - [Descargar XAMPP](https://www.apachefriends.org/es/index.html)
- **Navegador moderno** (Chrome, Firefox, Edge)
- **Git** (para clonar el repositorio)
  - [Descargar Git](https://git-scm.com/downloads)

---

## 🚀 Instalación

### 1️⃣ Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/TU_USUARIO/10GEN-PKM-STARTERS.git

# Navegar al directorio
cd 10GEN-PKM-STARTERS
```

### 2️⃣ Configurar el Servidor Local

#### Opción A: Usar XAMPP

1. **Copiar la carpeta del proyecto** a la raíz de XAMPP:
   ```
   C:\xampp\htdocs\10GEN-PKM-STARTERS
   ```

2. **Iniciar Apache** desde el panel de control de XAMPP

3. **Verificar que PHP esté habilitado**

#### Opción B: Usar otro servidor web

1. Configurar el documento raíz apuntando a la carpeta `Web/`
2. Asegurar que PHP esté habilitado
3. Habilitar archivos `.htaccess` (si usa Apache)

### 3️⃣ Verificar la Configuración

Abrir en el navegador:
```
http://localhost/10GEN-PKM-STARTERS/Web/html/index.html
```

Si todo está correcto, verás la página de inicio animada con el capítulo 1: Introducción.

---

## 💻 Uso en Local

### Navegación por la Aplicación

La aplicación está dividida en **6 capítulos** narrativos:

1. **📖 Introducción** - Contexto del proyecto y metodología
2. **🎭 Presentación** - Conoce a los 3 starters (Pombon, Gecqua, Browt)
3. **🐾 Inspiraciones** - Análisis de popularidad animal
4. **🕐 Historia** - Timeline de ganadores de Gen 1-9
5. **🔬 Análisis** - Tablas, gráficas y datos científicos
6. **🎯 Predicción** - Resultado final y simulación Monte Carlo

### Funcionalidades Disponibles

#### 📊 Ver Gráficas Interactivas
- Hover sobre las gráficas para ver valores detallados
- Gráficas se cargan dinámicamente al navegar a cada sección
- Colores diferenciados por tipo (Fuego/Agua/Planta)

#### 📄 Descargar PDF
1. Navegar a la sección "Análisis"
2. Scroll hasta el final
3. Click en **"Descargar Análisis Completo"**
4. Esperar 10-15 segundos (captura gráficas)
5. Se descarga `Pokemon_Viento_Oleaje_Analisis_Completo.pdf` (9 páginas)

#### 🌓 Cambiar Tema
- Click en el ícono de luna/sol en la esquina superior derecha
- Alterna entre modo claro y oscuro
- Preferencia guardada en `localStorage`

---

## ⚙️ Funcionamiento del Sistema

### 1. Recopilación de Datos

```javascript
// Web/js/api.js
const data = {
  historicalData: await getHistoricalStarters(),  // 9 generaciones
  trends: await getSearchTrends(),                // Google Trends
  polls: await getPublicPolls(),                  // Reddit Survey (26,407 votos)
  animalPopularity: await getAnimalPopularity(), // Perros, geckos, aves
  culturalRelevance: await getCulturalData()     // Conexión con Indonesia
}
```

### 2. Cálculo de Scores

```javascript
// Web/js/analysis.js
function calculateBaseScores(data) {
  for (const starter of starters) {
    scores[starter] = {
      historical: calculateHistoricalScore(starter),      // 30%
      trends: calculateTrendsScore(starter),              // 25%
      polls: calculatePollsScore(starter),                // 20%
      animal: calculateAnimalScore(starter),              // 15%
      cultural: calculateCulturalScore(starter)           // 10%
    };
    
    // Score final ponderado
    totalScore = (historical * 0.30) + (trends * 0.25) + 
                 (polls * 0.20) + (animal * 0.15) + (cultural * 0.10);
  }
}
```

### 3. Simulación Monte Carlo

```javascript
// 10,000 iteraciones con variabilidad
function runMonteCarloSimulation(baseScores, iterations = 10000) {
  for (let i = 0; i < iterations; i++) {
    // Añadir ruido aleatorio (±10%)
    const randomScores = addRandomNoise(baseScores);
    
    // Determinar ganador de esta iteración
    const winner = getWinner(randomScores);
    results[winner]++;
  }
  
  // Calcular probabilidades finales
  return {
    pombon: (results.pombon / iterations) * 100,  // 42.8%
    gecqua: (results.gecqua / iterations) * 100,  // 31.2%
    browt: (results.browt / iterations) * 100     // 26.0%
  };
}
```

### 4. Visualización

```javascript
// Web/js/script.js
function updatePredictionUI(results) {
  // Crear gráficas con Chart.js
  createPredictionChart(results);
  createFactorsRadarChart(results);
  createHistoricalEvolution(results);
  
  // Actualizar tablas y estadísticas
  displayDetailedAnalysis(results);
}
```

---

## 📊 Fuentes de Datos

### 🔴 Datos Primarios (REALES)

#### Reddit Survey 2025 - "Sparklez Squad"
- **Fuente:** [Reddit Post Original](https://www.reddit.com/r/pokemon/)
- **Total de Votos:** 26,407
- **Período:** Enero 2025
- **Ubicación:** `Web/data/reddit_survey_2025.json`

Ejemplo de estructura:
```json
{
  "surveyInfo": {
    "totalVotes": 26407,
    "source": "Reddit - Sparklez Squad 2025"
  },
  "startersByGeneration": {
    "gen1": {
      "bulbasaur": 207,
      "charmander": 54,
      "squirtle": 115
    },
    "gen9": {
      "sprigatito": 52,
      "fuecoco": 58,
      "quaxly": 18
    }
  },
  "typeWinStatistics": {
    "fire": "44.44%",
    "water": "33.33%",
    "grass": "22.22%"
  }
}
```

### 🟡 Datos Secundarios (Simulados)

Para datos no disponibles públicamente, el sistema usa valores basados en:
- Patrones históricos verificados
- Tendencias de Google Trends
- Análisis de redes sociales (Twitter, TikTok, Instagram)
- Estudios de popularidad animal (perros: 88/100, geckos: 72/100)

---

## 📁 Estructura del Proyecto

```
10GEN-PKM-STARTERS/
│
├── README.md                          # 📖 Este archivo
├── .gitattributes                     # Configuración de Git
│
└── Web/                               # 🌐 Aplicación web
    ├── .htaccess                      # Configuración Apache
    ├── INICIO_RAPIDO.md               # Guía rápida
    ├── DOCUMENTACION_TECNICA.md       # Documentación técnica
    ├── SOLUCION_PROBLEMAS.md          # Troubleshooting
    │
    ├── html/
    │   ├── index.html                 # ⭐ Página principal (1089 líneas)
    │   └── diagnostico.html           # Página de diagnóstico
    │
    ├── css/
    │   └── styles.css                 # 🎨 Estilos completos (2270+ líneas)
    │                                  #    - Animaciones de olas
    │                                  #    - Efectos de viento
    │                                  #    - Responsive design
    │                                  #    - Modo oscuro/claro
    │
    ├── js/
    │   ├── config.js                  # ⚙️ Configuración global
    │   ├── api.js                     # 📡 Gestión de datos (512 líneas)
    │   ├── analysis.js                # 🧮 Algoritmo predictivo
    │   └── script.js                  # 🎯 Lógica principal (1724 líneas)
    │
    ├── php/
    │   ├── apiFetcher.php             # 🔌 Fetcher de PokéAPI
    │   └── predict.php                # 🔮 Endpoint de predicción
    │
    ├── data/
    │   ├── reddit_survey_2025.json    # 📊 Datos reales (26,407 votos)
    │   ├── historical.json            # 🕐 Datos Gen 1-9
    │   └── cache/                     # 💾 Caché de API
    │
    └── images/
        └── starters/                  # 🖼️ Imágenes de los starters
            ├── pombon.png
            ├── gecqua.png
            └── browt.png
```

---

## 🔬 Metodología

### Los 5 Pilares de la Predicción

| Factor | Peso | Descripción | Ganador |
|--------|------|-------------|---------|
| 📚 **Histórico** | 30% | Rendimiento de tipos en Gen 1-9 | 🔥 Fuego (44.44%) |
| 📈 **Búsquedas** | 25% | Volumen en Google Trends y redes | 🔥 Pombon (28K) |
| 🗳️ **Encuestas** | 20% | Datos reales de Reddit (26,407 votos) | 🔥 Pombon (42%) |
| 🐾 **Animal** | 15% | Popularidad del animal base | 🔥 Pombon (Perro: 88/100) |
| 🌏 **Cultural** | 10% | Relevancia regional (Indonesia) | 🌱 Gecqua (Gecko: 90/100) |

### Fórmula de Cálculo

```
Score_Final = (H × 0.30) + (B × 0.25) + (E × 0.20) + (A × 0.15) + (C × 0.10)

Donde:
  H = Score Histórico
  B = Score de Búsquedas
  E = Score de Encuestas
  A = Score Animal
  C = Score Cultural
```

### Resultados Finales

| Starter | Tipo | Score Final | Probabilidad Monte Carlo |
|---------|------|-------------|-------------------------|
| 🔥 **Pombon** | Fuego | **71.8/100** | **42.8%** ✅ |
| 🌱 Gecqua | Planta | 59.4/100 | 31.2% |
| 💧 Browt | Agua | 48.2/100 | 26.0% |

---

## 📸 Capturas de Pantalla

### Capítulo 1: Introducción
- Hero banner con badge "POKÉMON PRESENTA"
- 4 KPIs horizontales
- Metodología de 5 pasos con flechas
- Efectos de olas y viento animados

### Capítulo 4: Historia
- Timeline interactivo de Gen 1-9
- Gráfica de evolución de popularidad por tipo
- 3 tarjetas con estadísticas por tipo

### Capítulo 5: Análisis
- Matriz de factores ponderados (tabla con colores)
- 3 gráficas de análisis (Radar, Tendencias, Histórico)
- Tabla de impacto en redes sociales
- Análisis de memes virales

### Exportación PDF
- 9 páginas profesionales
- Gráficas capturadas en alta calidad
- Tablas, análisis y conclusiones

---

## 🤝 Contribuir

Las contribuciones son bienvenidas y apreciadas. Aquí te mostramos como puedes ayudar:

### Reportar Bugs
1. Ir a [Issues](../../issues)
2. Click en "New Issue"
3. Describir el problema con detalles
4. Incluir capturas de pantalla si es posible

### Proponer Features
1. Abrir un [Issue](../../issues) con la etiqueta "enhancement"
2. Describir la funcionalidad deseada
3. Explicar el caso de uso

### Pull Requests
1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit los cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir un Pull Request

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2026 [MacWilliXD]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Autor

**[MacWilliXD]**

- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/tu-perfil)
- Email: tu.email@ejemplo.com

---

## 🙏 Agradecimientos

- **The Pokémon Company** - Por la inspiración
- **Reddit "Sparklez Squad 2025"** - Por los datos reales de la encuesta
- **PokéAPI** - Por la API de Pokémon
- **Chart.js** - Por las increíbles visualizaciones
- **Comunidad Pokémon** - Por el feedback y las discusiones

---

## 📝 Notas Adicionales

### Disclaimer
Este proyecto es **no oficial** y fue creado con fines educativos y de entretenimiento. Pokémon y todos los personajes relacionados son propiedad de The Pokémon Company, Nintendo, Game Freak y Creatures Inc.

### Actualización de Datos
Los datos de Reddit Survey están actualizados a Enero 2025. Para obtener datos más recientes:
1. Actualizar `Web/data/reddit_survey_2025.json`
2. Modificar los valores en `Web/js/api.js` (función `getSimulatedHistoricalData()`)

### Personalización
Puedes modificar los colores, animaciones y textos editando:
- **Colores:** `Web/css/styles.css` (variables CSS en `:root`)
- **Textos:** `Web/html/index.html`
- **Lógica:** `Web/js/script.js` y `Web/js/analysis.js`

---

<div align="center">

### ⭐ Si te gustó este proyecto, dale una estrella ⭐

**Made with ❤️ and 🔥💧🌱 by [MacWilliXD]**

[⬆ Volver arriba](#-pokémon-viento-y-oleaje---predictor-de-starter-más-popular)

</div>
