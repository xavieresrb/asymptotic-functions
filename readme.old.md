ts-loader is required, otherwise you will get an error when trying to compile main.ts in document.getElementById() line.

```
ERROR in ./src/main.ts 10:12
Module parse failed: Unexpected token (10:12)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|
| // get the canvas DOM element
> const canvas: any = document.getElementById('renderCanvas');
|
| // load the 3D engine

```

Cosas buenas:
typescript + es6 + babylon + no da errores de ningun tipo

watch para autocompilar
Ojo! Importante el valor de webpack.config.js publicPath. Mirar https://stackoverflow.com/questions/41094833/how-to-make-webpack-typescript-react-webpack-dev-server-configuration-for-auto-b

Cosas que faltan:

eslint

npm install eslint-config-airbnb-typescript eslint-plugin-import@^2.18.2 @typescript-eslint/eslint-plugin@^2.7.0 --save-dev
