## [**A**kamai ](https://developer.akamai.com/api/) Open APIs [**E**lectron](https://electron.atom.io/) app using [**E**xpress.js](http://expressjs.com) and [**A**ngular 5](https://angular.io)

### Description
A starter project to use Akamai Open APIs in an electron application.
The authentication using .edgerc is handled using expressjs and the Client is using Angular5 typescript with Bootstrap and a custom Progress-bar to show you how fast forward the responses are delivered.

```plaintext
Currently runs with:
    Electron v1.7.5
    Express v4.15.4
    Angular v5.2.5
    Angular-CLI v1.7.1
    Bootstrap v3.3.5
```

### Run
1. Install [Node.js](https://nodejs.org)

2. npm install electron && electron-packager -g
3. npm install && cd express && npm install && cd angular && npm install;

4. Go to ./resouces/express and folow the steps on README.md and setup your .edgerc file to  authenticate to the Akamai Open APIs and use the Diagnostic Tools example
5. Run one of the following scripts to serve or package your application 
  
```bash
   * angular-build": "cd express/angular && npm run build",
   * start : "npm run angular-build && electron main",
   * win32 : "npm run angular-build && electron-packager . akamaiManager --platform=win32 --arch=ia32",
   * win64 : "npm run angular-build && electron-packager . akamaiManager --platform=win32 --arch=x64",
   * linux32 : "npm run angular-build && electron-packager . akamaiManager --platform=linux --arch=ia32",
   * linux64 : "npm run angular-build && electron-packager . akamaiManager --platform=linux --arch=x64",
   * osx : "npm run angular-build && electron-packager . akamaiManager --platform=darwin --arch=x64"
```

6. Run akamaiManager.exe
