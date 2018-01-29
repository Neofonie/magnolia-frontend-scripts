const basePaths = {
    root: '.',
    src: 'src',
    srcClient: 'src/client',
    srcServer: 'src/server',
    dist: 'dist',
    distPublic: 'dist/webresources'
};

let projectPaths = require ('../../../projectPaths');
Object.assign(basePaths, projectPaths);

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
            `${basePaths.distSrcUI}`
        ],
        dest: basePaths.distTargetMagnolia
    },

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
