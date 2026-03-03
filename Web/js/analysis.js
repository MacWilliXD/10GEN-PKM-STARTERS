/**
 * ANALYSIS.JS - Algoritmo Predictivo de Starters
 * Implementa múltiples métodos de análisis y predicción
 */

class PredictiveAnalysis {
    constructor() {
        // Pesos por defecto para cada factor
        this.weights = {
            historical: 30,    // Popularidad histórica por tipo
            trends: 25,        // Tendencias actuales de búsqueda
            polls: 20,         // Encuestas públicas
            animal: 15,        // Popularidad de inspiración animal
            culture: 10        // Tendencia cultural indonesia
        };

        this.currentPrediction = null;
    }

    /**
     * Establecer pesos personalizados
     */
    setWeights(newWeights) {
        this.weights = { ...this.weights, ...newWeights };
        this.normalizeWeights();
    }

    /**
     * Normalizar pesos para que sumen 100%
     */
    normalizeWeights() {
        const total = Object.values(this.weights).reduce((sum, w) => sum + w, 0);
        if (total !== 100) {
            const factor = 100 / total;
            Object.keys(this.weights).forEach(key => {
                this.weights[key] = Math.round(this.weights[key] * factor);
            });
        }
    }

    /**
     * Algoritmo principal de predicción
     */
    async predictMostChosen() {
        try {
            console.log('🔍 Recopilando datos...');
            
            // Recopilar todos los datos necesarios
            const historicalData = await apiManager.getHistoricalStarters();
            console.log('✅ Datos históricos obtenidos:', historicalData.length, 'generaciones');
            
            const searchTrends = await apiManager.getSearchTrends();
            console.log('✅ Tendencias obtenidas');
            
            const publicPolls = await apiManager.getPublicPolls();
            console.log('✅ Encuestas obtenidas');
            
            const animalPopularity = await apiManager.getAnimalPopularity();
            console.log('✅ Popularidad animal obtenida');
            
            const culturalData = await apiManager.getIndonesianCulturalData();
            console.log('✅ Datos culturales obtenidos');

            console.log('🧮 Calculando scores...');
            
            // Calcular scores individuales para cada starter
            const scores = {
                browt: this.calculateStarterScore('browt', historicalData, searchTrends, publicPolls, animalPopularity, culturalData),
                pombon: this.calculateStarterScore('pombon', historicalData, searchTrends, publicPolls, animalPopularity, culturalData),
                gecqua: this.calculateStarterScore('gecqua', historicalData, searchTrends, publicPolls, animalPopularity, culturalData)
            };
            
            console.log('📊 Scores calculados:', scores);

            // Convertir scores a probabilidades
            const probabilities = this.scoresToProbabilities(scores);
            console.log('📈 Probabilidades base:', probabilities);

            // Aplicar simulación Monte Carlo para refinar
            console.log('🎲 Ejecutando Monte Carlo (10,000 iteraciones)...');
            const monteCarloResults = this.monteCarloSimulation(probabilities, 10000);
            console.log('✅ Monte Carlo completado:', monteCarloResults);

            // Generar explicación detallada
            const explanation = this.generateExplanation(scores, probabilities, historicalData);

            this.currentPrediction = {
                scores,
                probabilities: monteCarloResults,
                explanation,
                timestamp: new Date().toISOString(),
                weights: { ...this.weights }
            };

            console.log('🎉 Predicción completada exitosamente');
            return this.currentPrediction;
        } catch (error) {
            console.error('❌ Error en predictMostChosen:', error);
            console.error('Stack:', error.stack);
            throw new Error('Fallo en el cálculo de predicción: ' + error.message);
        }
    }

    /**
     * Calcular score individual de un starter
     */
    calculateStarterScore(starter, historicalData, searchTrends, publicPolls, animalPopularity, culturalData) {
        const type = this.getStarterType(starter);
        
        // Factor 1: Popularidad Histórica por Tipo
        const historicalScore = this.calculateHistoricalScore(type, historicalData);
        
        // Factor 2: Tendencias de Búsqueda
        const trendsScore = this.calculateTrendsScore(starter, searchTrends);
        
        // Factor 3: Encuestas Públicas
        const pollsScore = this.calculatePollsScore(starter, publicPolls);
        
        // Factor 4: Popularidad Animal
        const animalScore = this.calculateAnimalScore(starter, animalPopularity);
        
        // Factor 5: Relevancia Cultural
        const cultureScore = this.calculateCultureScore(starter, culturalData);

        // Score ponderado total
        const totalScore = (
            (historicalScore * this.weights.historical) +
            (trendsScore * this.weights.trends) +
            (pollsScore * this.weights.polls) +
            (animalScore * this.weights.animal) +
            (cultureScore * this.weights.culture)
        ) / 100;

        return {
            total: totalScore,
            breakdown: {
                historical: historicalScore,
                trends: trendsScore,
                polls: pollsScore,
                animal: animalScore,
                culture: cultureScore
            }
        };
    }

