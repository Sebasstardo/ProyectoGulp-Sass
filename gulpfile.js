// require:trae o importa el archivo de gulp, exporta algunas dependencias
//Cuando hay { } es porq el paquete tiene muchas funciones
//src identifica un archivo, el archivo que yo quiero compilar es el siguiente...
//gulp-sass solo integra sass a css es su unica funcion con gulp, por eso no va con {}
//con dest se define donde se va a almacenar un archivo
//watch: cuando haya cambios que se vuelva a ejecutar una tarea
//parallel al igual que series, pero esta ejecuta todas al mismo tiempo

const { series, src, dest, watch, parallel } = require("gulp");
const gulpSass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

//Utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

//Version optimizada del css automaticamente
const cssnano = require("cssnano");

//Hace referencia al archivo original y podemos ir y hacer cambios en el scss
const sourcemaps = require("gulp-sourcemaps");

//Utilidades JS
const terser = require("gulp-terser-js");

const nodeSass = require("node-sass");
const sass = gulpSass(nodeSass);

//encuentra el archivo . aplicale sass. y almacenalo en la carpeta build
function compilarSASS() {
  return src("./src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./build/css"));
}

function javascript() {
  return src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest("./build/js"));
}

//minifica las imagenes
function imagenes() {
  return src("src/img/**/*")
    .pipe(imagemin())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Imagen Minificada" }));
}
//cuando haya un cambio en el " ", se compila. Esto lo hace AUTOMATICO sin necesidad de compilar
function watchArchi() {
  watch("src/scss/**/*.scss", compilarSASS); //* = la carpeta actual - **= todos los archivos con esa extension
  watch("src/js/**/*.js", javascript);
}
//formato webp a imagenes
function versionWebp() {
  return src("src/img/**/*")
    .pipe(webp())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Version webP lista" }));
}

exports.compilarSASS = compilarSASS;

exports.watchArchi = watchArchi;
exports.imagenes = imagenes;

exports.default = series(
  compilarSASS,
  javascript,
  imagenes,
  versionWebp,
  watchArchi
);
