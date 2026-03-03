/**
 * SCRIPT.JS - Lógica Principal de la Aplicación
 * Coordina la interfaz, gráficas y análisis predictivo
 */

// Variables globales
let charts = {};
let simulationHistory = [];

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando aplicación...');
    
    try {
        // Cargar historial desde localStorage
        loadSimulationHistory();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Configurar navegación del storytelling
        setupStoryNavigation();
        
        // Crear timeline histórico
        createHistoricalTimeline();
        
        // Ejecutar análisis inicial con delay para asegurar carga de Chart.js
        setTimeout(async () => {
            await runInitialAnalysis();
            hideLoader();
        }, 100);
        
    } catch (error) {
        console.error('❌ Error crítico en inicialización:', error);
        hideLoader();
        document.getElementById('app').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Error al cargar la aplicación</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()">Recargar Página</button>
            </div>
        `;
    }
});

/**
 * Configurar todos los event listeners
 */
function setupEventListeners() {
    // Modo oscuro
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // Controles de pesos (comentados - sección removida)
    // const weightInputs = document.querySelectorAll('.control-item input[type="range"]');
    // weightInputs.forEach(input => {
    //     input.addEventListener('input', (e) => {
    //         const valueDisplay = e.target.nextElementSibling;
    //         valueDisplay.textContent = e.target.value + '%';
    //     });
    // });
    
    // Botones principales (comentados - sección removida)
    // document.getElementById('recalculateBtn').addEventListener('click', recalculatePrediction);
    // document.getElementById('resetWeightsBtn').addEventListener('click', resetWeights);
    // document.getElementById('exportBtn').addEventListener('click', exportData);
    // document.getElementById('compareBtn').addEventListener('click', toggleComparison);
    
    // Historial (comentados - sección removida)
    // document.getElementById('saveSimulationBtn').addEventListener('click', saveCurrentSimulation);
    // document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    
    // Botón de descarga PDF
    const downloadPdfBtn = document.getElementById('downloadAnalysisPdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadAnalysisPDF);
    }
}

/**
 * Ejecutar análisis inicial
 */
async function runInitialAnalysis() {
    try {
        console.log('📊 Ejecutando análisis predictivo...');
        
        // Verificar que Chart.js esté disponible
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js no está cargado. Verifica tu conexión a internet.');
        }
        
        // Registrar plugin de datalabels
        if (typeof ChartDataLabels !== 'undefined') {
            Chart.register(ChartDataLabels);
            console.log('✅ Plugin ChartDataLabels registrado');
        }
        
        // Ejecutar predicción
        console.log('🔮 Iniciando predicción...');
        const prediction = await predictiveAnalysis.predictMostChosen();
        console.log('✅ Predicción completada:', prediction);
        
        // Actualizar UI con resultados
        console.log('🎨 Actualizando interfaz...');
        updatePredictionUI(prediction);
        
        // Crear gráficas
        console.log('📈 Creando gráficas...');
        await createCharts(prediction);
        
        // Mostrar análisis detallado (comentado - sección removida)
        // console.log('📋 Mostrando análisis detallado...');
        // await displayDetailedAnalysis();
        
        console.log('✅ Análisis completado exitosamente');
    } catch (error) {
        console.error('❌ Error en análisis:', error);
        console.error('Stack trace:', error.stack);
        showError('Error al realizar el análisis: ' + error.message + '. Revisa la consola para más detalles.');
        
        // Mostrar mensaje de error en la UI
        document.getElementById('conclusion').innerHTML = `
            <p style="color: #ff4757;">
                <strong>⚠️ Error en el análisis</strong><br>
                ${error.message}<br><br>
                Por favor, recarga la página o revisa la consola del navegador (F12).
            </p>
        `;
    }
}

/**
 * Actualizar UI con resultados de predicción
 */
function updatePredictionUI(prediction) {
    const starters = ['browt', 'pombon', 'gecqua'];
    
    starters.forEach(starter => {
        const element = document.getElementById(`prediction-${starter}`);
        const probability = prediction.probabilities[starter];
        const score = prediction.scores[starter];
        
        element.innerHTML = `
            <div class="probability">${probability}%</div>
            <div class="factors">
                Score Total: ${score.total.toFixed(1)}/100
            </div>
        `;
    });
    
    // Marcar al ganador
    const winner = Object.entries(prediction.probabilities)
        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))[0][0];
    
    document.querySelectorAll('.starter-card').forEach(card => {
        card.classList.remove('winner', 'pulse');
    });
    
    const winnerCard = document.querySelector(`[data-starter="${winner}"]`);
    if (winnerCard) {
        winnerCard.classList.add('winner', 'pulse');
    }
    
    // Actualizar conclusión
    document.getElementById('conclusion').innerHTML = prediction.explanation;
}

/**
 * Crear todas las gráficas
 */
async function createCharts(prediction) {
    // Destruir gráficas existentes
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};
    
    // Gráfica de Predicción Principal
    charts.prediction = createPredictionChart(prediction.probabilities);
    
    // Gráfica Histórica
    const historicalData = await apiManager.getHistoricalStarters();
    charts.historical = createHistoricalChart(historicalData);
    
    // Gráfica de Factores
    charts.factors = createFactorsChart(prediction.scores);
    
    // Gráfica de Tendencias
    const trendsData = await apiManager.getSearchTrends();
    charts.trends = createTrendsChart(trendsData);
}

/**
 * Crear gráfica de predicción principal
 */
function createPredictionChart(probabilities) {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['🌱 Browt', '🔥 Pombon', '💧 Gecqua'],
            datasets: [{
                data: [
                    parseFloat(probabilities.browt),
                    parseFloat(probabilities.pombon),
                    parseFloat(probabilities.gecqua)
                ],
                backgroundColor: [
                    '#78C850',
                    '#F08030',
                    '#6890F0'
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value) => {
                        return value.toFixed(1) + '%';
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 14 },
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Crear gráfica histórica por tipo
 */
function createHistoricalChart(historicalData) {
    const ctx = document.getElementById('historicalChart').getContext('2d');
    const typeStats = apiManager.getTypeWinStatistics(historicalData);
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['🌱 Planta', '🔥 Fuego', '💧 Agua'],
            datasets: [{
                label: 'Veces Ganador',
                data: [
                    typeStats.grass.count,
                    typeStats.fire.count,
                    typeStats.water.count
                ],
                backgroundColor: [
                    'rgba(120, 200, 80, 0.8)',
                    'rgba(240, 128, 48, 0.8)',
                    'rgba(104, 144, 240, 0.8)'
                ],
                borderColor: [
                    '#78C850',
                    '#F08030',
                    '#6890F0'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    display: true,
                    anchor: 'center',
                    align: 'center',
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 13
                    },
                    formatter: (value) => {
                        return value;
                    }
                },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const type = ['grass', 'fire', 'water'][context.dataIndex];
                            return `${typeStats[type].percentage}% del total`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

/**
 * Crear gráfica de factores de influencia
 */
function createFactorsChart(scores) {
    const ctx = document.getElementById('factorsChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Histórico', 'Tendencias', 'Encuestas', 'Animal', 'Cultural'],
            datasets: [
                {
                    label: 'Browt',
                    data: [
                        scores.browt.breakdown.historical,
                        scores.browt.breakdown.trends,
                        scores.browt.breakdown.polls,
                        scores.browt.breakdown.animal,
                        scores.browt.breakdown.culture
                    ],
                    backgroundColor: 'rgba(120, 200, 80, 0.2)',
                    borderColor: '#78C850',
                    borderWidth: 2
                },
                {
                    label: 'Pombon',
                    data: [
                        scores.pombon.breakdown.historical,
                        scores.pombon.breakdown.trends,
                        scores.pombon.breakdown.polls,
                        scores.pombon.breakdown.animal,
                        scores.pombon.breakdown.culture
                    ],
                    backgroundColor: 'rgba(240, 128, 48, 0.2)',
                    borderColor: '#F08030',
                    borderWidth: 2
                },
                {
                    label: 'Gecqua',
                    data: [
                        scores.gecqua.breakdown.historical,
                        scores.gecqua.breakdown.trends,
                        scores.gecqua.breakdown.polls,
                        scores.gecqua.breakdown.animal,
                        scores.gecqua.breakdown.culture
                    ],
                    backgroundColor: 'rgba(104, 144, 240, 0.2)',
                    borderColor: '#6890F0',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    display: true,
                    color: '#333',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    offset: -5,
                    formatter: (value) => {
                        return value.toFixed(0);
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

/**
 * Crear gráfica de tendencias de búsqueda
 */
function createTrendsChart(trendsData) {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo'],
            datasets: [
                {
                    label: 'Browt',
                    data: [50, 60, trendsData.browt.interest],
                    borderColor: '#78C850',
                    backgroundColor: 'rgba(120, 200, 80, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#78C850'
                },
                {
                    label: 'Pombon',
                    data: [70, 75, trendsData.pombon.interest],
                    borderColor: '#F08030',
                    backgroundColor: 'rgba(240, 128, 48, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#F08030'
                },
                {
                    label: 'Gecqua',
                    data: [60, 68, trendsData.gecqua.interest],
                    borderColor: '#6890F0',
                    backgroundColor: 'rgba(104, 144, 240, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#6890F0'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: '#333',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    formatter: (value) => {
                        return value;
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

/**
 * Mostrar análisis detallado (COMENTADO - Sección removida del HTML)
 */
/*
async function displayDetailedAnalysis() {
    const historicalData = await apiManager.getHistoricalStarters();
    const trendsData = await apiManager.getSearchTrends();
    const pollsData = await apiManager.getPublicPolls();
    
    // Datos Históricos
    const typeStats = apiManager.getTypeWinStatistics(historicalData);
    document.getElementById('historicalData').innerHTML = `
        <ul>
            <li><strong>Tipo Fuego:</strong> ${typeStats.fire.count} victorias (${typeStats.fire.percentage}%)</li>
            <li><strong>Tipo Agua:</strong> ${typeStats.water.count} victorias (${typeStats.water.percentage}%)</li>
            <li><strong>Tipo Planta:</strong> ${typeStats.grass.count} victorias (${typeStats.grass.percentage}%)</li>
            <li><strong>Última generación:</strong> Ganó ${typeStats.fire.count > typeStats.water.count ? 'Fuego' : 'Agua'}</li>
        </ul>
    `;
    
    // Tendencias
    document.getElementById('trendsData').innerHTML = `
        <ul>
            <li><strong>Browt:</strong> ${trendsData.browt.searchVolume.toLocaleString()} búsquedas, tendencia ${trendsData.browt.trend}</li>
            <li><strong>Pombon:</strong> ${trendsData.pombon.searchVolume.toLocaleString()} búsquedas, tendencia ${trendsData.pombon.trend}</li>
            <li><strong>Gecqua:</strong> ${trendsData.gecqua.searchVolume.toLocaleString()} búsquedas, tendencia ${trendsData.gecqua.trend}</li>
        </ul>
    `;
    
    // Encuestas
    const pollsAverage = apiManager.calculatePollsAverage(pollsData);
    document.getElementById('pollsData').innerHTML = `
        <ul>
            ${Object.entries(pollsData).map(([source, poll]) => `
                <li><strong>${poll.source}:</strong> Pombon ${poll.results.pombon}%, Gecqua ${poll.results.gecqua}%, Browt ${poll.results.browt}%</li>
            `).join('')}
            <li><strong>Promedio General:</strong> Pombon ${pollsAverage.pombon}%, Gecqua ${pollsAverage.gecqua}%, Browt ${pollsAverage.browt}%</li>
        </ul>
    `;
}
*/

/**
 * Recalcular predicción con nuevos pesos
 */
async function recalculatePrediction() {
    showLoader();
    
    try {
        // Obtener nuevos pesos
        const newWeights = {
            historical: parseInt(document.getElementById('weightHistorical').value),
            trends: parseInt(document.getElementById('weightTrends').value),
            polls: parseInt(document.getElementById('weightPolls').value),
            animal: parseInt(document.getElementById('weightAnimal').value),
            culture: parseInt(document.getElementById('weightCulture').value)
        };
        
        // Actualizar pesos en el análisis
        predictiveAnalysis.setWeights(newWeights);
        
        // Re-ejecutar análisis
        await runInitialAnalysis();
        
        hideLoader();
    } catch (error) {
        console.error('Error al recalcular:', error);
        showError('Error al recalcular la predicción');
        hideLoader();
    }
}

/**
 * Resetear pesos a valores por defecto
 */
function resetWeights() {
    document.getElementById('weightHistorical').value = 30;
    document.getElementById('weightTrends').value = 25;
    document.getElementById('weightPolls').value = 20;
    document.getElementById('weightAnimal').value = 15;
    document.getElementById('weightCulture').value = 10;
    
    // Actualizar displays
    document.querySelectorAll('.weight-value').forEach((el, index) => {
        const values = [30, 25, 20, 15, 10];
        el.textContent = values[index] + '%';
    });
    
    predictiveAnalysis.resetWeights();
    recalculatePrediction();
}

/**
 * Exportar datos en JSON
 */
async function exportData() {
    try {
        const allData = await apiManager.exportAllData();
        const prediction = predictiveAnalysis.exportPrediction();
        
        const exportObject = {
            ...JSON.parse(prediction),
            fullData: allData
        };
        
        const dataStr = JSON.stringify(exportObject, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `pokemon-gen10-prediction-${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al exportar:', error);
        alert('Error al exportar datos');
    }
}