    /**
     * Calcular score basado en datos históricos
     */
    calculateHistoricalScore(type, historicalData) {
        if (!historicalData || historicalData.length === 0) {
            console.warn(`⚠️ No hay datos históricos, usando valor por defecto`);
            return 50; // Valor neutral
        }
        
        const typeStats = apiManager.getTypeWinStatistics(historicalData);
        const typePercentage = parseFloat(typeStats[type]?.percentage || 0);
        
        // Ajustar por tendencia reciente (últimas 3 generaciones tienen más peso)
        const recentGens = historicalData.slice(-3);
        const recentTypeWins = recentGens.filter(g => g.mostChosen === type).length;
        const recentBonus = (recentTypeWins / 3) * 20; // Hasta 20 puntos de bonus
        
        return Math.min(100, typePercentage * 2 + recentBonus);
    }

    /**
     * Calcular score basado en tendencias de búsqueda
     */
    calculateTrendsScore(starter, searchTrends) {
        const data = searchTrends && searchTrends[starter];
        
        if (!data || typeof data.interest === 'undefined') {
            console.warn(`⚠️ No hay datos de tendencias para ${starter}, usando valor por defecto`);
            return 50; // Valor neutral
        }
        
        // Normalizar interés (0-100)
        let score = data.interest;
        
        // Bonus por tendencia creciente
        if (data.trend === 'rising') {
            score += 15;
        } else if (data.trend === 'stable') {
            score += 5;
        }
        
        return Math.min(100, score);
    }

    /**
     * Calcular score basado en encuestas públicas
     */
    calculatePollsScore(starter, publicPolls) {
        if (!publicPolls || Object.keys(publicPolls).length === 0) {
            console.warn(`⚠️ No hay datos de encuestas, usando valor por defecto`);
            return 50; // Valor neutral
        }
        
        const averages = apiManager.calculatePollsAverage(publicPolls);
        const score = parseFloat(averages[starter]) || 0;
        
        // Normalizar a escala 0-100
        return Math.min(100, (score / 50) * 100); // Asumiendo máximo razonable de 50%
    }

    /**
     * Calcular score basado en popularidad animal
     */
    calculateAnimalScore(starter, animalPopularity) {
        const data = animalPopularity && animalPopularity[starter];
        
        if (!data || typeof data.popularity === 'undefined') {
            console.warn(`⚠️ No hay datos de popularidad animal para ${starter}, usando valor por defecto`);
            return 50; // Valor neutral
        }
        
        // Promedio ponderado
        const score = (
            (data.popularity || 0) * 0.4 +
            (data.culturalRelevance || 0) * 0.3 +
            (data.indonesianConnection || 0) * 0.3
        );
        
        return score;
    }

    /**
     * Calcular score basado en relevancia cultural
     */
    calculateCultureScore(starter, culturalData) {
        const data = culturalData && culturalData[starter];
        
        if (!data || typeof data.culturalFit === 'undefined') {
            console.warn(`⚠️ No hay datos culturales para ${starter}, usando valor por defecto`);
            return 50; // Valor neutral
        }
        
        // Promedio de cultural fit y favorability
        const score = ((data.culturalFit || 0) + (data.favorability || 0)) / 2;
        
        return score;
    }

    /**
     * Convertir scores a probabilidades normalizadas
     */
    scoresToProbabilities(scores) {
        const total = scores.browt.total + scores.pombon.total + scores.gecqua.total;
        
        return {
            browt: ((scores.browt.total / total) * 100).toFixed(2),
            pombon: ((scores.pombon.total / total) * 100).toFixed(2),
            gecqua: ((scores.gecqua.total / total) * 100).toFixed(2)
        };
    }

    /**
     * Simulación Monte Carlo para refinar probabilidades
     */
    monteCarloSimulation(baseProbabilities, iterations = 10000) {
        const results = { browt: 0, pombon: 0, gecqua: 0 };
        
        for (let i = 0; i < iterations; i++) {
            const random = Math.random() * 100;
            const browtThreshold = parseFloat(baseProbabilities.browt);
            const pombonThreshold = browtThreshold + parseFloat(baseProbabilities.pombon);
            
            if (random < browtThreshold) {
                results.browt++;
            } else if (random < pombonThreshold) {
                results.pombon++;
            } else {
                results.gecqua++;
            }
        }
        
        // Convertir conteo a porcentajes
        return {
            browt: ((results.browt / iterations) * 100).toFixed(2),
            pombon: ((results.pombon / iterations) * 100).toFixed(2),
            gecqua: ((results.gecqua / iterations) * 100).toFixed(2)
        };
    }

