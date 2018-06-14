const themeDefBuilder = (basePath) => {
    return {
        getBasePath: () => {
            return basePath;
        },
    
        createThemeDefinitionFor: (themeName) => {
            return {
                name: themeName,
                js: {
                    // the main js, other js-files should be included via the main js
                    src: `${basePath.srcClient}/themes/` + themeName + `.js`,
                    dest: `${basePath.distPublic}/themes`
                },
                css: {
                    // the main scss, other scss-files should be included via the main scss
                    src_main: `${basePath.srcClient}/themes/` + themeName + `.scss`,
    
                    // these are some global scss-files that might come in play for most other
                    // themes as well, so they can/should be defined here
                    src: [
                        `${basePath.srcClient}/styles/global/_variables.scss`,
                        `${basePath.srcClient}/styles/global/_mixins.scss`,
                        `${basePath.srcClient}/styles/global/_*.scss`,
                        `${basePath.srcClient}/styles/vendor/_*.scss`
                    ],
                    dest: `${basePath.distPublic}/themes`
                },
                print: {
                    // the main scss used for print view, other scss-files (related to the print view) should be included via the main scss
                    src: `${basePath.srcClient}/themes/` + themeName + `_print.scss`,
                    dest: `${basePath.distPublic}/theme`
                }
            };
        }
    };
};

module.exports = themeDefBuilder;
