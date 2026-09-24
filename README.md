# Paddock

Tu universo de F1 25: Mundial, crónicas, quiosco de prensa, redes y palmarés.
App web para iPhone publicada con GitHub Pages. Funciona sin conexión.

## Archivos
- `index.html`: la app completa.
- `manifest.webmanifest`, `sw.js`, `icons/`: icono, pantalla completa y modo sin conexión.
- `datos-iniciales.json`: la temporada 1 tal y como iba (5 carreras, previa de Mónaco y calendario hasta Hungría).
- `logo-paddock.svg`, `logo-paddock-1024.png`: el logo en grande.

## Uso
- Botón **+**: anotar clasificación, carrera o sprint tocando a los pilotos en orden de llegada.
- Tus datos se guardan en el iPhone. Descarga una copia de seguridad desde Ajustes de vez en cuando.
- Al actualizar la app, sube el número de versión en `sw.js` (`paddock-v2` → `paddock-v3`).
