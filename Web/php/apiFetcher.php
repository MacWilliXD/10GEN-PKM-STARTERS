<?php
/**
 * APIFETCHER.PHP - Fetcher de APIs Externas
 * Maneja llamadas a APIs externas para evitar CORS y cachear resultados
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración
define('CACHE_DIR', __DIR__ . '/../data/cache/');
define('CACHE_DURATION', 3600); // 1 hora
define('USER_AGENT', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

// Crear directorio de caché si no existe
if (!file_exists(CACHE_DIR)) {
    mkdir(CACHE_DIR, 0777, true);
}

class APIFetcher {
    
    private $cacheEnabled = true;
    
    /**
     * Manejar solicitud
     */
    public function handleRequest() {
        $action = $_GET['action'] ?? '';
        
        switch ($action) {
            case 'pokeapi':
                return $this->fetchPokeAPI();
            case 'polls':
                return $this->fetchPolls();
            case 'reddit':
                return $this->fetchReddit();
            case 'wikipedia':
                return $this->fetchWikipedia();
            case 'trends':
                return $this->fetchTrends();
            default:
                return $this->error('Acción no especificada');
        }
    }
    
    /**
     * Fetch desde PokéAPI
     */
    private function fetchPokeAPI() {
        $pokemon = $_GET['pokemon'] ?? 'bulbasaur';
        $cacheKey = 'pokeapi_' . $pokemon;
        
        // Verificar caché
        $cached = $this->getFromCache($cacheKey);
        if ($cached !== null) {
            return ['success' => true, 'data' => $cached, 'cached' => true];
        }
        
        // Fetch desde API
        $url = "https://pokeapi.co/api/v2/pokemon/" . $pokemon;
        $data = $this->makeRequest($url);
        
        if ($data) {
            $this->saveToCache($cacheKey, $data);
            return ['success' => true, 'data' => $data, 'cached' => false];
        }
        
        return $this->error('Error al obtener datos de PokéAPI');
    }
    
    /**
     * Fetch datos de encuestas (simulado o desde fuentes reales)
     */
    private function fetchPolls() {
        $cacheKey = 'polls_data';
        
        // Verificar caché
        $cached = $this->getFromCache($cacheKey);
        if ($cached !== null) {
            return ['success' => true, 'data' => $cached, 'cached' => true];
        }
        
        // Datos simulados realistas
        $pollsData = [
            'twitter' => [
                'source' => 'Twitter/X @PokemonCommunity',
                'totalVotes' => 45230,
                'results' => [
                    'browt' => 28,
                    'pombon' => 42,
                    'gecqua' => 30
                ],
                'date' => '2026-02-15',
                'url' => 'https://twitter.com/example'
            ],
            'reddit' => [
                'source' => 'r/pokemon Megapoll',
                'totalVotes' => 32140,
                'results' => [
                    'browt' => 25,
                    'pombon' => 38,
                    'gecqua' => 37
                ],
                'date' => '2026-02-20',
                'url' => 'https://reddit.com/r/pokemon'
            ],
            'youtube' => [
                'source' => 'PokéTubers Community Survey',
                'totalVotes' => 28560,
                'results' => [
                    'browt' => 30,
                    'pombon' => 40,
                    'gecqua' => 30
                ],
                'date' => '2026-02-25',
                'influencers' => ['Verlisify', 'Pokémon Challenges', 'Austin John Plays']
            ],
            'serebii' => [
                'source' => 'Serebii.net Official Poll',
                'totalVotes' => 25890,
                'results' => [
                    'browt' => 22,
                    'pombon' => 45,
                    'gecqua' => 33
                ],
                'date' => '2026-02-28',
                'url' => 'https://serebii.net'
            ],
            'bulbapedia' => [
                'source' => 'Bulbapedia Community',
                'totalVotes' => 18340,
                'results' => [
                    'browt' => 27,
                    'pombon' => 39,
                    'gecqua' => 34
                ],
                'date' => '2026-03-01',
                'url' => 'https://bulbapedia.bulbagarden.net'
            ]
        ];
        
        $this->saveToCache($cacheKey, $pollsData);
        
        return [
            'success' => true,
            'data' => $pollsData,
            'cached' => false
        ];
    }
    
    /**
     * Fetch datos de Reddit (simulado)
     */
    private function fetchReddit() {
        $cacheKey = 'reddit_data';
        
        // En producción real, usarías la API de Reddit
        // Por ahora, datos simulados
        $redditData = [
            'posts' => [
                [
                    'title' => 'Gen 10 Starter Poll - Which one are you choosing?',
                    'subreddit' => 'r/pokemon',
                    'upvotes' => 15234,
                    'comments' => 3421,
                    'topComment' => 'Pombon looks amazing! Fire starters always win',
                    'results' => ['browt' => 25, 'pombon' => 38, 'gecqua' => 37]
                ],
                [
                    'title' => 'Indonesia region starters discussion',
                    'subreddit' => 'r/PokemonScarletViolet',
                    'upvotes' => 8932,
                    'comments' => 1876,
                    'sentiment' => 'Positive towards Fire type'
                ]
            ],
            'overall_sentiment' => [
                'browt' => 'Cute but underrated',
                'pombon' => 'Most popular and hyped',
                'gecqua' => 'Interesting design, growing popularity'
            ]
        ];
        
        return [
            'success' => true,
            'data' => $redditData
        ];
    }
    
    /**
     * Fetch datos de Wikipedia
     */
    private function fetchWikipedia() {
        $topic = $_GET['topic'] ?? 'Pokemon';
        $cacheKey = 'wikipedia_' . $topic;
        
        // Verificar caché
        $cached = $this->getFromCache($cacheKey);
        if ($cached !== null) {
            return ['success' => true, 'data' => $cached, 'cached' => true];
        }
        
        // Fetch desde Wikipedia API
        $url = "https://en.wikipedia.org/api/rest_v1/page/summary/" . urlencode($topic);
        $data = $this->makeRequest($url);
        
        if ($data) {
            $this->saveToCache($cacheKey, $data);
            return ['success' => true, 'data' => $data, 'cached' => false];
        }
        
        return $this->error('Error al obtener datos de Wikipedia');
    }
    
    /**
     * Fetch datos de tendencias (simulado - Google Trends alternativa)
     */
    private function fetchTrends() {
        $cacheKey = 'trends_data';
        
        // Verificar caché
        $cached = $this->getFromCache($cacheKey);
        if ($cached !== null) {
            return ['success' => true, 'data' => $cached, 'cached' => true];
        }
        
        // Datos simulados de tendencias de búsqueda
        $trendsData = [
            'browt' => [
                'searchVolume' => 15000,
                'trend' => 'rising',
                'interest' => 65,
                'growthRate' => '+12%',
                'peakMonth' => 'February 2026',
                'relatedSearches' => [
                    'pokemon grass starter gen 10',
                    'browt evolution',
                    'bird pokemon indonesia',
                    'bean pokemon'
                ],
                'geographicInterest' => [
                    'Indonesia' => 85,
                    'USA' => 62,
                    'Japan' => 70,
                    'UK' => 58
                ]
            ],
            'pombon' => [
                'searchVolume' => 28000,
                'trend' => 'stable',
                'interest' => 82,
                'growthRate' => '+5%',
                'peakMonth' => 'January 2026',
                'relatedSearches' => [
                    'pokemon fire starter gen 10',
                    'pombon evolution',
                    'dog pokemon fire',
                    'puppy pokemon'
                ],
                'geographicInterest' => [
                    'Indonesia' => 90,
                    'USA' => 80,
                    'Japan' => 85,
                    'UK' => 75
                ]
            ],
            'gecqua' => [
                'searchVolume' => 22000,
                'trend' => 'rising',
                'interest' => 73,
                'growthRate' => '+18%',
                'peakMonth' => 'March 2026',
                'relatedSearches' => [
                    'pokemon water starter gen 10',
                    'gecqua evolution',
                    'gecko pokemon',
                    'indonesia water pokemon'
                ],
                'geographicInterest' => [
                    'Indonesia' => 95,
                    'USA' => 70,
                    'Japan' => 75,
                    'UK' => 68
                ]
            ],
            'overall' => [
                'totalSearches' => 65000,
                'mostSearchedTerm' => 'pokemon gen 10 starters',
                'competingInterest' => [
                    'pombon' => 43,
                    'gecqua' => 34,
                    'browt' => 23
                ]
            ]
        ];
        
        $this->saveToCache($cacheKey, $trendsData);
        
        return [
            'success' => true,
            'data' => $trendsData,
            'cached' => false
        ];
    }
    
    /**
     * Hacer request HTTP
     */
    private function makeRequest($url) {
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_USERAGENT, USER_AGENT);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        curl_close($ch);
        
        if ($httpCode === 200 && $response) {
            return json_decode($response, true);
        }
        
        return null;
    }
    
    /**
     * Obtener desde caché
     */
    private function getFromCache($key) {
        if (!$this->cacheEnabled) {
            return null;
        }
        
        $cacheFile = CACHE_DIR . md5($key) . '.json';
        
        if (file_exists($cacheFile)) {
            $cacheTime = filemtime($cacheFile);
            
            if ((time() - $cacheTime) < CACHE_DURATION) {
                $data = file_get_contents($cacheFile);
                return json_decode($data, true);
            }
        }
        
        return null;
    }
    
    /**
     * Guardar en caché
     */
    private function saveToCache($key, $data) {
        if (!$this->cacheEnabled) {
            return false;
        }
        
        $cacheFile = CACHE_DIR . md5($key) . '.json';
        $jsonData = json_encode($data, JSON_PRETTY_PRINT);
        
        return file_put_contents($cacheFile, $jsonData) !== false;
    }
    
    /**
     * Error response
     */
    private function error($message) {
        http_response_code(400);
        return [
            'success' => false,
            'error' => $message
        ];
    }
}

// Ejecutar fetcher
try {
    $fetcher = new APIFetcher();
    $result = $fetcher->handleRequest();
    echo json_encode($result, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
?>
