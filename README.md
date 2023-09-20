# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

//OTHER READ ME (OVERVIEW)

//FROM SCRATCH WITH CREATE REACT APP
//INTEGRATED FOR BETTER CSS AND DESIGN WITH MATERIAL UI AND OTHER LIBRARIES SUCH AS REACT HOT TOAST FOR NOTIFICATIONS

//MODULES IS RESPONSIBLE FOR THE CASE IF WE HAVE AN APP WITH DIFFERENT ROLES
//TO LOAD ALL THE ROUTES FOR THE PAGES

//THE APP USES COMPONENTS SUCH AS MULTISELECT SEARCH SELECT AND TABLE
//EACH ONE OF THEM HAS ITS OWN PROPERTIES THAT CAN BE CUSTOMIZED IN THE WAY OF USE

//THE DATA ARE READ THROUGH FILES JSON WITH A HELPER FUNCTION OF LOADJSON,
//DEPEDNING ON THE NAME OF THE FILE I IMPORT THOSE DATA AND STORE THEM IN A STATE

//THE TABLE INCLUDES PROPS SUCH AS FILTER PROPERTIES OR FIELDS TO EXCLUDE, IT CAN EVEN BE MORE CUSTOMAZIBLE DEPENDING ON THE USE CONTEXT

//RELATIONSHIP BETWEEN COMPONENTS CAN BE DONE FROM CHILDREN TO PARENT AND VICE VERSA

//THE PROJECT HAS A SPECIFIC FOLDER FOR VIEWS (SINGLE USE VIEW RENDERING)

//UTILS FOLDER INCLUDES SOME HELPER FUNCTIONS

//NOT EXACTLY THE SAME DESIGN IN SIGMA BUT FOLLOWED A SIMILAR ONE TO GET THE PROJECT DONE MORE QUICKLY

//EVERY FUNCTIONALITY SEEMS TO BE WORKING,
//MIGHT HAVE FORGOTTEN SOME SMALL DETAILS TO TEST OR SEE (can be done if i see them again ofc)

//UNIT TESTING NOT DONE, I HAVE EXPERIENCE WITH JEST JS TESTING, BUT SINCE IT WILL TAKE SOME MORE TIME
//FOR THE MOMENT I HAVE NOT DONE IT, SINCE PRIORITY WAS FINISHING THE PROJECT

//MOST OF THE LOGIC CAN BE SEEN BETWEEN COMPONENTS COMMUNICATION

//HOW TO RUN UP ???????????????
//DO NPM INSTALL (LOWERCASE) DO DOWNLOAD THE DEPENDENCIES AND THE NPM START , OR NPM --FORCE INSTALL (LOWERCASE)

//QUESTIONS ANSWERED !!!!!!!!!!!!!!!!!
//THIS APP CAN BE MORE SECURE WE CAN IMPLEMENT AUTHORIZATION AND USER AUTHENTICATION TO SECURE THAT THE CERTAIN PAGES
//CAN ONLY BE ACCESSED BY THE CERTAIN USER
//OR CREATE SOME PRIVATE ROUTES DEPENDING ON THE TOKEN DATA WE GET UPON LOGIN
//OR DO SOME IMPLEMENTATION TO PREVENT THE RATE THROTLLING OF API USAGE

//USING CLOUD DATABASE TO HANDLE LARGE DATA SUCH AS MONGO DB CLOUD (NODE JS BACKEND)
//MAYBE USAGE OF REDIS SINCE IT IS A IN MEMORY AND ENABLES LOW LATENCY AND HIGH THROUPUT
//SO DATA DO NOT REQUIRE A TRIP TO DISK (THIS DEPENDES ON THE CONTEXT OF DATA USAGE)
//PAGINATION AND LAZY LOADING TO NOT LOAD THE WHOLE DATA ENTIRELY BUT SOME OF THEM SO WE REDUCE THE LATENCY

//IF YOU WANT TO SEE SOMETHING MORE IN THE PROJECT PLEASE LET ME KNOW
