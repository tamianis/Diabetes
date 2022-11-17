const contenidoMenu = document.getElementById("contenidoMenu");
let menuList = document.getElementById("menuDia");
let resultadoInsulina = document.getElementById("dosis");
let resultadoMenu = document.getElementById("menuFinal");
let totalHDC = document.getElementById("total");
let botonElim = document.getElementById("boton-eliminar");

async function fetchAlimentos() {
	let listAlimento = [];

	const res = await fetch("../data.json");
	listAlimento = await res.json();

	//Filtro
	let comidaElegida = "";

	let comidas = document.getElementById("comidas");
	comidas.addEventListener("change", () => {
		comidaElegida = comidas.value;
	});

	let botonFiltro = document.getElementById("botonMenu");
	botonFiltro.addEventListener("click", filtrado);

	let inputFilter = document.getElementById("comidas");
	inputFilter.addEventListener("keyup", filtrado);

	let listado = document.getElementById("contenidoMenu");

	function filtrado() {
		listado.innerHTML = "";
		let opcionSegunComida = listAlimento;
		if (comidas.value) {
			opcionSegunComida = listAlimento.filter((alimento) =>
				alimento.comida
					.toLocaleUpperCase()
					.includes(comidaElegida.toLocaleUpperCase())
			);
			console.log(opcionSegunComida);
		}
		render(opcionSegunComida);
	}

	let botonGlicemia = document.getElementById("botonGlic");
	botonGlicemia.addEventListener("click", getData);

	let menu = cargarMenuStorage() || [];

	botonElim.addEventListener("click", () => {
		menu = [];
		menuList.innerHTML = "";
		totalHDC.innerText = 0;
		resultadoInsulina.innerHTML = "";
		resultadoMenu.innerHTML = "";
		glicemia.value = "";
		ratio.value = "";
		sensibilidad.value = "";
		rango.value = "";
		localStorage.clear("menu");
		Swal.fire({
			title: "Ha borrado su menú.",
			icon: "success",
		});
	});

	// function eliminarBoton() {
	// 	menu = [];
	// 	menuList.innerHTML = "";
	// 	totalHDC.innerText = 0;
	// 	glicemia.value = "";
	// 	localStorage.clear("menu");
	// }

	function render(listadoRenderAlimento) {
		listadoRenderAlimento.forEach((alimen) => {
			let contenedor = document.createElement("card");
			contenedor.className = "card border-0 transform-on-hover";
			contenedor.innerHTML = `<img src="${alimen.img}"><h4>${alimen.comida}</h4> <p> Hdc: ${alimen.hdc}</p>`;

			let agregar = document.createElement("button");
			agregar.className = "btn-card";
			agregar.innerText = `Agregar`;
			agregar.setAttribute("identificador", alimen.id);
			agregar.addEventListener("click", addComida);

			contenedor.append(agregar);
			contenidoMenu.append(contenedor);
			listado.append(contenedor);
		});
	}

	function addComida(e) {
		console.log(menu);
		menu.push(e.target.getAttribute("identificador"));
		renderMenu();
	}

	function renderMenu() {
		console.log(listAlimento);
		menuStorage();
		menuList.innerHTML = "";
		resultadoInsulina.innerHTML = "";
		resultadoMenu.innerHTML = "";
		let listaPlatos = [...new Set(menu)];

		// toma el primer id y lo busca en la lista (listAlimento) y filtra el alimento especifico con el id y busca el que coincida
		// y lo guarda en item
		listaPlatos.forEach((itemId) => {
			let item = listAlimento.filter((food) => {
				return food.id === parseInt(itemId);
			});
			let cantidad = menu.reduce((total, id) => {
				return id === itemId ? (total += 1) : total;
			}, 0);

			let list = document.createElement("table");
			list.className = "table";
			list.innerText = `${cantidad} - ${item[0].comida} ( hdc:  ${item[0].hdc} )`;

			let borrar = document.createElement("button");
			borrar.innerText = "x";
			borrar.className = "btborrar";
			borrar.dataset.item = itemId;
			borrar.addEventListener("click", borrarMenu);

			list.append(borrar);
			menuList.append(list);
		});

		totalHDC.innerText = calculateTotalHdc();
	}

	function calculateTotalHdc() {
		return menu.reduce((total, itemId) => {
			let item = listAlimento.filter((food) => {
				return food.id === parseInt(itemId);
			});
			return total + item[0].hdc;
		}, 0);
	}

	function borrarMenu(e) {
		let id = e.target.dataset.item;

		menu.splice(menu.indexOf(id), 1);
		renderMenu();
	}

	function menuStorage() {
		localStorage.setItem("menu", JSON.stringify(menu));
	}

	function cargarMenuStorage() {
		return JSON.parse(localStorage.getItem("menu"));
	}

	//Calculos
	function getData() {
		let menuWithoutRepeatedElements = [...new Set(menu)];
		let calc = "";
		menuWithoutRepeatedElements.forEach((itemId) => {
			let item = listAlimento.filter((food) => {
				return food.id === parseInt(itemId);
			});
			let cantidad = menu.reduce((total, id) => {
				return id === itemId ? (total += 1) : total;
			}, 0);
			calc += `${cantidad} ${item[0].comida}  `;
			resultadoInsulina.innerText = calcular(
				parseInt(totalHDC.innerText),
				parseInt(glicemia.value),
				parseInt(rango.value), 
				parseInt(ratio.value),
				parseInt(sensibilidad.value),
			);
			resultadoMenu.innerText = calc;
		});
	}

	function calcular(hc, glic, rango, ratio, sensibilidad) {
		const resultado1 = (glic - rango) / sensibilidad;
		const resultado2 = hc / ratio;
		const resultadoFinal = resultado1 + resultado2;
		console.log(hc, glic);
		console.log(typeof ratio, typeof glic);

		console.log(menuList.innerText);
		console.log(totalHDC);
		console.log(resultadoFinal);

		return Math.round(resultadoFinal);
	}

	render(listAlimento);
	renderMenu();

	return listAlimento;
}

fetchAlimentos();
