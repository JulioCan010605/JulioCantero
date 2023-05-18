<!DOCTYPE html>
<html>
<head>
    <title>TickWebMaster</title>
    <link rel="icon" href="./Boletos.ico" type="image/x-icon">
    <link rel="stylesheet" href="../Statics/Styles/Styles.css">
</head>
<body>

<h2>Gracias por tu compra, disfruta de tus boletos</h2>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $zona = $_POST['zona'];
    $boletos = intval($_POST['boletos']);
    $artista = $_POST['artista'];
    $fecha = $_POST['fecha'];
    $lugar = $_POST['lugar'];
    $extras = isset($_POST['extras']) ? $_POST['extras'] : [];

    // Validar los valores ingresados
    $errores = [];
    if ($nombre === '') {
        $errores[] = 'Falta especificar el nombre.';
    }
    if ($apellido === '') {
        $errores[] = 'Falta especificar el apellido.';
    }
    if ($zona === 'zona0') {
        $errores[] = 'Falta especificar la zona.';
    }
    if ($boletos <= 0) {
        $errores[] = 'La cantidad de boletos debe ser mayor a cero.';
    }
    if ($artista === 'artista0') {
        $errores[] = 'Falta especificar el artista.';
    }
    if ($fecha === '') {
        $errores[] = 'Falta especificar la fecha.';
    }
    if ($lugar === 'lugar0') {
        $errores[] = 'Falta especificar el lugar.';
    }

    // Imprimir errores si existen
    if (!empty($errores)) {
        echo '<div style="color: red; margin-bottom: 10px;">';
        echo 'Corrige los siguientes errores:<br>';
        foreach ($errores as $error) {
            echo '- ' . $error . '<br>';
        }
        echo '</div>';
    } else {
        // Imprimir la tabla con los boletos
        echo '<table>';
        echo '<tr>';
        echo '<th>Cantidad de boletos</th>';
        echo '<th>Datos personales</th>';
        echo '<th>Información del evento</th>';
        echo '</tr>';

        // Imprimir boletos
        $boletos_imprimir = min($boletos, 15); // Limitar a 15 boletos como máximo
        $boletos_faltantes = $boletos - $boletos_imprimir;
        for ($i = 0; $i < $boletos_imprimir; $i++) {
            echo '<tr>';
            echo '<td>Boleto #' . ($i + 1) . '</td>';
            echo '<td>';
            echo 'Nombre: ' . $nombre . ' ' . $apellido . '<br>';
            echo 'Zona: ' . getZonaNombre($zona) . '<br>';
            if (!empty($extras)) {
                echo 'Extras: ';
                foreach ($extras as $extra) {
                    echo getExtraNombre($extra) . ', ';
                }
                echo '<br>';
            } else {
                echo 'Extras: sin extras<br>';
            }
            echo '</td>';
            echo '<td>';
            echo 'Artista: ' . getArtistaNombre($artista) . '<br>';
            echo 'Fecha: ' . $fecha . '<br>';
            echo 'Lugar: ' . getLugarNombre($lugar) . '<br>';
            echo '<img class="imagen" src="../Statics/Images/imagen_' . $zona . '.jpg" alt="Zona"><br>'; // Agregar imagen de la zona
            echo '<img class="imagen" src="../Statics/Images/imagen_' .$artista. '.jpg" alt="Artista1"><br>'; // Agregar imagen del artista
            echo '<img class="imagen" src="../Statics/Images/imagen_' . $lugar . '.jpg" alt="Lugar"><br>'; // Agregar imagen del lugar
            echo 'Frase característica del artista: ' . getFraseArtista($artista) . '<br>'; // Agregar frase característica del artista
            echo '</td>';
            echo '</tr>';
        }

        echo '</table>';

        // Imprimir mensaje de boletos faltantes, si existen
        if ($boletos_faltantes > 0) {
            echo '<p style="color: red;">Faltaron por imprimir ' . $boletos_faltantes . ' boletos.</p>';
        }
    }
}

// Función para obtener el nombre de la zona según su código
function getZonaNombre($codigo)
{
    switch ($codigo) {
        case 'zona1':
            return 'Zona VIP';
        case 'zona2':
            return 'Zona Oro';
        case 'zona3':
            return 'Zona Barrera General';
        case 'zona4':
            return 'Zona General';
        default:
            return '';
    }
}

// Función para obtener el nombre del artista según su código
function getArtistaNombre($codigo)
{
    switch ($codigo) {
        case 'artista1':
            return 'Billie Eilish';
        case 'artista2':
            return 'Dua Lipa';
        case 'artista3':
            return 'Bad Bunny';
        case 'artista4':
            return 'Taylor Swift';
        default:
            return '';
    }
}

// Función para obtener el nombre del lugar según su código
function getLugarNombre($codigo)
{
    switch ($codigo) {
        case 'lugar1':
            return 'Arena Ciudad de Mexico';
        case 'lugar2':
            return 'Foro Sol';
        case 'lugar3':
            return 'Auditorio Nacional';
        case 'lugar4':
            return 'Palacio de los Deportes';
        default:
            return '';
    }
}

// Función para obtener el nombre del extra según su código
function getExtraNombre($codigo)
{
    switch ($codigo) {
        case 'extra1':
            return 'Paquete de bebidas y comida';
        case 'extra2':
            return 'Toma de foto con artista';
        case 'extra3':
            return 'Estacionamiento';
        default:
            return '';
    }
}

// Función para obtener la frase característica del artista según su código
function getFraseArtista($codigo)
{
    switch ($codigo) {
        case 'artista1':
            return '"No puedo darme el lujo de odiarme a mí misma, no tengo tiempo para eso."';
        case 'artista2':
            return '"Quiero que mi música haga sentir a la gente poderosa y confiada."';
        case 'artista3':
            return '"La música es mi forma de expresar mis emociones y mis pensamientos más profundos."';
        case 'artista4':
            return '"Escribir canciones es mi forma de procesar mis experiencias y emociones."';
        default:
            return '';
    }
}
?>
</body>
</html>