# magnolia-frontend-scripts

- install with

        yarn add magnolia-frontend-scripts 
   
    
- use like this in your package.json:

        "scripts": {
           "build": "neo-mfs build",
           "check": "neo-mfs check",
           "default": "neo-mfs default"
        }
  
    
- make sure youre directory layout looks like this

        - <project-name>
            -> <name>-ui 
                -> <name>-ui
                -> frontend
            -> <name>-webapp 