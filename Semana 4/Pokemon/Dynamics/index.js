// Elementos

const tiposElementales = [
    'Bicho', 'Dragón', 'Eléctrico', 'Hada', 'Lucha', 'Fuego', 'Volador',
    'Fantasma', 'Planta', 'Tierra', 'Hielo', 'Normal', 'Veneno',
    'Psíquico', 'Roca', 'Acero', 'Agua'
  ];
  
  // Pokémón

  class Pokemon {
    constructor(nombre, nivel, tipos, estadisticas, movimientos) {
      this.nombre = nombre;
      this.nivel = nivel;
      this.tipos = tipos;
      this.estadisticas = estadisticas;
      this.movimientos = movimientos;
    }
  }
  
  // Entrenadores Pokémon

  class Entrenador {
    constructor(nombre, region, medallas, equipo) {
      this.nombre = nombre;
      this.region = region;
      this.medallas = medallas;
      this.equipo = equipo;
    }
  }
  
  // Movimientos Pokémon

  class Movimiento {
    constructor(nombre, potencia, probabilidad, tipo) {
      this.nombre = nombre;
      this.potencia = potencia;
      this.probabilidad = probabilidad;
      this.tipo = tipo;
    }
  }
  
  //Daño 

  function calcularDaño(atacante, defensor, movimiento) {
    const nivel = atacante.nivel;
    const ataque = atacante.estadisticas.ataque;
    const ataqueEspecial = atacante.estadisticas.ataqueEspecial;
    const defensa = defensor.estadisticas.defensa;
    const defensaEspecial = defensor.estadisticas.defensaEspecial;
    const potencia = movimiento.potencia;
  
    let daño;
    if (movimiento.tipo === 'Físico') {
      daño = ((0.2 * nivel + 1) * ataque * potencia) / (25 * defensa);
    } else if (movimiento.tipo === 'Especial') {
      daño = ((0.2 * nivel + 1) * ataqueEspecial * potencia) / (25 * defensaEspecial);
    }
  
    return Math.floor(0.01 * 85 * daño);
  }
  
  // Simulador de batalla

  function batalla(entrenador1, entrenador2) {
    let pokemon1 = entrenador1.equipo[0];
    let pokemon2 = entrenador2.equipo[0];
  
    console.log(`¡Batalla Pokémon entre ${entrenador1.nombre} y ${entrenador2.nombre}!`);
    console.log(`${entrenador1.nombre} envía a ${pokemon1.nombre}`);
    console.log(`${entrenador2.nombre} envía a ${pokemon2.nombre}`);
  
    while (pokemon1.estadisticas.vida > 0 && pokemon2.estadisticas.vida > 0) {

      // Turno del entrenador 1

      const movimiento1 = pokemon1.movimientos[Math.floor(Math.random() * pokemon1.movimientos.length)];
      const daño1 = calcularDaño(pokemon1, pokemon2, movimiento1);
      pokemon2.estadisticas.vida -= daño1;
      console.log(`${pokemon1.nombre} usó ${movimiento1.nombre} y causó ${daño1} puntos de daño a ${pokemon2.nombre}`);
  
      // Turno del entrenador 2

      const movimiento2 = pokemon2.movimientos[Math.floor(Math.random() * pokemon2.movimientos.length)];
      const daño2 = calcularDaño(pokemon2, pokemon1, movimiento2);
      pokemon1.estadisticas.vida -= daño2;
      console.log(`${pokemon2.nombre} usó ${movimiento2.nombre} y causó ${daño2} puntos de daño a ${pokemon1.nombre}`);
    }
  
    if (pokemon1.estadisticas.vida <= 0) {
      console.log(`${pokemon1.nombre} de ${entrenador1.nombre} ha sido derrotado. ${entrenador2.nombre} es el ganador.`);
      entrenador1.equipo.shift();
    } else {
      console.log(`${pokemon2.nombre} de ${entrenador2.nombre} ha sido derrotado. ${entrenador1.nombre} es el ganador.`);
      entrenador2.equipo.shift();
    }
  }
  
  // Movimientos

  const movimiento1 = new Movimiento('Placaje', 40, 100, 'Físico');
  const movimiento2 = new Movimiento('Lanzallamas', 90, 80, 'Especial');
  const movimiento3 = new Movimiento('Rayo Solar', 120, 75, 'Especial');
  const movimiento4 = new Movimiento('Terremoto', 100, 100, 'Físico');
  
  // Creación de los Pokémon

  const pokemon1 = new Pokemon('Charizard', 100, ['Fuego', 'Volador'], {
    vida: 360,
    ataque: 293,
    ataqueEspecial: 328,
    defensa: 280,
    defensaEspecial: 284,
    velocidad: 328
  }, [movimiento1, movimiento2, movimiento3, movimiento4]);
  
  const pokemon2 = new Pokemon('Blastoise', 100, ['Agua'], {
    vida: 362,
    ataque: 291,
    ataqueEspecial: 328,
    defensa: 328,
    defensaEspecial: 322,
    velocidad: 284
  }, [movimiento1, movimiento2, movimiento3, movimiento4]);
  
  const pokemon3 = new Pokemon('Venusaur', 100, ['Planta', 'Veneno'], {
    vida: 364,
    ataque: 292,
    ataqueEspecial: 328,
    defensa: 328,
    defensaEspecial: 322,
    velocidad: 280
  }, [movimiento1, movimiento2, movimiento3, movimiento4]);
  
  const pokemon4 = new Pokemon('Pikachu', 100, ['Eléctrico'], {
    vida: 302,
    ataque: 207,
    ataqueEspecial: 230,
    defensa: 166,
    defensaEspecial: 186,
    velocidad: 350
  }, [movimiento1, movimiento2, movimiento3, movimiento4]);
  
  // Creación de los entrenadores

  const entrenador1 = new Entrenador('Ash', 'Agatha', 8, [pokemon1, pokemon2]);
  const entrenador2 = new Entrenador('Débora', 'Roco', 10, [pokemon3, pokemon4]);
  
  //Simulación de la batalla

  batalla(entrenador1, entrenador2);