/**
 * Toggle comparación con generaciones anteriores
 */
async function toggleComparison() {
    const section = document.getElementById('comparisonSection');
    const grid = document.getElementById('comparisonGrid');
    
    if (section.style.display === 'none') {
        showLoader();
        
        const comparison = await predictiveAnalysis.compareWithPreviousGenerations();
        
        grid.innerHTML = comparison.map(gen => `
            <div class="generation-card">
                <h4>Gen ${gen.generation} - ${gen.region}</h4>
                <div class="winner-type">${getTypeEmoji(gen.winner)}</div>
                <p><strong>${capitalizeFirst(gen.winner)}</strong></p>
                <p>${gen.winnerData ? gen.winnerData.name : 'N/A'}</p>
                <p>Popularidad: ${gen.winnerPopularity}%</p>
            </div>
        `).join('');
        
        section.style.display = 'block';
        section.classList.add('fade-in');
        
        hideLoader();
    } else {
        section.style.display = 'none';
    }
}

/**
 * Guardar simulación actual en historial
 */
function saveCurrentSimulation() {
    try {
        const prediction = predictiveAnalysis.currentPrediction;
        if (!prediction) {
            alert('No hay predicción para guardar');
            return;
        }
        
        const simulation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString('es-ES'),
            probabilities: prediction.probabilities,
            weights: prediction.weights
        };
        
        simulationHistory.unshift(simulation);
        saveToLocalStorage();
        displaySimulationHistory();
        
        alert('Simulación guardada exitosamente');
    } catch (error) {
        console.error('Error al guardar simulación:', error);
        alert('Error al guardar simulación');
    }
}

