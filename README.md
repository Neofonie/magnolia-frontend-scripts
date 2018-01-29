# magnolia-frontend-scripts

- install with:

        yarn add magnolia-frontend-scripts 
   
    
- use like this in your package.json:

        "scripts": {
           "build": "neo-mfs build",
           "check": "neo-mfs check",
           "default": "neo-mfs default"
        }
  
    
- make sure your directory layout looks like this:

        - <project-name>
            -> <name>-ui 
                -> <name>-ui
                -> frontend
            -> <name>-webapp 
            
- add correct path names to a file named "projectPath.js" in your frontend directory:

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
