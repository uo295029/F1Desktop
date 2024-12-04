<?php
class Record {
    private $server;
    private $user;
    private $pass;
    private $dbname;
    
    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";
    }
}
echo '
<!DOCTYPE HTML>

<html lang="es">
    <head>
        <!-- Datos que describen el documento -->
        <meta charset="UTF-8" />
        <meta name="author" content="Marcos Argüelles Rivera"/>
        <meta name="description" content=""/>
        <meta name="keywords" content=","/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
        <title>F1 Desktop: Semáforo</title>
        <link rel="icon" type="image/icon" href="multimedia/imagenes/f1.png">
        <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
        <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>
        <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css"/>
        <script src="js/semaforo.js"></script>
    </head>
    <body>
        <!-- Datos con el contenidos que aparece en el navegador -->
        <header>
            <h1><a href="index.html">F1 Desktop</a></h1>
            <nav>
                <a href="calendario.html">Calendario</a>
                <a href="circuito.html">Circuito</a>
                <a class="active" href="juegos.html">Juegos</a>
                <a href="meteorologia.html">Meteorología</a>
                <a href="noticias.html">Noticias</a>
                <a href="piloto.html">Piloto</a>
                <a href="viajes.html">Viajes</a>
            </nav>
        </header>
        <p><a href="index.html">F1 Desktop</a> >> <a href="juegos.html">Juegos</a> >> Semáforo</p>
        <main>
            <nav>
                <a href="memoria.html">Memoria</a>
                <a href="semaforo.php">Semáforo</a>
            </nav>
            <script>
                semaforo = new Semaforo();
            </script>
        </main>
    </body>
    </html>'
?>