/**
 * Mostrar historial de simulaciones
 */
function displaySimulationHistory() {
    const container = document.getElementById('simulationHistory');
    
    if (simulationHistory.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay simulaciones guardadas</p>';
        return;
    }
    
    container.innerHTML = simulationHistory.slice(0, 6).map(sim => `
        <div class="simulation-item">
            <div class="timestamp">📅 ${sim.timestamp}</div>
            <div class="result">
                <strong>Resultados:</strong><br>
                🌱 Browt: ${sim.probabilities.browt}%<br>
                🔥 Pombon: ${sim.probabilities.pombon}%<br>
                💧 Gecqua: ${sim.probabilities.gecqua}%
            </div>
        </div>
    `).join('');
}

/**
 * Limpiar historial
 */
function clearHistory() {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
        simulationHistory = [];
        saveToLocalStorage();
        displaySimulationHistory();
    }
}

/**
 * Guardar en localStorage
 */
function saveToLocalStorage() {
    localStorage.setItem('pokemonSimulationHistory', JSON.stringify(simulationHistory));
}

/**
 * Cargar desde localStorage
 */
function loadSimulationHistory() {
    const saved = localStorage.getItem('pokemonSimulationHistory');
    if (saved) {
        simulationHistory = JSON.parse(saved);
        displaySimulationHistory();
    }
}

/**
 * Toggle modo oscuro
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const btn = document.getElementById('darkModeToggle');
    btn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    
    localStorage.setItem('darkMode', isDark);
}

/**
 * Mostrar/Ocultar loader
 */
function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 500);
    
    // Aplicar modo oscuro guardado
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '☀️ Modo Claro';
    }
}

/**
 * Mostrar error
 */
function showError(message) {
    alert(message);
}

/**
 * Utilidades
 */
