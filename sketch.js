
let imagen;
let x = 20;
let y = 20;
let filtroActivo = null;

function preload() {
  imagen = loadImage(
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600"
  );
}

function setup() {
  const lienzo = createCanvas(
    Math.min(windowWidth - 40, 900),
    550
  );

  lienzo.parent("canvas-container");
  noLoop();
}

function draw() {
  background(20, 25, 40);

  const mitad = width / 2;
  const margen = 15;

  dibujarImagen(
    imagen,
    x,
    y,
    mitad - margen * 2,
    height - margen * 2
  );

  dibujarImagen(
    imagen,
    mitad + x,
    y,
    mitad - margen * 2,
    height - margen * 2
  );

  if (filtroActivo !== null) {
    filter(filtroActivo);
  }
}

function dibujarImagen(img, px, py, anchoMax, altoMax) {
  if (!img || !img.width || !img.height) return;

  const escala = Math.min(
    anchoMax / img.width,
    altoMax / img.height
  );

  const ancho = img.width * escala;
  const alto = img.height * escala;

  image(img, px, py, ancho, alto);
}

function keyTyped() {
  if (key.toLowerCase() === "f") {
    const filtros = [
      GRAY,
      INVERT,
      POSTERIZE,
      BLUR,
      THRESHOLD
    ];

    filtroActivo = random(filtros);
    redraw();
  }

  if (key.toLowerCase() === "r") {
    filtroActivo = null;
    redraw();
  }

  return false;
}

function keyPressed() {
  const paso = 15;

  if (keyCode === LEFT_ARROW) {
    x -= paso;
  } else if (keyCode === RIGHT_ARROW) {
    x += paso;
  } else if (keyCode === UP_ARROW) {
    y -= paso;
  } else if (keyCode === DOWN_ARROW) {
    y += paso;
  } else {
    return;
  }

  redraw();
  return false;
}

function windowResized() {
  resizeCanvas(
    Math.min(windowWidth - 40, 900),
    550
  );
  redraw();
}
