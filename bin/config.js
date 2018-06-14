const themeDefbuilder = require('./theme-def-builder'),
      flog            = require('fancy-log');

const basePaths = {
    root: '.',
    src: 'src',
    srcClient: 'src/client',
    srcServer: 'src/server',
    dist: 'dist',
    distPublic: 'dist/webresources'
};

// basic configuration for themes. Does include the main theme (changes here can be critical, you
// should know what you do!)
const themes = {
    paths: { // used by watcher
        js: [
            `${basePaths.srcClient}/themes/*.js`,
            `${basePaths.srcClient}/themes/**/*.js`
        ],
        css: [
            `${basePaths.srcClient}/themes/*.scss`,
            `${basePaths.srcClient}/themes/**/_*.scss`
        ],
        // no need for an extra 'print'-section, all done in 'css' already
    },
    bundles: [
        { // main theme
            // 'name' is also used as file name later on, so choose a sensible one with valid chars!
            name: 'neo-bundle',
            js: {
                src: `${basePaths.srcClient}/neo-bundle.js`,
                dest: `${basePaths.distPublic}/js`
            },
            css: {
                src_main: `${basePaths.srcClient}/neo-app.scss`,
                src: [
                    `${basePaths.srcClient}/styles/global/_variables.scss`,
                    `${basePaths.srcClient}/styles/global/_mixins.scss`,
                    `${basePaths.srcClient}/styles/global/_*.scss`,
                    `${basePaths.srcClient}/styles/vendor/_*.scss`,
                    `${basePaths.srcClient}/areas/**/_*.scss`,
                    `${basePaths.srcClient}/components/**/_*.scss`,
                    `${basePaths.srcClient}/**/_*.scss`
                ],
                dest: `${basePaths.distPublic}/css`
            },
            print: {
                src: `${basePaths.srcClient}/neo-print.scss`,
                dest: `${basePaths.distPublic}/css`
            }
        }
    ]
}

let projectPaths = require ('../../../.projectrc');
Object.assign(basePaths, projectPaths);

// fetching a configuration-file that can define further theme-package-definitions.
// based on this module location the '.themerc' would be somewhere located in
// 'bechtle-ui\frontend\.themerc' (Bechtle-example)
let themeConfiguration = require ('../../../.themerc');

// bringing the basic theme together with the other themes
themes.bundles = themes.bundles.concat(themeConfiguration(themeDefbuilder(basePaths)));



const config = {

    autoprefixer: {
        browsers: [
            'last 2 versions',
            'ie >= 11'
        ],
        cascade: true
    },

    basePaths,

    fonts: {
        src: [
            `${basePaths.srcClient}/assets/fonts/**/*`
        ],
        dest: `${basePaths.distPublic}/assets/fonts`
    },

    images: {
        src: [
            `${basePaths.srcClient}/assets/img/**/*.jpg`,
            `${basePaths.srcClient}/assets/img/**/*.png`,
            `${basePaths.srcClient}/assets/img/**/*.gif`,
            `${basePaths.srcClient}/assets/img/**/*.ico`,
            `${basePaths.srcClient}/assets/img/**/*.svg`
        ],
        dest: `${basePaths.distPublic}/assets/img`
    },

    magnoliaWebresources: {
        src: [
            `${basePaths.distPublic}/**/*`
        ],
        dest: basePaths.distSrcWeb
    },

    magnoliaLight: {
        src: [
            `${basePaths.distSrcUI}/**/*`
        ],
        dest: basePaths.distTargetMagnolia
    },

    themes,

    // at some point this block might be completely replacable by 'themes', not clear for now.
    scripts: {
        mainSrc: `${basePaths.srcClient}/neo-bundle.js`,
        src: [
            `!${basePaths.srcClient}/**/*Test.js`,
            `${basePaths.srcClient}/**/*.js`
        ],
        dest: `${basePaths.distPublic}/js`
    },

    server: {
        mainSrc: `${basePaths.srcServer}/server.js`,
        src: [
            `${basePaths.srcServer}/**/*.js`
        ],
        dest: basePaths.dist
    },

    styles: {
        mainSrc: `${basePaths.srcClient}/neo-app.scss`,
        src: [
            `${basePaths.srcClient}/styles/global/_variables.scss`,
            `${basePaths.srcClient}/styles/global/_mixins.scss`,
            `${basePaths.srcClient}/styles/global/_*.scss`,
            `${basePaths.srcClient}/styles/vendor/_*.scss`,
            `${basePaths.srcClient}/areas/**/_*.scss`,
            `${basePaths.srcClient}/components/**/_*.scss`,
            `${basePaths.srcClient}/**/_*.scss`
        ],
        dest: `${basePaths.distPublic}/css`
    },

    svg: {
        src: [
            `${basePaths.srcClient}/assets/svg/**/*.svg`
        ],
        dest: `${basePaths.distPublic}/assets/svg`,
        spriteName: 'sprite.svg'
    },

    templates: {
        src: [
            `${basePaths.srcClient}/**/*.html`
        ]
    },

    tests: {
        mainSrc: `${basePaths.srcClient}/components/modal/modalTest.js`,
        src: [
            `${basePaths.src}/**/*Test.js`
        ]
    },

    views: {
        mainSrc: `${basePaths.srcServer}/views/layouts/default.hbs`,
        src: [
            `${basePaths.srcServer}/views/**/*`
        ],
        dest: `${basePaths.dist}/views`
    }
};

module.exports = config;