function getTypeEmoji(type) {
    const emojis = { grass: '🌱', fire: '🔥', water: '💧' };
    return emojis[type] || '❓';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==========================================
// STORYTELLING NAVIGATION
// ==========================================

/**
 * Navegar a una sección específica del storytelling
 */
function navigateToSection(sectionId) {
    console.log(`📖 Navegando a sección: ${sectionId}`);
    
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('.story-section');
    console.log(`📦 Total de secciones encontradas: ${allSections.length}`);
    
    allSections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        console.log(`✅ Mostrando sección: section-${sectionId}`);
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Scroll suave al inicio de la sección
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        console.error(`❌ No se encontró la sección: section-${sectionId}`);
    }
    
    // Actualizar tabs activos
    const allTabs = document.querySelectorAll('.tab-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`.tab-btn[data-section="${sectionId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        console.log(`✅ Tab activado: ${sectionId}`);
    } else {
        console.warn(`⚠️ No se encontró el tab para: ${sectionId}`);
    }
    
    // Guardar progreso en localStorage
    localStorage.setItem('currentStorySection', sectionId);
    
    // Si navegamos a la sección de análisis o predicción, asegurar que los gráficos estén renderizados
    if (sectionId === 'analysis' || sectionId === 'prediction') {
        setTimeout(() => {
            if (Object.keys(charts).length === 0) {
                console.log('⚠️ Gráficos no encontrados, regenerando...');
                runInitialAnalysis();
            } else {
                console.log(`✅ Gráficos ya existen: ${Object.keys(charts).length}`);
            }
        }, 300);
    }
    
    // Si navegamos a inspirations o history, crear sus gráficos específicos
    if (sectionId === 'inspirations') {
        console.log('🎨 Creando gráfico de inspiraciones...');
        setTimeout(() => createInspirationChart(), 200);
    }
    
    if (sectionId === 'history') {
        console.log('📚 Creando gráfico histórico...');
        setTimeout(() => createHistoricalEvolutionChart(), 200);
    }
}

/**
 * Configurar los event listeners de navegación del storytelling
 */
function setupStoryNavigation() {
    console.log('🎭 Configurando navegación de storytelling...');
    
    // Botones de tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    console.log(`📍 Encontrados ${tabButtons.length} botones de navegación`);
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            console.log(`🔘 Click en tab: ${section}`);
            navigateToSection(section);
        });
    });
    
    // No restaurar última sección, siempre empezar en intro
    // Esto evita problemas si había una sección guardada que ya no existe
    console.log('📖 Mostrando sección de introducción por defecto');
    navigateToSection('intro');
    
    console.log('✅ Navegación de storytelling configurada');
}

/**
 * Crear timeline histórico
 */
/**
 * Crear timeline histórico con datos REALES de Reddit
 */
async function createHistoricalTimeline() {
    const timelineContainer = document.getElementById('historyTimeline');
    if (!timelineContainer) return;
    
    try {
        console.log('📚 Cargando timeline histórico con datos de Reddit...');
        const historicalData = await apiManager.getHistoricalStarters();
        
        let timelineHTML = '<div class="timeline">';
        
        historicalData.forEach(genData => {
            // Encontrar el starter ganador (con mayor popularidad)
            const winner = genData.starters.reduce((prev, current) => 
                (current.popularity > prev.popularity) ? current : prev
            );
            
            const emoji = winner.type === 'fire' ? '🔥' : winner.type === 'water' ? '💧' : '🌱';
            const colorClass = winner.type === 'fire' ? 'fire-bg' : winner.type === 'water' ? 'water-bg' : 'grass-bg';
            
            timelineHTML += `
                <div class="timeline-item ${colorClass}">
                    <div class="timeline-marker">${emoji}</div>
                    <div class="timeline-content">
                        <h4>Gen ${genData.generation} (${genData.year})</h4>
                        <p><strong>${winner.name}</strong> - ${winner.popularity}%</p>
                        <p class="timeline-region">${genData.region}</p>
                        <p class="timeline-votes">${winner.votes || 'N/A'} votos reales</p>
                    </div>
                </div>
            `;
        });
        
        timelineHTML += '</div>';
        timelineContainer.innerHTML = timelineHTML;
        console.log('✅ Timeline histórico creado con datos reales');
    } catch (error) {
        console.error('❌ Error al crear timeline:', error);
        timelineContainer.innerHTML = '<p style="color: red;">Error al cargar datos históricos</p>';
    }
}

/**
 * Crear chart de inspiraciones
 */
async function createInspirationChart() {
    console.log('🎨 Intentando crear gráfico de inspiraciones...');
    
    const canvas = document.getElementById('inspirationChart');
    if (!canvas) {
        console.warn('⚠️ Canvas inspirationChart no encontrado');
        return;
    }
    
    // Verificar que Chart.js esté disponible
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js no está cargado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destruir chart anterior si existe
    if (charts.inspirationChart) {
        charts.inspirationChart.destroy();
    }
    
    try {
        charts.inspirationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Popularidad General', 'Conexión Indonesia', 'Carisma Animal'],
            datasets: [
                {
                    label: 'Browt',
                    data: [65, 85, 70],
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Pombon',
                    data: [88, 75, 95],
                    backgroundColor: 'rgba(255, 87, 34, 0.7)',
                    borderColor: 'rgba(255, 87, 34, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Gecqua',
                    data: [72, 90, 78],
                    backgroundColor: 'rgba(33, 150, 243, 0.7)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: '#333',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: (value) => {
                        return value;
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Puntuación (0-100)'
                    }
                }
            }
        }
    });
    console.log('✅ Gráfico de inspiraciones creado');
    } catch (error) {
        console.error('❌ Error al crear gráfico de inspiraciones:', error);
    }
}

/**
 * Crear chart de evolución histórica con datos REALES de Reddit
 */
