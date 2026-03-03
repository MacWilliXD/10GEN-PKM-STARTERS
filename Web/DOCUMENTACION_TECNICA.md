# 📐 DOCUMENTACIÓN TÉCNICA

## 🧠 Algoritmo Predictivo - Análisis Detallado

### Visión General

El sistema implementa un **modelo híbrido de predicción** que combina:
- Análisis histórico estadístico
- Sistema de puntuación ponderada
- Simulación Monte Carlo
- Regresión lineal simple

### Pipeline de Predicción

```
1. Recopilación de Datos
   ↓
2. Cálculo de Scores Individuales
   ↓
3. Aplicación de Pesos
   ↓
4. Conversión a Probabilidades
   ↓
5. Refinamiento Monte Carlo
   ↓
6. Generación de Explicación
```

---

## 📊 Factores de Análisis (Desglosados)

### 1. Popularidad Histórica (30%)

**Fuente de Datos:**
- 9 generaciones (1996-2022)
- 27 starters en total
- Datos de popularidad simulados pero realistas

**Cálculo:**
```javascript
historicalScore = (tipoVictorias / totalGeneraciones) × 100

// Bonus reciente (últimas 3 generaciones)
recentBonus = (victoriasRecientes / 3) × 20

scoreTotal = historicalScore × 2 + recentBonus
```

**Justificación:**
- Los patrones históricos son predictores fuertes
- Las generaciones recientes tienen más peso (meta actual)
- El tipo Fuego ha dominado (6/9 victorias)

### 2. Tendencias de Búsqueda (25%)

**Fuente de Datos:**
- Volumen de búsquedas (simulado)
- Tendencia (rising/stable/declining)
- Interés geográfico por región

**Cálculo:**
```javascript
baseScore = interestLevel (0-100)

if (trend === 'rising') {
    baseScore += 15
} else if (trend === 'stable') {
    baseScore += 5
}

trendsScore = min(100, baseScore)
```

**Justificación:**
- Las tendencias actuales reflejan interés real
- Tendencia creciente indica momentum
- Mayor peso a búsquedas de Indonesia

### 3. Encuestas Públicas (20%)

**Fuente de Datos:**
- Twitter/X: ~45,000 votos
- Reddit: ~32,000 votos
- YouTube: ~28,000 votos
- Serebii: ~25,000 votos
- Bulbapedia: ~18,000 votos

**Cálculo:**
```javascript
averagePoll = suma(todosLosPolls) / cantidadPolls

// Normalizar a escala 0-100
pollsScore = (averagePoll / 50) × 100
```

**Justificación:**
- Las encuestas públicas son indicadores directos
- Múltiples fuentes reducen sesgo
- Promedio ponderado más confiable que individual

### 4. Popularidad de Inspiración Animal (15%)

**Componentes:**
- Popularidad general del animal (40%)
- Relevancia cultural (30%)
- Conexión con Indonesia (30%)

**Cálculo:**
```javascript
animalScore = (
    popularidad × 0.4 +
    relevancia × 0.3 +
    conexionIndonesia × 0.3
)
```

**Datos:**
```
Browt (Pollito+Haba):
- Popularidad: 65/100 (aves son populares)
- Relevancia: 70/100 (agricultura)
- Indonesia: 85/100 (agricultura importante)

Pombon (Perrito):
- Popularidad: 88/100 (perros muy populares)
- Relevancia: 90/100 (mascota compañía)
- Indonesia: 75/100 (mascotas comunes)

Gecqua (Gecko):
- Popularidad: 72/100 (reptiles interesantes)
- Relevancia: 80/100 (exóticos)
- Indonesia: 90/100 (geckos nativos)
```

### 5. Relevancia Cultural Indonesia (10%)

**Componentes:**
- Cultural fit (50%)
- Simbolismo local (30%)
- Favorabilidad regional (20%)

**Cálculo:**
```javascript
cultureScore = (culturalFit + favorability) / 2
```

**Análisis Cultural:**
```
Browt:
- Fit: 78/100 (agricultura tradicional)
- Simbolismo: Crecimiento y prosperidad
- Favorability: 72/100

Pombon:
- Fit: 85/100 (lealtad valorada)
- Simbolismo: Compañerismo y familia
- Favorability: 82/100

Gecqua:
- Fit: 88/100 (geckos en folklore)
- Simbolismo: Buena suerte, sabiduría
- Favorability: 80/100
```

---

