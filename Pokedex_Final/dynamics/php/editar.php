<?php
require "config.php";
$conexion = connect();

if (!$conexion) {
  echo "No se pudo conectar con la base de datos.";
} else {
  // Cambiar el método de obtención del id_pokemon a POST
  $id_pokemon = (isset($_POST["id"]) && $_POST["id"] != "") ? $_POST["id"] : false;

  $nombre = (isset($_POST["nombre"]) && $_POST["nombre"] != "") ? $_POST["nombre"] : false;
  $altura = (isset($_POST["altura"]) && $_POST["altura"] != "") ? $_POST["altura"] : false;
  $peso = (isset($_POST["peso"]) && $_POST["peso"] != "") ? $_POST["peso"] : false;
  $exp_base = (isset($_POST["exp_base"]) && $_POST["exp_base"] != "") ? $_POST["exp_base"] : false;
  $tipo = (isset($_POST["tipo"]) && $_POST["tipo"] != "") ? $_POST["tipo"] : false;

  if ($id_pokemon && $nombre && $altura && $peso && $exp_base && $tipo) {
    $sql = "UPDATE pokemon SET pok_name = '$nombre', pok_height = '$altura', pok_weight = '$peso', pok_base_experience = '$exp_base' WHERE pok_id = '$id_pokemon'";
    $res = mysqli_query($conexion, $sql);

    $sql2 = "UPDATE pokemon_types SET type_id = '$tipo' WHERE pok_id = '$id_pokemon' AND slot = 1";
    $res2 = mysqli_query($conexion, $sql2);

    if ($res && $res2) {
      echo json_encode(array("ok" => true, "mensaje" => "Pokémon actualizado."));
    } else {
      echo json_encode(array("ok" => false, "mensaje" => "Error al actualizar el Pokémon."));
    }
  } else {
    echo json_encode(array("ok" => false, "mensaje" => "Datos de Pokémon no válidos."));
  }
}
?>