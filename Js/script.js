/* Calcular dosis de insulina */
let flag = true;

alert("Bienvenido, si desea comer por favor quedese aquí!");

//Variables inicializadas
const rango = 120;
const ratio = 10;
const sensibilidad = 60;

function controlAlimento(id, plato, comida, hdc) {
  this.id = parseInt(id);
  this.plato = plato;
  this.comida = comida;
  this.hdc = hdc;
}
//Desayunos
let alimento1 = new controlAlimento(1,"Cereales con leche", "Desayuno", 35);
let alimento2 = new controlAlimento(2,"Frutos secos con yogurth","Desayuno",10);
let alimento3 = new controlAlimento(3,"Café con tostadas", "Desayuno", 27);

//Colacion
let alimento4 = new controlAlimento(1,"Mix de frutas", "Colacion", 30);
let alimento5 =  new controlAlimento(2,"Barra de cerela", "Colacion", 15);
let alimento6 =  new controlAlimento(3,"Frutos seco con frutas", "Colacion", 20);

//Almuerzos
let alimento7 = new controlAlimento(1,"Papas fritas con carne", "Almuerzo", 40);
let alimento8 =  new controlAlimento(2, "Empanada", "Almuerzo", 50);
let alimento9 = new controlAlimento(2, "Pizza", "Almuerzo", 40);
let alimento10 = new controlAlimento(4, "Fideos con pesto", "Almuerzo", 45);

//Once
let alimento11 = new controlAlimento(1, "Panqueques", "Once", 25);
let alimento12 = new controlAlimento(2, "Queque vainilla", "Once", 35);
let alimento13 = new controlAlimento(3, "Pan con huevo y tomate", "Once", 45);

//Cena
let alimento14 = new controlAlimento(1, "Mix de ensalada con pollo", "Cena", 10);
let alimento15 = new controlAlimento(2, "Pizza", "Almuerzo", "Cena", 40);
let alimento16 = new controlAlimento(3, "Tortilla de verduras", "Cena", 30);
let alimento17 = new controlAlimento(4, "Arroz con pavo y verduras", "Cena", 40);
let alimento18 = new controlAlimento(5,"Fideos con salsa de tomate", "Cena", 45);

let listAlimento = [
  alimento1,
  alimento2,
  alimento3,
  alimento4,
  alimento5,
  alimento6,
  alimento7,
  alimento8,
  alimento9,
  alimento10,
  alimento11,
  alimento12,
  alimento13,
  alimento14,
  alimento15,
  alimento16,
  alimento17,
  alimento18,
];

let listaNombre = [];

//Aca recorre la Array y tomo lo que vendria siendo "Comida" y ve para que no se muestre repetido
for (const alimen of listAlimento) {
  if (!listaNombre.includes(alimen.comida)) {
    listaNombre.push(alimen.comida);
  }
}

function getData() {
  let preguntaComida = confirm("¿Va a ingerir algún alimento?");
  if (preguntaComida) {
    while (flag) {
     let hrComida = prompt(
        "Elegir según la hora: \n - " + listaNombre.join("\n - ")
      );
      //Toma la opcion ingresada anteriormente y hace un filtro para mas adelante mostrar "platos", de esa hr de comida
      opcionesSegunHora = listAlimento.filter(
        (alimento) => alimento.comida === hrComida
      );
    
      let listMenu = [];
      for (const menu of opcionesSegunHora) {
        listMenu.push(menu.id + " : " + menu.plato);
      }
      tipoPlato = parseInt(prompt(
        "¿Qué desea comer (escoja un número): \n - " + listMenu.join("\n - ")
      ));

      opcionMenu = opcionesSegunHora.filter(
        (comer) => comer.id === tipoPlato)[0];
        
      console.log(opcionMenu);

      glicemia = parseInt(prompt("Ingrese su nivel de glicemia: "));
      calcular(opcionMenu.hdc, glicemia);
      }
  } else {
    alert("Muchas gracias, espero que mas tarde si quiera comer!.");
  }
  flag = true;
}

//Aqui es donde se aplican los calculos, segun los valores ingresados mas las variables
function calcular(hc, glic) {
  const resultado1 = (glic - rango) / sensibilidad;
  const resultado2 = hc / ratio;
  const resultadoFinal = resultado1 + resultado2;
  console.log(hc,glic)
  console.log(typeof hc, typeof glic)
  if (isNaN(resultadoFinal)) {
    alert("Los datos ingresados no son validos.");
  } else {
    alert(
      "Primer calculo: " +
        resultado1 +
        "\nSegundo Calculo:  " +
        resultado2 +
        "\nResultado final: " +
        Math.round(resultadoFinal)
    );
    alert("Usted va a comer: " + opcionMenu.plato + "\nde Carbohidratos tiene: " +opcionMenu.hdc + "\npor lo cual su dosis de insulina es: " + Math.round(resultadoFinal)
    );
    flag = false;
  }
}
