I am not 100% sure this is specifically a react-google-maps bug. But, the release of the "latest" Google Maps API version 3.34 caused my working code to break. Please see this repo for a demonstration of the "error".

The map renders on first "mount", but subsequent mounts do not render the map.

https://github.com/pxlpotion/react-google-maps-error-demo

```
yarn
yarn start
```
All relevant code is in src/App.js and public/index.html. Simply start the app and view the index, which has some explanation and a demo of the "error"
