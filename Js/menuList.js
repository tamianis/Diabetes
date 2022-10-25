function controlAlimento(id,comida, hdc, img) {
  this.id = parseInt(id);
  this.comida = comida;
  this.hdc = hdc;
  this.img = img
}

let alimento1 = new controlAlimento(1, "Cereales con leche", 35);
let alimento2 = new controlAlimento(2, "Frutos secos con yogurth", 10);
let alimento3 = new controlAlimento(3, "Café con tostadas", 27);
let alimento4 = new controlAlimento(4, "Mix de frutas", 30);
let alimento5 = new controlAlimento(5, "Barra de cereal", 15);
let alimento6 = new controlAlimento(6, "Frutos seco con frutas",20);
let alimento7 = new controlAlimento(7,"Papas fritas con carne",40);
let alimento8 = new controlAlimento(8, "Empanada", 50);
let alimento9 = new controlAlimento(9, "Pizza", 40);
let alimento10 = new controlAlimento(10, "Fideos con pesto", 45);
let alimento11 = new controlAlimento(11, "Panqueques", 25);
let alimento12 = new controlAlimento(12, "Queque vainilla", 35);
let alimento13 = new controlAlimento(13, "Pan con huevo y tomate",45);
let alimento14 = new controlAlimento(14,"Mix de ensalada con pollo",10);
let alimento15 = new controlAlimento(15, "Tortilla de verduras", 30);
let alimento16 = new controlAlimento(16,"Arroz con pavo y verduras",40);
let alimento17 = new controlAlimento(17,"Fideos con salsa de tomate",45);
let alimento18 = new controlAlimento(18, "Pie de Limón", 55);



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
