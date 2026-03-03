<?php
/**
 * PREDICT.PHP - Backend de Predicción
 * Maneja análisis del lado del servidor y cacheo de datos
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración
define('CACHE_DIR', __DIR__ . '/../data/cache/');
define('CACHE_DURATION', 3600); // 1 hora

// Crear directorio de caché si no existe
if (!file_exists(CACHE_DIR)) {
    mkdir(CACHE_DIR, 0777, true);
}

class PredictionBackend {
    
    /**
     * Procesar solicitud
     */
    public function handleRequest() {
        $action = $_GET['action'] ?? 'predict';
        
        switch ($action) {
            case 'predict':
                return $this->runPrediction();
            case 'trends':
                return $this->getTrends();
            case 'polls':
                return $this->getPolls();
            case 'historical':
                return $this->getHistorical();
            case 'clear-cache':
                return $this->clearCache();
            default:
                return $this->error('Acción no válida');
        }
    }
    
    /**
     * Ejecutar predicción del lado del servidor
     */
    private function runPrediction() {
        $weights = [
            'historical' => $_POST['weightHistorical'] ?? 30,
            'trends' => $_POST['weightTrends'] ?? 25,
            'polls' => $_POST['weightPolls'] ?? 20,
            'animal' => $_POST['weightAnimal'] ?? 15,
            'culture' => $_POST['weightCulture'] ?? 10
        ];
        
        // Obtener datos necesarios
        $historical = $this->getHistoricalData();
        $trends = $this->getTrendsData();
        $polls = $this->getPollsData();
        
        // Calcular scores
        $scores = [
            'browt' => $this->calculateScore('browt', 'grass', $weights, $historical, $trends, $polls),
            'pombon' => $this->calculateScore('pombon', 'fire', $weights, $historical, $trends, $polls),
            'gecqua' => $this->calculateScore('gecqua', 'water', $weights, $historical, $trends, $polls)
        ];
        
        // Convertir a probabilidades
        $total = array_sum($scores);
        $probabilities = [
            'browt' => round(($scores['browt'] / $total) * 100, 2),
            'pombon' => round(($scores['pombon'] / $total) * 100, 2),
            'gecqua' => round(($scores['gecqua'] / $total) * 100, 2)
        ];
        
        return [
            'success' => true,
            'probabilities' => $probabilities,
            'scores' => $scores,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }
    
    /**
     * Calcular score para un starter
     */
    private function calculateScore($starter, $type, $weights, $historical, $trends, $polls) {
        $historicalScore = $this->getHistoricalScore($type, $historical);
        $trendsScore = $trends[$starter]['interest'] ?? 50;
        $pollsScore = $this->getPollsScore($starter, $polls);
        $animalScore = $this->getAnimalScore($starter);
        $cultureScore = $this->getCultureScore($starter);
        
        $totalScore = (
            ($historicalScore * $weights['historical']) +
            ($trendsScore * $weights['trends']) +
            ($pollsScore * $weights['polls']) +
            ($animalScore * $weights['animal']) +
            ($cultureScore * $weights['culture'])
        ) / 100;
        
        return $totalScore;
    }
    
    /**
     * Obtener score histórico
     */
    private function getHistoricalScore($type, $historical) {
        $wins = 0;
        $total = count($historical);
        
        foreach ($historical as $gen) {
            if ($gen['mostChosen'] === $type) {
                $wins++;
            }
        }
        
        return ($wins / $total) * 100;
    }
    
    /**
     * Obtener score de encuestas
     */
    private function getPollsScore($starter, $polls) {
        $total = 0;
        $count = 0;
        
        foreach ($polls as $poll) {
            if (isset($poll['results'][$starter])) {
                $total += $poll['results'][$starter];
                $count++;
            }
        }
        
        return $count > 0 ? ($total / $count) : 50;
    }
    
    /**
     * Obtener score de popularidad animal
     */
    private function getAnimalScore($starter) {
        $scores = [
            'browt' => 70,
            'pombon' => 88,
            'gecqua' => 75
        ];
        
        return $scores[$starter] ?? 50;
    }
    
    /**
     * Obtener score cultural
     */
    private function getCultureScore($starter) {
        $scores = [
            'browt' => 75,
            'pombon' => 83,
            'gecqua' => 84
        ];
        
        return $scores[$starter] ?? 50;
    }
    
    /**
     * Obtener tendencias (simulated o desde caché)
     */
    private function getTrends() {
        $cacheFile = CACHE_DIR . 'trends.json';
        
        if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < CACHE_DURATION) {
            return json_decode(file_get_contents($cacheFile), true);
        }
        
        $data = $this->getTrendsData();
        file_put_contents($cacheFile, json_encode($data));
        
        return ['success' => true, 'data' => $data];
    }
    
    /**
     * Obtener datos de tendencias
     */
    private function getTrendsData() {
        return [
            'browt' => [
                'searchVolume' => 15000,
                'trend' => 'rising',
                'interest' => 65
            ],
            'pombon' => [
                'searchVolume' => 28000,
                'trend' => 'stable',
                'interest' => 82
            ],
            'gecqua' => [
                'searchVolume' => 22000,
                'trend' => 'rising',
                'interest' => 73
            ]
        ];
    }
    
    /**
     * Obtener encuestas
     */
    private function getPolls() {
        $cacheFile = CACHE_DIR . 'polls.json';
        
        if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < CACHE_DURATION) {
            return json_decode(file_get_contents($cacheFile), true);
        }
        
        $data = $this->getPollsData();
        file_put_contents($cacheFile, json_encode($data));
        
        return ['success' => true, 'data' => $data];
    }
    
    /**
     * Obtener datos de encuestas
     */
    private function getPollsData() {
        return [
            'twitter' => [
                'source' => 'Twitter/X Pokémon Community',
                'totalVotes' => 45000,
                'results' => [
                    'browt' => 28,
                    'pombon' => 42,
                    'gecqua' => 30
                ],
                'date' => '2026-02-15'
            ],
            'reddit' => [
                'source' => 'r/pokemon Poll',
                'totalVotes' => 32000,
                'results' => [
                    'browt' => 25,
                    'pombon' => 38,
                    'gecqua' => 37
                ],
                'date' => '2026-02-20'
            ],
            'youtube' => [
                'source' => 'PokéTubers Surveys Average',
                'totalVotes' => 28000,
                'results' => [
                    'browt' => 30,
                    'pombon' => 40,
                    'gecqua' => 30
                ],
                'date' => '2026-02-25'
            ],
            'serebii' => [
                'source' => 'Serebii.net Poll',
                'totalVotes' => 25000,
                'results' => [
                    'browt' => 22,
                    'pombon' => 45,
                    'gecqua' => 33
                ],
                'date' => '2026-02-28'
            ]
        ];
    }
    
    /**
     * Obtener datos históricos
     */
    private function getHistorical() {
        $data = $this->getHistoricalData();
        return ['success' => true, 'data' => $data];
    }
    
    /**
     * Obtener datos históricos de starters
     */
    private function getHistoricalData() {
        // Leer desde archivo JSON si existe
        $dataFile = __DIR__ . '/../data/historical.json';
        
        if (file_exists($dataFile)) {
            return json_decode(file_get_contents($dataFile), true);
        }
        
        // Datos por defecto
        return [
            ['generation' => 1, 'region' => 'Kanto', 'year' => 1996, 'mostChosen' => 'fire'],
            ['generation' => 2, 'region' => 'Johto', 'year' => 1999, 'mostChosen' => 'fire'],
            ['generation' => 3, 'region' => 'Hoenn', 'year' => 2002, 'mostChosen' => 'water'],
            ['generation' => 4, 'region' => 'Sinnoh', 'year' => 2006, 'mostChosen' => 'fire'],
            ['generation' => 5, 'region' => 'Unova', 'year' => 2010, 'mostChosen' => 'water'],
            ['generation' => 6, 'region' => 'Kalos', 'year' => 2013, 'mostChosen' => 'fire'],
            ['generation' => 7, 'region' => 'Alola', 'year' => 2016, 'mostChosen' => 'grass'],
            ['generation' => 8, 'region' => 'Galar', 'year' => 2019, 'mostChosen' => 'fire'],
            ['generation' => 9, 'region' => 'Paldea', 'year' => 2022, 'mostChosen' => 'fire']
        ];
    }
    
    /**
     * Limpiar caché
     */
    private function clearCache() {
        $files = glob(CACHE_DIR . '*.json');
        foreach ($files as $file) {
            unlink($file);
        }
        
        return ['success' => true, 'message' => 'Caché limpiado'];
    }
    
    /**
     * Retornar error
     */
    private function error($message) {
        return ['success' => false, 'error' => $message];
    }
}

// Ejecutar backend
$backend = new PredictionBackend();
$result = $backend->handleRequest();
echo json_encode($result, JSON_PRETTY_PRINT);
?>
