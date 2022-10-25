//Variables inicializadas
const rango = 120;
const ratio = 10;
const sensibilidad = 60;

//Calculos
function getData() {
	let menuWithoutRepeatedElements = [...new Set(menu)];
	let lineas = '';
	menuWithoutRepeatedElements.forEach((itemId) => {
		let item = listAlimento.filter((food) => {
			return food.id === parseInt(itemId);
		});
		lineas += `${item[0].comida} - `;
	resultadoInsulina.innerText = calcular(totalHDC.innerText, glicemia.value);
	resultadoMenu.innerText = lineas
});
}



function calcular(hc, glic) {
	const resultado1 = (glic - rango) / sensibilidad;
	const resultado2 = hc / ratio;
	const resultadoFinal = resultado1 + resultado2;
	console.log(hc, glic);
	console.log(typeof hc, typeof glic);

	console.log(menuList.innerText);
	console.log(totalHDC);
	console.log(resultadoFinal);

	return  Math.round(resultadoFinal);
}

render(listAlimento)
renderMenu();

