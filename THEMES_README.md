# Themes

The gulp-build-process can deal with several _themes_, each defining a main JS/SCSS for a single theme. A few steps are neccessary to define a theme:

## Define the theme in '.themerc'

**_.themerc_** should be located in your _frontend_-root folder, beside of files like **_.projectrc_**, **_.sasslintrc_**, etc. . If not, this file should be created (to make things easier there is an example-**_.themerc_** located in the `examples`-folder of the  `magnolia-frontend-script`-module)



## Add your theme defintion

You can define the theme-cofiguration in a complex and a simple way. The complex way offers you a finer control about what is used to build and which output is generated. The simplier way is provided by a `themeDefBuilder` where you just provide a theme-name and the rest is automatically build.
(Note that for the theme-name you should always use something that is usable as filename, so ideally only letters, numbers, '-' and '_'.)

* Example of a complex theme-definition in a **_.themerc_** (note that you can access the base paths by using `themeDefBuilder.getBasePath()`)
```javascript
	const bundles = (themeDefBuilder) => {
		return [
			{
                name: 'my-theme',
                js: {
                    // the main js; other js-files should be included via the main js
                    src: `${themeDefBuilder.getBasePath().srcClient}/themes/my-theme.js`,
                    dest: `${themeDefBuilder.getBasePath().distPublic}/themes`
                },
                css: {
                    // the main scss; other scss-files should be included via the main scss
                    src_main: `${themeDefBuilder.getBasePath().srcClient}/themes/my-theme.scss`,
                    // these are some global scss-files that might come in play for most other
                    // themes as well, so they can/should be defined here
                    src: [
                        `${themeDefBuilder.getBasePath().srcClient}/styles/global/_variables.scss`,
                        `${themeDefBuilder.getBasePath().srcClient}/styles/global/_mixins.scss`,
                        `${themeDefBuilder.getBasePath().srcClient}/styles/global/_*.scss`,
                        `${themeDefBuilder.getBasePath().srcClient}/styles/vendor/_*.scss`
                    ],
                    dest: `${themeDefBuilder.getBasePath().distPublic}/themes`
                },
                print: {
                    // the main scss used for print view; other scss-files (related to the print view) should be included via the main scss
                    src: `${themeDefBuilder.getBasePath().srcClient}/themes/my-theme_print.scss`,
                    dest: `${themeDefBuilder.getBasePath().distPublic}/theme`
                }
            },
			{... next theme ...}
		]
	};
	module.exports = **bundles**;
```



* Example of a simple theme-definition in a **_.themerc_** (again `themeDefBuilder` comes in play)
```javascript
    const bundles = (themeDefBuilder) => {
	    return [
		    themeDefBuilder.createThemeDefinitionFor('theme-example')
	    ]
    };

    module.exports = bundles;
```



## Add your theme files
Based on your theme definition (s. above) you have to provide the source files (JS/SCSS). Note that in cases where you'd a definition but not a corresponding file, you want get no output file for it. It can also happen (based on the source file content) that you either won't get any output -in case- the content was useless (so it was lint'ed out).
If you followed the 'defaults' regarding paths and stuff the files could be located here:

* `build-ui/frontend/src/client/themes/my-theme.js`
* `build-ui/frontend/src/client/themes/my-theme.scss`
* `build-ui/frontend/src/client/themes/my-theme_print.scss`

Any further usage and organization of includes and stuff, related to a theme, is up to you, but recommend would be to create a subfolder with the theme-name and to place your organized files there.



## Reference your theme files

Finally you should use your theme files as you do some setup stuff in Magnolia itself