## 🎲 Simulación Monte Carlo

### Propósito
Refinar probabilidades base mediante simulación estocástica.

### Implementación
```javascript
function monteCarloSimulation(probabilities, iterations = 10000) {
    const results = { browt: 0, pombon: 0, gecqua: 0 }
    
    for (let i = 0; i < iterations; i++) {
        const random = Math.random() × 100
        
        if (random < probabilities.browt) {
            results.browt++
        } else if (random < probabilities.browt + probabilities.pombon) {
            results.pombon++
        } else {
            results.gecqua++
        }
    }
    
    return normalizar(results)
}
```

### Configuración
- **Iteraciones:** 10,000 (balance entre precisión y rendimiento)
- **Seed:** Aleatorio (puede configurarse para reproducibilidad)
- **Distribución:** Uniforme

### Justificación
- Reduce varianza de estimaciones puntuales
- Converge a distribución real
- 10k iteraciones suficientes para estabilidad

---

## 📈 Regresión Lineal

### Propósito
Identificar tendencias históricas por tipo.

### Implementación
```javascript
function linearRegression(data) {
    const n = data.length
    const sumX = Σ(i)
    const sumY = Σ(popularity)
    const sumXY = Σ(i × popularity)
    const sumX2 = Σ(i²)
    
    slope = (n × sumXY - sumX × sumY) / (n × sumX2 - sumX²)
    
    return slope > 0 ? 'increasing' : 'decreasing'
}
```

### Uso
- Detectar si un tipo está ganando o perdiendo popularidad
- Ajustar predicciones según tendencia
- Mayor peso a tipos con tendencia positiva

---

## 🔄 Sistema de Pesos Dinámicos

### Pesos por Defecto
```javascript
{
    historical: 30%,  // Mayor peso - patrones comprobados
    trends: 25%,      // Alto peso - interés actual
    polls: 20%,       // Medio-alto - opinión directa
    animal: 15%,      // Medio - factor subyacente
    culture: 10%      // Base - contexto regional
}
```

### Normalización Automática
```javascript
function normalizeWeights(weights) {
    const total = suma(weights)
    const factor = 100 / total
    
    return weights.map(w => w × factor)
}
```

### Validación
- ✅ Suma debe ser 100
- ✅ Ningún peso negativo
- ✅ Cada peso entre 0-100

---

## 📐 Arquitectura del Sistema

### Separación de Responsabilidades

```
┌─────────────────────────────────────┐
│         PRESENTACIÓN (UI)           │
│         script.js                   │
│  • Eventos                          │
│  • Renderizado                      │
│  • Gráficas                         │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│         LÓGICA DE NEGOCIO           │
│         analysis.js                 │
│  • Algoritmo predictivo             │
│  • Cálculos                         │
│  • Simulaciones                     │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│         DATOS Y APIs                │
│         api.js                      │
│  • Fetch de datos                   │
│  • Caché                            │
│  • Transformaciones                 │
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│         BACKEND PHP                 │
│    predict.php | apiFetcher.php    │
│  • Evitar CORS                      │
│  • Caché servidor                   │
│  • APIs externas                    │
└─────────────────────────────────────┘
```

### Patrón de Diseño
- **Singleton:** APIManager, PredictiveAnalysis
- **Factory:** Creación de gráficas
- **Observer:** Actualización de UI
- **Strategy:** Diferentes métodos de predicción

---

## 🗄️ Gestión de Datos

### LocalStorage
```javascript
// Estructura de datos guardados
{
    darkMode: boolean,
    pokemonSimulationHistory: [
        {
            id: timestamp,
            timestamp: string,
            probabilities: {...},
            weights: {...}
        }
    ],
    pokemonSettings: {...}
}
```

### Caché de Servidor (PHP)
```
data/cache/
├── {md5_hash}_pokeapi.json    (1 hora)
├── {md5_hash}_trends.json     (1 hora)
├── {md5_hash}_polls.json      (1 hora)
└── {md5_hash}_wikipedia.json  (1 hora)
```

### Caché de Cliente (JavaScript)
```javascript
cache = new Map([
    ['historical_starters', {...}],
    ['search_trends', {...}],
    ['public_polls', {...}]
])
```

**Duración:** Session-based (se limpia al recargar)

---

## 🎨 Sistema de Gráficas

### Chart.js Configuration

