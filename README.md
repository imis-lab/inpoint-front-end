# The front-end application of the inPOINT project.

## Setup for development (tested on Ubuntu)

System Dependencies:

- Python 3
- pip

Clone the repository and type the following commands:

```bash
pip install nodeenv
nodeenv env --node=14.15.5
source env/bin/activate
cd inpoint-front-end/
npm install -g npm@latest
npm install --global yarn
yarn install
yarn start
```

**Important**

- Before committing your code changes do not forget to run the `format_code.sh` script
- Please try to follow naming conventions and best practices

## Available Scripts

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`yarn test`

`yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dockerize the application

TODO

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