    /**
     * Generar explicación detallada de la predicción
     */
    generateExplanation(scores, probabilities, historicalData) {
        const winner = this.getWinner(probabilities);
        const typeStats = apiManager.getTypeWinStatistics(historicalData);
        
        let explanation = `<strong>Análisis Predictivo Completo:</strong><br><br>`;
        
        explanation += `🏆 <strong>Predicción Final: ${this.capitalizeFirst(winner)}</strong><br>`;
        explanation += `Con una probabilidad del ${probabilities[winner]}%<br><br>`;
        
        explanation += `<strong>Factores Clave:</strong><br>`;
        explanation += `• Popularidad histórica del tipo ${this.getStarterType(winner)}: ${typeStats[this.getStarterType(winner)].percentage}%<br>`;
        explanation += `• Score de tendencias: ${scores[winner].breakdown.trends.toFixed(1)}/100<br>`;
        explanation += `• Promedio en encuestas: ${scores[winner].breakdown.polls.toFixed(1)}/100<br>`;
        explanation += `• Relevancia cultural indonesia: ${scores[winner].breakdown.culture.toFixed(1)}/100<br><br>`;
        
        explanation += `<strong>Desglose de Probabilidades:</strong><br>`;
        explanation += `🌱 Browt (Planta): ${probabilities.browt}%<br>`;
        explanation += `🔥 Pombon (Fuego): ${probabilities.pombon}%<br>`;
        explanation += `💧 Gecqua (Agua): ${probabilities.gecqua}%<br>`;
        
        return explanation;
    }

    /**
     * Análisis de regresión lineal simple
     */
    linearRegression(historicalData) {
        const typeScores = { grass: [], fire: [], water: [] };
        
        historicalData.forEach((gen, index) => {
            gen.starters.forEach(starter => {
                typeScores[starter.type].push(starter.popularity);
            });
        });
        
        // Calcular tendencia para cada tipo
        const trends = {};
        Object.keys(typeScores).forEach(type => {
            const values = typeScores[type];
            const n = values.length;
            const sumX = values.reduce((a, b, i) => a + i, 0);
            const sumY = values.reduce((a, b) => a + b, 0);
            const sumXY = values.reduce((a, b, i) => a + (i * b), 0);
            const sumX2 = values.reduce((a, b, i) => a + (i * i), 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            trends[type] = slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable';
        });
        
        return trends;
    }

    /**
     * Obtener tipo de un starter
     */
    getStarterType(starter) {
        const types = {
            browt: 'grass',
            pombon: 'fire',
            gecqua: 'water'
        };
        return types[starter];
    }

    /**
     * Obtener ganador
     */
    getWinner(probabilities) {
        const entries = Object.entries(probabilities);
        entries.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
        return entries[0][0];
    }

    /**
     * Capitalizar primera letra
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Generar factores de influencia para gráfica
     */
    getInfluenceFactors() {
        return {
            labels: ['Histórico', 'Tendencias', 'Encuestas', 'Animal', 'Cultural'],
            weights: [
                this.weights.historical,
                this.weights.trends,
                this.weights.polls,
                this.weights.animal,
                this.weights.culture
            ]
        };
    }

    /**
     * Comparar con generaciones anteriores
     */
    async compareWithPreviousGenerations() {
        const historicalData = await apiManager.getHistoricalStarters();
        
        return historicalData.map(gen => ({
            generation: gen.generation,
            region: gen.region,
            year: gen.year,
            winner: gen.mostChosen,
            winnerData: gen.starters.find(s => s.type === gen.mostChosen),
            winnerPopularity: gen.winnerPopularity
        }));
    }

    /**
     * Exportar predicción actual
     */
    exportPrediction() {
        if (!this.currentPrediction) {
            throw new Error('No hay predicción disponible para exportar');
        }
        
        const exportData = {
            ...this.currentPrediction,
            generatedBy: 'Pokémon Gen 10 Predictor',
            version: '1.0'
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    /**
     * Resetear pesos a valores por defecto
     */
    resetWeights() {
        this.weights = {
            historical: 30,
            trends: 25,
            polls: 20,
            animal: 15,
            culture: 10
        };
    }
}

// Instancia global
const predictiveAnalysis = new PredictiveAnalysis();