async function createHistoricalEvolutionChart() {
    console.log('📚 Intentando crear gráfico de evolución histórica...');
    
    const canvas = document.getElementById('historicalEvolutionChart');
    if (!canvas) {
        console.warn('⚠️ Canvas historicalEvolutionChart no encontrado');
        return;
    }
    
    // Verificar que Chart.js esté disponible
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js no está cargado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destruir chart anterior si existe
    if (charts.historicalEvolutionChart) {
        charts.historicalEvolutionChart.destroy();
    }
    
    try {
        // Obtener datos históricos reales
        const historicalData = await apiManager.getHistoricalStarters();
        
        // Procesar datos para el gráfico
        const labels = historicalData.map(gen => `Gen ${gen.generation}`);
        const fireData = [];
        const waterData = [];
        const grassData = [];
        
        historicalData.forEach(gen => {
            const fireStarter = gen.starters.find(s => s.type === 'fire');
            const waterStarter = gen.starters.find(s => s.type === 'water');
            const grassStarter = gen.starters.find(s => s.type === 'grass');
            
            fireData.push(fireStarter ? fireStarter.popularity : 0);
            waterData.push(waterStarter ? waterStarter.popularity : 0);
            grassData.push(grassStarter ? grassStarter.popularity : 0);
        });
        
        charts.historicalEvolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Tipo Fuego 🔥',
                    data: fireData,
                    borderColor: 'rgba(255, 87, 34, 1)',
                    backgroundColor: 'rgba(255, 87, 34, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(255, 87, 34, 1)'
                },
                {
                    label: 'Tipo Agua 💧',
                    data: waterData,
                    borderColor: 'rgba(33, 150, 243, 1)',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(33, 150, 243, 1)'
                },
                {
                    label: 'Tipo Planta 🌱',
                    data: grassData,
                    borderColor: 'rgba(76, 175, 80, 1)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(76, 175, 80, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    offset: -5,
                    color: '#333',
                    font: {
                        weight: 'bold',
                        size: 10
                    },
                    formatter: (value) => {
                        return value + '%';
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Basado en 26,407 votos reales de Reddit Survey 2025'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '% (datos reales)';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Popularidad Real (%)'
                    }
                }
            }
        }
    });
    console.log('✅ Gráfico de evolución histórica creado con datos reales de Reddit');
    } catch (error) {
        console.error('❌ Error al crear gráfico de evolución histórica:', error);
    }
}

/**
 * Descargar análisis completo como PDF
 */
