/* Calcular dosis de insulina */
let flag = true;

alert("Bienvenido, si desea comer por favor quedese aquí!");

//Variables inicializadas
const rango = 120
const ratio = 10
const sensibilidad = 60



function getData() {
  let preguntaComida = confirm("¿Va a ingerir algun alimento?");
  if (preguntaComida) {
    while (flag) {
      hidratosdeCarbono = parseInt(
        prompt("Por favor ingrese cuanto Hidratos de carbono va a consumir: ")
      );
      glicemia = parseInt(prompt("Ingrese su nivel de glicemia: "));
      calculate(hidratosdeCarbono, glicemia);
    }
  } else {
    alert("Muchas gracias, espero que mas tarde si desee alimentarse.");
  }
  flag = true;
}

//Aqui es donde se aplican los calculos, segun los valores ingresados mas las variables
function calculate(hC, glic) {
  const resultado1 = (glic - rango) / sensibilidad;
  const resultado2 = hC / ratio;
  const resultadoFinal = resultado1 + resultado2;
  if (isNaN(resultadoFinal)) {
    alert("Los datos ingresados no son validos.");
  } else {
    alert("Primer calculo: " + resultado1 + "\nSegundo Calculo:  " + resultado2 + "\nResultado final: "+ Math.round(resultadoFinal));
    alert("La dosis de insulina que debe aplicarse es de: " +  Math.round(resultadoFinal));
    flag = false;
  }
}