**Gráfica 1: Predicción (Doughnut)**
```javascript
{
    type: 'doughnut',
    data: {
        labels: ['Browt', 'Pombon', 'Gecqua'],
        datasets: [{
            data: [probabilities],
            backgroundColor: [colores por tipo]
        }]
    }
}
```

**Gráfica 2: Histórico (Bar)**
```javascript
{
    type: 'bar',
    data: {
        labels: ['Planta', 'Fuego', 'Agua'],
        datasets: [{
            data: [conteo victorias]
        }]
    }
}
```

**Gráfica 3: Factores (Radar)**
```javascript
{
    type: 'radar',
    data: {
        labels: ['Histórico', 'Tendencias', ...],
        datasets: [
            { data: [scores Browt] },
            { data: [scores Pombon] },
            { data: [scores Gecqua] }
        ]
    }
}
```

**Gráfica 4: Tendencias (Line)**
```javascript
{
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [
            { data: [histórico búsquedas] }
        ]
    }
}
```

---

## 🔒 Seguridad

### Client-Side
- ✅ Validación de inputs
- ✅ Sanitización de datos
- ✅ No eval() de strings
- ✅ Content Security Policy headers

### Server-Side (PHP)
- ✅ Validación de parámetros
- ✅ Escape de output
- ✅ Rate limiting (caché)
- ✅ CORS configurado
- ✅ No ejecución directa de user input

### Datos
- ✅ LocalStorage solo para preferencias
- ✅ No datos sensibles guardados
- ✅ Caché con expiración
- ✅ No cookies utilizadas

---

## ⚡ Optimización de Rendimiento

### Frontend
- **Lazy Loading:** Gráficas solo cuando son visibles
- **Debouncing:** Sliders de pesos (300ms)
- **Memoization:** Resultados de cálculos pesados
- **Minification:** CSS/JS en producción

### Backend
- **Caché:** 1 hora para todas las APIs
- **GZIP:** Compresión de respuestas
- **CDN:** Chart.js desde CDN
- **Expires Headers:** Archivos estáticos

### Métricas Objetivo
- **First Paint:** < 1s
- **Interactive:** < 2s
- **Análisis completo:** < 3s
- **Recálculo:** < 500ms

---

## 🧪 Testing Considerations

### Casos de Prueba

**Predicción:**
```
✅ Pesos por defecto suman 100
✅ Probabilidades suman 100 (±0.01)
✅ Ningún valor negativo
✅ Monte Carlo converge (10k iteraciones)
✅ Resultados reproducibles con seed fijo
```

**UI:**
```
✅ Loader desaparece después de carga
✅ Gráficas renderizan correctamente
✅ Modo oscuro persiste
✅ Historial se guarda en localStorage
✅ Export JSON descarga archivo
```

**APIs:**
```
✅ Fallback a datos simulados si API falla
✅ Caché funciona correctamente
✅ CORS headers presentes
✅ Timeout después de 10s
```

---

## 📊 Datos Simulados vs Reales

### Simulados (Actual)
- ✅ Tendencias de búsqueda
- ✅ Encuestas públicas
- ✅ Popularidad animal
- ✅ Datos culturales

### Reales (Implementable)
- 🔌 PokéAPI (starters históricos)
- 🔌 Wikipedia API (datos regionales)
- 🔌 Reddit API (con autenticación)
- 🔌 YouTube API (con API key)

---

## 🚀 Escalabilidad Futura

### Mejoras Técnicas
- [ ] WebWorkers para cálculos pesados
- [ ] Service Worker para offline-first
- [ ] IndexedDB para datos grandes
- [ ] WebSockets para tiempo real
- [ ] GraphQL para APIs

### Mejoras de Features
- [ ] Machine Learning real (TensorFlow.js)
- [ ] Análisis de sentimiento (NLP)
- [ ] Datos en tiempo real
- [ ] Sistema de votación público
- [ ] Comparación con otras predicciones

---

## 📈 Métricas de Éxito

### Precisión del Algoritmo
- **Target:** 70%+ precisión
- **Metodología:** Comparar con resultado real Gen 10
- **Benchmark:** Random = 33%, Historical = ~40%

### Performance
- **Carga inicial:** < 3s
- **Recálculo:** < 500ms
- **Tamaño total:** < 2MB

### User Experience
- **Bounce rate:** < 30%
- **Time on page:** > 3min
- **Feature usage:** 60%+ usuarios ajustan pesos

---

**Documentación actualizada: Marzo 2026**
**Versión del proyecto: 1.0.0**
