<?php
class Carrusel {
    private $capital;
    private $pais;
    
    public function __construct($capital, $pais) {
        $this->capital = $capital;
        $this->pais = $pais;
    }

    public function carrusel() {
        $flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags={$this->pais},{$this->capital}&tagmode=any&format=json";
        $result = file_get_contents($flickrAPI);
        if($result === false) {
            echo "<p>Error: No se obtuvo respuesta a la llamada a la API de Flickr</p>";
        }
        $decodedResult = json_decode(substr($result, 1, -1), true);
        if(!isset($decodedResult["items"])) {
            echo "<p>Error: No se decodificó el resultado correctamente</p>";
        }
        $photos = [];
        foreach($decodedResult["items"] as $photo) {
            //$photos[] = str_replace("_m", "_b", $photo["media"]["m"]); //Calidad alta
            $photos[] = $photo["media"]["m"]; //Calidad baja
        }
        $photos10 = array_slice($photos, 0, 10);
        $counter = 1;
        foreach($photos10 as $photo) {
            echo "<img src='$photo' alt='Fotografía de {$this->capital}, {$this->pais} número {$counter} del carrusel'/>";
            $counter++;
        }
    }
}

class Moneda {
    private $monedaCambio;
    private $monedaLocal;

    public function __construct($monedaCambio, $monedaLocal) {
        $this->monedaCambio = $monedaCambio;
        $this->monedaLocal = $monedaLocal;
    }

    public function mostrarCambio()
    {
        $api = "https://open.er-api.com/v6/latest/{$this->monedaCambio}";

        $result = file_get_contents($api);

        if ($result === false) {
            return null;
        }

        $decodedResult = json_decode($result, true);

        if (!$decodedResult || !isset($decodedResult['rates'][$this->monedaLocal])) {
            echo "<p>No se pudo obtener el cambio de moneda</p>";
        }
        $cambio = $decodedResult['rates'][$this->monedaLocal];
        echo "<h4>Cambio de Euros({$this->monedaCambio}) a Dólares estadounidenses({$this->monedaLocal})</h4>";
        echo "<p>1 {$this->monedaCambio} equivale a {$cambio} {$this->monedaLocal}</p>";
    }

    public function mostrarCambioInverso()
    {
        $api = "https://open.er-api.com/v6/latest/{$this->monedaLocal}";

        $result = file_get_contents($api);

        if ($result === false) {
            return null;
        }

        $decodedResult = json_decode($result, true);

        if (!$decodedResult || !isset($decodedResult['rates'][$this->monedaCambio])) {
            echo "<p>No se pudo obtener el cambio de moneda</p>";
        }
        $cambio = $decodedResult['rates'][$this->monedaCambio];
        echo "<h4>Cambio de Dólares estadounidenses({$this->monedaLocal}) a Euros({$this->monedaCambio})</h4>";
        echo "<p>1 {$this->monedaLocal} equivale a {$cambio} {$this->monedaCambio}</p>";
    }
}

echo '<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Marcos Argüelles Rivera"/>
    <meta name="description" content="Apartado de viajes de F1 Desktop"/>
    <meta name="keywords" content="viajes,f1"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>F1 Desktop: Viajes</title>
    <link rel="icon" type="image/icon" href="multimedia/imagenes/f1.png">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>
    <script src="js/viajes.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
        crossorigin="anonymous"></script>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGGEsBmw72XKrpCtXAzTrtAqEKpKzd2kI"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">F1 Desktop</a></h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="calendario.html">Calendario</a>
            <a href="circuito.html">Circuito</a>
            <a href="juegos.html">Juegos</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="noticias.html">Noticias</a>
            <a href="piloto.html">Piloto</a>
            <a class="active" href="viajes.php">Viajes</a>
        </nav>
    </header>
    <p><a href="index.html">F1 Desktop</a> >> Viajes</p>
    <main lang="en">
        <h2>Viajes</h2>
        <aside>
            <article>
                <h3>Carrusel de imágenes</h3>';
$carrusel = new Carrusel("Vegas", "USA");
$carrusel->carrusel();
echo '          <button> > </button>
                <button> < </button>
            </article>
        </aside>
        <aside>
            <h3>Cambio de moneda</h3>';
$moneda = new Moneda("EUR", "USD");
$moneda->mostrarCambio();
$moneda->mostrarCambioInverso();
echo '  </aside>
    </main>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            initMap();
        });
    </script>
</body>
</html>';
?>