# magnolia-frontend-scripts

- install with:

        yarn add magnolia-frontend-scripts 

- add this into your projects package.json:

        "scripts": {
           "build": "neo-mfs build",
           "check": "neo-mfs check",
           "start": "neo-mfs default"
        }

- make sure your directory layout looks like this:

        - <project-name>
            -> <name>-ui 
                -> <name>-ui
                -> frontend (here is your package.json etc)
            -> <name>-webapp 
            
- add correct path names to a file named ".projectrc" in your frontend directory:

        const basePaths = {
            root: '.',
            src: 'src',
            srcClient: 'src/client',
            srcServer: 'src/server',
            dist: 'dist',
            distPublic: 'dist/webresources',
            distSrcUI: '../swidch-ui-light/',
            distSrcWeb: '../swidch-ui-light/web',
            distTargetMagnolia: '../../swidch-webapp/target/cmsauthor/modules/swidch-ui-light'
        };
        
        module.exports = basePaths;

- TODO 
    - make more configurable
    - log gulp output too
    - ...