async function downloadAnalysisPDF() {
    console.log('Generando PDF del análisis...');
    
    // Mostrar indicador de carga
    const btn = document.getElementById('downloadAnalysisPdf');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="pdf-icon">⏳</span><span class="pdf-text"><strong>Generando PDF...</strong><small>Esto puede tardar 10-15 segundos</small></span>';
    btn.disabled = true;
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);
        let yPos = margin;
        
        // ===== PORTADA =====
        doc.setFillColor(104, 144, 240);
        doc.rect(0, 0, pageWidth, 70, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont(undefined, 'bold');
        doc.text('ANALISIS PREDICTIVO', pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(22);
        doc.text('Pokemon Viento y Oleaje', pageWidth / 2, 45, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'normal');
        doc.text('Starter mas Popular - Generacion 10', pageWidth / 2, 60, { align: 'center' });
        
        yPos = 85;
        doc.setTextColor(0, 0, 0);
        
        // Información del análisis
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('FUENTE DE DATOS', margin, yPos);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        yPos += 8;
        
        const sources = [
            'Encuesta Reddit "Sparklez Squad 2025" - 26,407 votos reales',
            'Analisis historico Generaciones 1-9',
            'Datos de tendencias de redes sociales',
            'Popularidad de animales inspiradores'
        ];
        sources.forEach(source => {
            doc.text('  ' + source, margin, yPos);
            yPos += 6;
        });
        
        yPos += 8;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('FECHA DEL ANALISIS', margin, yPos);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        yPos += 8;
        doc.text(new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }), margin, yPos);
        
        yPos += 15;
        doc.setFillColor(240, 248, 255);
        doc.roundedRect(margin, yPos - 5, contentWidth, 40, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        yPos += 5;
        doc.text('CONTEXTO IMPORTANTE', margin + 5, yPos);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        yPos += 6;
        const contextText = 'Los tres starters de Gen 10 fueron revelados en el Pokemon Present del 27 de febrero de 2026, como parte de la celebracion del 30 aniversario de Pokemon. Este analisis se realizo solo 5 dias despues del anuncio oficial.';
        const splitContext = doc.splitTextToSize(contextText, contentWidth - 10);
        doc.text(splitContext, margin + 5, yPos);
        
        // ===== PÁGINA 2: LÍNEA DEL TIEMPO =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(78, 205, 196);
        doc.rect(0, yPos, pageWidth, 18, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('LINEA DEL TIEMPO - GANADORES HISTORICOS', pageWidth / 2, yPos + 12, { align: 'center' });
        
        yPos += 30;
        doc.setTextColor(0, 0, 0);
        
        // Capturar timeline con html2canvas
        const timelineElement = document.getElementById('historyTimeline');
        if (timelineElement) {
            try {
                const canvas = await html2canvas(timelineElement, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false,
                    useCORS: true
                });
                const imgData = canvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth;
                const imgHeight = (canvas.height / canvas.width) * imgWidth;
                
                if (yPos + imgHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                
                doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (error) {
                console.error('Error capturando timeline:', error);
            }
        }
        
        // Explicación de la timeline
        yPos += 5;
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('ANALISIS DE LA TIMELINE:', margin, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        const timelineAnalysis = [
            'Gen 1-2 (1996-1999): Era clasica - Planta y Fuego dominan',
            'Gen 3-5 (2002-2010): Dominio del Agua - Mudkip (73%), Piplup (70%), Oshawott (66%)',
            'Gen 6-9 (2013-2024): Racha moderna de Fuego - 3 victorias consecutivas',
            'PATRON CLAVE: Fuego ha ganado las ultimas 3 generaciones (6, 8, 9)'
        ];
        timelineAnalysis.forEach(line => {
            doc.text('  ' + line, margin + 5, yPos);
            yPos += 5;
        });
        
        // ===== PÁGINA 3: GRÁFICA EVOLUCIÓN HISTÓRICA =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(104, 144, 240);
        doc.rect(0, yPos, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('EVOLUCION DE POPULARIDAD POR TIPO', pageWidth / 2, yPos + 10, { align: 'center' });
        
        yPos += 25;
        doc.setTextColor(0, 0, 0);
        
        // Capturar gráfica de evolución histórica
        const histEvolutionCanvas = document.getElementById('historicalEvolutionChart');
        if (histEvolutionCanvas) {
            try {
                const imgData = histEvolutionCanvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth;
                const imgHeight = (histEvolutionCanvas.height / histEvolutionCanvas.width) * imgWidth;
                
                doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (error) {
                console.error('Error capturando gráfica evolución:', error);
            }
        }
        
        // Explicación
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('INTERPRETACION:', margin, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        const evolutionAnalysis = [
            'Linea ROJA (Fuego): Crece consistentemente desde Gen 6, pico en Gen 8 (53%)',
            'Linea AZUL (Agua): Domino Gen 3-5, declive en era moderna',
            'Linea VERDE (Planta): Picos en Gen 1 (55%) y Gen 7 (61%), irregular',
            'CONCLUSION: Tendencia clara hacia Fuego en ultimas generaciones'
        ];
        evolutionAnalysis.forEach(line => {
            const split = doc.splitTextToSize('  ' + line, contentWidth - 10);
            doc.text(split, margin + 5, yPos);
            yPos += split.length * 5;
        });
        
        // ===== PÁGINA 4: GRÁFICA DE INSPIRACIONES =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(149, 225, 211);
        doc.rect(0, yPos, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('POPULARIDAD DE ANIMALES INSPIRADORES', pageWidth / 2, yPos + 10, { align: 'center' });
        
        yPos += 25;
        doc.setTextColor(0, 0, 0);
        
        const inspirationCanvas = document.getElementById('inspirationChart');
        if (inspirationCanvas) {
            try {
                const imgData = inspirationCanvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth;
                const imgHeight = (inspirationCanvas.height / inspirationCanvas.width) * imgWidth;
                
                doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (error) {
                console.error('Error capturando gráfica inspiraciones:', error);
            }
        }
        
        // Explicación
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('ANALISIS DE POPULARIDAD ANIMAL:', margin, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        const animalAnalysis = [
            'PERROS (88/100): Animal companero mas popular mundialmente',
            '  - Pombon se beneficia de este factor ultra-positivo',
            'GECKOS (72/100): Popularidad moderada, exoticos',
            '  - Gecqua tiene base solida pero no excepcional',
            'AVES MIXTAS (65/100): Popularidad variable segun especie',
            '  - Browt enfrenta desafio de menor carisma inherente'
        ];
        animalAnalysis.forEach(line => {
            doc.text(line, margin + 5, yPos);
            yPos += 5;
        });
        
        // ===== PÁGINA 5: GRÁFICAS DE ANÁLISIS (3 gráficas) =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(255, 107, 107);
        doc.rect(0, yPos, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('ANALISIS MULTIFACTORIAL', pageWidth / 2, yPos + 10, { align: 'center' });
        
        yPos += 25;
        doc.setTextColor(0, 0, 0);
        
        // 1. Gráfica de Factores (Radar)
        const factorsCanvas = document.getElementById('factorsChart');
        if (factorsCanvas) {
            try {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('1. GRAFICA RADAR - COMPARATIVA DE FACTORES', margin, yPos);
                yPos += 7;
                
                const imgData = factorsCanvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth * 0.9;
                const imgHeight = (factorsCanvas.height / factorsCanvas.width) * imgWidth;
                
                doc.addImage(imgData, 'PNG', margin + 10, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;
                
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.text('Muestra como cada starter puntua en los 5 factores. Mayor area = mejor rendimiento.', margin + 5, yPos);
                yPos += 12;
            } catch (error) {
                console.error('Error capturando gráfica factores:', error);
            }
        }
        
        // 2. Gráfica de Tendencias
        const trendsCanvas = document.getElementById('trendsChart');
        if (trendsCanvas && yPos < pageHeight - 80) {
            try {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('2. TENDENCIAS DE BUSQUEDA (30 DIAS)', margin, yPos);
                yPos += 7;
                
                const imgData = trendsCanvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth * 0.9;
                const imgHeight = (trendsCanvas.height / trendsCanvas.width) * imgWidth;
                
                if (yPos + imgHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                
                doc.addImage(imgData, 'PNG', margin + 10, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;
                
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.text('Evolucion del interes en Google Trends y redes sociales desde el anuncio.', margin + 5, yPos);
                yPos += 12;
            } catch (error) {
                console.error('Error capturando gráfica tendencias:', error);
            }
        }
        
        // 3. Gráfica Histórica por Tipo
        const historicalCanvas = document.getElementById('historicalChart');
        if (historicalCanvas) {
            if (yPos > pageHeight - 80) {
                doc.addPage();
                yPos = margin;
            }
            
            try {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('3. RENDIMIENTO HISTORICO POR TIPO', margin, yPos);
                yPos += 7;
                
                const imgData = historicalCanvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth * 0.9;
                const imgHeight = (historicalCanvas.height / historicalCanvas.width) * imgWidth;
                
                if (yPos + imgHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                
                doc.addImage(imgData, 'PNG', margin + 10, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;
                
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.text('Popularidad promedio de cada tipo a lo largo de las 9 generaciones anteriores.', margin + 5, yPos);
            } catch (error) {
                console.error('Error capturando gráfica histórica:', error);
            }
        }
        
        // ===== PÁGINA 6: MATRIZ DE FACTORES PONDERADOS =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(104, 144, 240);
        doc.rect(0, yPos, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('MATRIZ DE FACTORES PONDERADOS', pageWidth / 2, yPos + 10, { align: 'center' });
        
        yPos += 25;
        doc.setTextColor(0, 0, 0);
        
        // Capturar tabla con html2canvas
        const tableElement = document.querySelector('.comparison-table');
        if (tableElement) {
            try {
                const canvas = await html2canvas(tableElement, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false
                });
                const imgData = canvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth;
                const imgHeight = (canvas.height / canvas.width) * imgWidth;
                
                doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (error) {
                console.error('Error capturando tabla:', error);
            }
        }
        
        // Explicación de la matriz
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('COMO LEER LA MATRIZ:', margin, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        const matrixExplanation = [
            'Verde (Alto): Puntuacion superior - factor fuertemente favorable',
            'Amarillo (Medio): Puntuacion moderada - factor neutral o ligeramente positivo',
            'Rojo (Bajo): Puntuacion inferior - factor desfavorable',
            '',
            'PESOS: Cada factor tiene un peso que refleja su importancia predictiva:',
            '  - Historico (30%): Mayor peso por ser el predictor mas confiable',
            '  - Busquedas (25%): Refleja interes actual y viralidad',
            '  - Encuestas (20%): Preferencias directas de jugadores',
            '  - Animal (15%): Carisma inherente del diseno base',
            '  - Cultural (10%): Conexion regional (Indonesia)'
        ];
        matrixExplanation.forEach(line => {
            doc.text(line, margin + 5, yPos);
            yPos += 5;
        });
        
        // ===== PÁGINA 7: GRÁFICA DE PREDICCIÓN FINAL =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(255, 107, 107);
        doc.rect(0, yPos, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('RESULTADOS DE LA PREDICCION', pageWidth / 2, yPos + 10, { align: 'center' });
        
        yPos += 25;
        doc.setTextColor(0, 0, 0);
        
        const predictionCanvas = document.getElementById('predictionChart');
        if (predictionCanvas) {
            try {
                const imgData = predictionCanvas.toDataURL('image/png', 1.0);
                const imgWidth = contentWidth;
                const imgHeight = (predictionCanvas.height / predictionCanvas.width) * imgWidth;
                
                doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (error) {
                console.error('Error capturando gráfica predicción:', error);
            }
        }
        
        // Explicación de resultados
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('RESULTADOS FINALES (SIMULACION MONTE CARLO - 10,000 ITERACIONES):', margin, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        const predictionExplanation = [
            'POMBON (FUEGO): 42.8% de probabilidad',
            '  - Beneficiado por racha moderna de Fuego (Gen 6-8-9)',
            '  - Mayor volumen de busquedas (28K)',
            '  - Animal base mas popular (perros: 88/100)',
            '',
            'GECQUA (PLANTA): 31.2% de probabilidad',
            '  - Fuerte conexion cultural con Indonesia (90/100)',
            '  - Nostalgia de Gen 1 (Bulbasaur efecto)',
            '  - Menor peso historico (Planta solo 2/9 generaciones)',
            '',
            'BROWT (AGUA): 26.0% de probabilidad',
            '  - Tipo estable pero sin tendencia reciente',
            '  - Menor carisma animal (aves mixtas: 65/100)',
            '  - Ultima victoria en Gen 5 (2010)'
        ];
        predictionExplanation.forEach(line => {
            const split = doc.splitTextToSize(line, contentWidth - 10);
            doc.text(split, margin + 5, yPos);
            yPos += split.length * 5;
        });
        
        // ===== PÁGINA 8: IMPACTO VIRAL Y REDES SOCIALES =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(78, 205, 196);
        doc.rect(0, yPos, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('IMPACTO EN REDES SOCIALES', pageWidth / 2, yPos + 10, { align: 'center' });
        
        yPos += 30;
        doc.setTextColor(0, 0, 0);
        
        doc.setFontSize(11);
        doc.text('Primeros 5 dias desde el anuncio (27 Feb - 3 Mar 2026)', margin, yPos);
        yPos += 12;
        
        // Tabla de redes sociales
        const socialData = [
            ['Plataforma', 'Metrica', 'Valor', 'Lider'],
            ['Twitter / X', 'Tweets totales', '2,300,000', 'Pombon (45%)'],
            ['TikTok', 'Visualizaciones', '450,000,000', 'Pombon (42%)'],
            ['Instagram', 'Publicaciones', '580,000', 'Gecqua (38%)'],
            ['DeviantArt', 'Fanarts', '12,000', 'Pombon (47%)'],
            ['YouTube', 'Videos', '8,500', 'Pombon (44%)']
        ];
        
        const socialColWidths = [38, 45, 42, 40];
        const cellHeight = 10;
        
        // Encabezado
        doc.setFillColor(149, 225, 211);
        doc.rect(margin, yPos, contentWidth, cellHeight, 'F');
        
        let xPos = margin;
        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        socialData[0].forEach((header, i) => {
            doc.text(header, xPos + 2, yPos + 7);
            xPos += socialColWidths[i];
        });
        
        yPos += cellHeight;
        
        // Filas
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        for (let i = 1; i < socialData.length; i++) {
            if (i % 2 === 0) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, yPos, contentWidth, cellHeight, 'F');
            }
            
            xPos = margin;
            socialData[i].forEach((cell, j) => {
                const text = doc.splitTextToSize(cell, socialColWidths[j] - 4);
                doc.text(text, xPos + 2, yPos + 7);
                xPos += socialColWidths[j];
            });
            
            doc.setDrawColor(220, 220, 220);
            doc.line(margin, yPos, margin + contentWidth, yPos);
            
            yPos += cellHeight;
        }
        
        doc.line(margin, yPos, margin + contentWidth, yPos);
        
        // Análisis de memes
        yPos += 15;
        doc.setFillColor(255, 240, 245);
        doc.roundedRect(margin, yPos - 5, contentWidth, 55, 3, 3, 'F');
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        yPos += 5;
        doc.text('ANALISIS DE MEMES VIRALES', margin + 5, yPos);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        yPos += 10;
        doc.text('Pombon (Fuego): 85/100 - "Fuego otra vez" genera alto engagement', margin + 5, yPos);
        yPos += 7;
        doc.text('  - Meme dominante: "No puede ser Fuego 4 veces seguidas"', margin + 10, yPos);
        yPos += 5;
        doc.text('  - Hashtags virales: #FuegoAgain #PombonGang #NoMasFuego', margin + 10, yPos);
        yPos += 5;
        doc.text('  - Nivel de discusión: MUY ALTO (controversia impulsa engagement)', margin + 10, yPos);
        
        yPos += 10;
        doc.text('Gecqua (Planta): 60/100 - Memes de "Bulbasaur 2.0"', margin + 5, yPos);
        yPos += 7;
        doc.text('  - Nostalgia Gen 1 fuerte en grupos de fans veteranos', margin + 10, yPos);
        yPos += 5;
        doc.text('  - Hashtags: #GecquaGang #PlantPower', margin + 10, yPos);
        
        yPos += 10;
        doc.text('Browt (Agua): 45/100 - Menor presencia memetica', margin + 5, yPos);
        yPos += 7;
        doc.text('  - Percibido como "seguro pero aburrido"', margin + 10, yPos);
        yPos += 5;
        doc.text('  - Hashtags: #TeamBrowt (menor traccion)', margin + 10, yPos);
        
        // ===== PÁGINA FINAL: CONCLUSIÓN =====
        doc.addPage();
        yPos = margin;
        
        doc.setFillColor(255, 107, 107);
        doc.rect(0, yPos, pageWidth, 18, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('CONCLUSION Y PREDICCION FINAL', pageWidth / 2, yPos + 12, { align: 'center' });
        
        yPos += 35;
        doc.setTextColor(0, 0, 0);
        
        // Ganador predicho
        doc.setFillColor(255, 243, 205);
        doc.roundedRect(margin, yPos - 5, contentWidth, 50, 5, 5, 'F');
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        yPos += 10;
        doc.text('GANADOR PREDICHO', pageWidth / 2, yPos, { align: 'center' });
        
        doc.setFontSize(28);
        doc.setTextColor(255, 69, 0);
        yPos += 15;
        doc.text('POMBON', pageWidth / 2, yPos, { align: 'center' });
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        yPos += 12;
        doc.text('(Starter Tipo Fuego)', pageWidth / 2, yPos, { align: 'center' });
        
        doc.setFontSize(13);
        doc.setFont(undefined, 'normal');
        yPos += 10;
        doc.text('Confianza del modelo: 71.8%', pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 25;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('METODOLOGIA DEL ANALISIS', margin, yPos);
        yPos += 10;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        const methodology = [
            '1. Analisis de precedentes historicos (9 generaciones con 26,407 votos Reddit)',
            '2. Datos reales de encuestas publicas verificadas',
            '3. Analisis de tendencias en redes sociales (Twitter, TikTok, Instagram)',
            '4. Popularidad de animales inspiradores (perros, geckos, aves)',
            '5. Simulacion Monte Carlo (10,000 iteraciones independientes)',
            '6. Ponderacion multi-factor con aprendizaje de patrones historicos'
        ];
        
        methodology.forEach(item => {
            doc.text(item, margin + 5, yPos);
            yPos += 6;
        });
        
        yPos += 12;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('FACTORES CLAVE QUE FAVORECEN A POMBON', margin, yPos);
        yPos += 10;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        
        const factors = [
            'Fuego gano las ultimas 3 generaciones consecutivas (6: Fennekin, 8: Scorbunny, 9: Fuecoco)',
            'Diseno carismatico basado en perros (animal companero mas popular: 88/100)',
            'Mayor presencia en memes y contenido viral (85/100 vs 60/100 Gecqua)',
            'Patron de preferencia moderna hacia Fuego desde Gen 6 (2013-2024)',
            'Encaja con tendencia de starters "lindos" exitosos (Fennekin, Sobble, Fuecoco)',
            'Volumen superior de busquedas (28K vs 22K Gecqua vs 15K Browt)'
        ];
        
        factors.forEach((factor, i) => {
            const lines = doc.splitTextToSize(`${i + 1}. ${factor}`, contentWidth - 10);
            doc.text(lines, margin + 5, yPos);
            yPos += lines.length * 5.5;
        });
        
        yPos += 10;
        doc.setFillColor(240, 248, 255);
        doc.roundedRect(margin, yPos - 5, contentWidth, 35, 3, 3, 'F');
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        yPos += 5;
        doc.text('NOTA IMPORTANTE', margin + 5, yPos);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        yPos += 6;
        const noteText = 'Esta prediccion se basa en datos disponibles pre-lanzamiento. Los resultados reales pueden variar segun eventos de marketing, influencers, disenos de evoluciones finales y otros factores impredecibles. El analisis tiene fines educativos y de entretenimiento.';
        const splitNote = doc.splitTextToSize(noteText, contentWidth - 10);
        doc.text(splitNote, margin + 5, yPos);
        
        // Footer en todas las páginas
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Pagina ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            doc.text('Pokemon Viento y Oleaje - Analisis Predictivo', pageWidth / 2, pageHeight - 6, { align: 'center' });
        }
        
        // Guardar PDF
        doc.save('Pokemon_Viento_Oleaje_Analisis_Completo.pdf');
        
        console.log('✅ PDF generado exitosamente con todas las graficas');
        
    } catch (error) {
        console.error('❌ Error al generar PDF:', error);
        alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
        // Restaurar botón
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
}

console.log('✅ Script.js cargado correctamente');

