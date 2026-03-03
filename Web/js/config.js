/**
 * CONFIG.JS - Archivo de Configuración
 * Centraliza todas las configuraciones del proyecto
 */

const CONFIG = {
    // URLs y Rutas
    api: {
        baseURL: window.location.origin + '/ProyectosPersonales/10GEN-PKM-STARTERS/Web',
        phpEndpoint: '/php',
        pokeAPI: 'https://pokeapi.co/api/v2',
        wikipedia: 'https://en.wikipedia.org/api/rest_v1'
    },

    // Configuración de Caché
    cache: {
        enabled: true,
        duration: 3600, // 1 hora en segundos
        prefix: 'pokemon_gen10_'
    },

    // Configuración de Análisis Predictivo
    prediction: {
        // Pesos por defecto (deben sumar 100)
        defaultWeights: {
            historical: 30,
            trends: 25,
            polls: 20,
            animal: 15,
            culture: 10
        },
        
        // Configuración Monte Carlo
        monteCarlo: {
            iterations: 10000,
            seed: null // null = aleatorio
        },
        
        // Configuración de regresión
        regression: {
            enabled: true,
            recentGenerationsWeight: 1.5 // Mayor peso a generaciones recientes
        }
    },

    // Configuración de Gráficas
    charts: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        },
        colors: {
            grass: '#78C850',
            fire: '#F08030',
            water: '#6890F0'
        }
    },

    // Configuración de UI
    ui: {
        darkMode: {
            enabled: true,
            savePreference: true,
            storageKey: 'darkMode'
        },
        
        animations: {
            enabled: true,
            duration: 300 // milisegundos
        },
        
        loader: {
            minDuration: 500, // Mínimo tiempo de loader visible
            fadeOutDuration: 500
        },
        
        notifications: {
            enabled: true,
            duration: 3000 // milisegundos
        }
    },

    // Configuración de Datos
    data: {
        // Generaciones a analizar
        generations: {
            start: 1,
            end: 9
        },
        
        // Starters de Gen 10
        gen10Starters: {
            browt: {
                name: 'Browt',
                type: 'grass',
                category: 'Pokémon Pollito Haba',
                height: 0.3,
                weight: 3.5,
                ability: 'Espesura',
                description: 'Corretea lleno de energía mientras hace fotosíntesis con hojas que brotan del pico. Alegre pero torpe.'
            },
            pombon: {
                name: 'Pombon',
                type: 'fire',
                category: 'Pokémon Perrito',
                height: 0.4,
                weight: 6.7,
                ability: 'Mar Llamas',
                description: 'Su pecho brilla por el calor que producen sus pulmones. Simpático e inocente.'
            },
            gecqua: {
                name: 'Gecqua',
                type: 'water',
                category: 'Pokémon Acuageco',
                height: 0.3,
                weight: 4.3,
                ability: 'Torrente',
                description: 'Usa su cola para lanzar esferas de agua. Inteligente y pretencioso.'
            }
        },
        
        // Región
        region: {
            name: 'Indonesia',
            games: ['Viento', 'Oleaje'],
            year: 2026,
            theme: 'Tropical Islands'
        }
    },

    // Configuración de Storage
    storage: {
        historyKey: 'pokemonSimulationHistory',
        maxHistoryItems: 10,
        settingsKey: 'pokemonSettings'
    },

    // Configuración de Debug
    debug: {
        enabled: true, // Cambiar a false en producción
        verbose: true,
        logAPI: true,
        logAnalysis: true
    },

    // Textos y Traducciones
    text: {
        es: {
            loading: 'Cargando datos...',
            analyzing: 'Analizando...',
            error: 'Error al cargar',
            success: 'Completado',
            noData: 'No hay datos disponibles'
        },
        en: {
            loading: 'Loading data...',
            analyzing: 'Analyzing...',
            error: 'Error loading',
            success: 'Completed',
            noData: 'No data available'
        }
    },

    // Configuración de Features (activar/desactivar funcionalidades)
    features: {
        darkMode: true,
        exportJSON: true,
        saveHistory: true,
        comparison: true,
        adjustWeights: true,
        monteCarlo: true,
        regression: true,
        realTimeUpdate: false, // Actualización en tiempo real (futuro)
        socialShare: false // Compartir en redes (futuro)
    }
};

// Método para obtener configuración
CONFIG.get = function(path) {
    const keys = path.split('.');
    let value = this;
    
    for (const key of keys) {
        value = value[key];
        if (value === undefined) return null;
    }
    
    return value;
};

// Método para establecer configuración
CONFIG.set = function(path, newValue) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let obj = this;
    
    for (const key of keys) {
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
    }
    
    obj[lastKey] = newValue;
};

// Método de validación
CONFIG.validate = function() {
    const weights = this.prediction.defaultWeights;
    const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
    
    if (total !== 100) {
        console.warn('⚠️ Los pesos por defecto no suman 100. Total:', total);
        return false;
    }
    
    return true;
};

// Inicializar configuración
if (CONFIG.debug.enabled) {
    console.log('⚙️ Configuración cargada:', CONFIG);
    CONFIG.validate();
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
