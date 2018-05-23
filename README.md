# Static Boilerplate

This is a simple boilerplate for static HTML pages with HTML, SCSS and ES2018 support.

## Tech

* Webpack for bundling
* Babel for JS
* SCSS & PostCSS for styles

## Usage

Clone the repository, and run `yarn` inside of the project folder to install all dependencies.

### Development

Edit the HTML files in the `views` folder.

Run `yarn start` to fire up webpack-serve and BrowserSync for development.

Run `yarn build` for development build, and `yarn build:prod` for production build.

### Referencing assets

All references to files in stylesheets should be done relative to `main.scss`.

Example:
`background-image: url('../images/cat.jpg');`

All references to files in thhe HTML files should be made relative to the root directory. All HTML files in `views` are moved to the root directory during build.

Example:
`<img src="/images/cat.jpg/">`
