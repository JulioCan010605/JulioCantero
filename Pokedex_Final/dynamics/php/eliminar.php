<?php
require "config.php";
$conexion = connect();

if (!$conexion) {
  echo "No se pudo conectar con la base de datos.";
} else {
  $id_pokemon = (isset($_GET["id"]) && $_GET["id"] != "") ? $_GET["id"] : false;

  if ($id_pokemon) {
    // Borrar de la tabla pokemon_evolution
    $sql = "DELETE FROM pokemon_evolution WHERE evol_id IN 
      (SELECT evol_id FROM pokemon_evolution INNER JOIN
       pokemon_evolution_matchup ON pokemon_evolution.evolved_species_id = 
       pokemon_evolution_matchup.pok_id WHERE pok_id = '$id_pokemon')";
    $res = mysqli_query($conexion, $sql);

    if ($res) {
      $tablasConectadas = ["base_stats", "pokemon_types", "pokemon_abilities", "pokemon_moves"];

      // Borrar de las tablas conectadas
      foreach ($tablasConectadas as $tabla) {
        $sql = "DELETE FROM $tabla WHERE pok_id = '$id_pokemon'";
        $res = mysqli_query($conexion, $sql);
        if (!$res) {
          echo json_encode(array("ok" => false, "mensaje" => "Error al eliminar el Pokémon de la tabla $tabla."));
          exit; 
        }
      }

      // Borrar de la tabla pokemon
      $sql = "DELETE FROM pokemon WHERE pok_id = '$id_pokemon'";
      $res = mysqli_query($conexion, $sql);

      if ($res) {
        echo json_encode(array("ok" => true, "mensaje" => "Pokémon eliminado."));
      } else {
        echo json_encode(array("ok" => false, "mensaje" => "Error al eliminar el Pokémon."));
      }
    } else {
      echo json_encode(array("ok" => false, "mensaje" => "Error al eliminar el Pokémon de la tabla pokemon_evolution."));
    }
  } else {
    echo json_encode(array("ok" => false, "mensaje" => "ID de Pokémon no válido."));
  }
}
?>