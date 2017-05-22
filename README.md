# Website

The repository for the latest iteration of [dustinschau.com][dustinschau]

## Tech Used

### Webpack

Build tool that allows for modularization, treating of non-JS files as a module (e.g. images, pug files, etc.), etc.

### [Particles.js][particlesjs]

An awesome library that allows for the particle effect seen in the header
Note: I forked the library [here][particlesjsfork] to allow to be imported as CommonJS among some other tweaks

### [ityped][ityped]

Library to allow for the typing effect in the header

### [Sass][sass]

"Syntactically Awesome Style Sheets," so I can use variables, mixins--I particularly like the color mixins, e.g. `mix(black, white, 50%)`, etc.

### [Pug][pug], formerly  Jade

Great HTML template language

### webp images, with jpeg fallback

Checkout [build/images.js](./build/images.js) for the build script

The JS in [src/modernizr.js](./src/modernizr.js) applies `webp` or `no-webp`, and then CSS selectors conditionally load the correct image

### Serverless AWS Lamda for the e-mail functionality, seen in [email-handler][emailhandler]

[dustinschau]: https://dustinschau.com
[particlesjs]: https://github.com/VincentGarreau/particles.js/
[particlesjsfork]: https://github.com/dschau/particles.js/
[ityped]: https://github.com/luisvinicius167/ityped
[sass]: http://sass-lang.com/
[pug]: https://pugjs.org/
[emailhandler]: https://github.com/DSchau/email-handler
