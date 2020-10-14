# variable-search
[![npm version](https://badge.fury.io/js/%40statisticsnorway%2Fdapla-variable-search.svg)](https://badge.fury.io/js/%40statisticsnorway%2Fdapla-variable-search)
[![Build Status](https://dev.azure.com/statisticsnorway/Dapla/_apis/build/status/Frontends/statisticsnorway.variable-search?branchName=master)](https://dev.azure.com/statisticsnorway/Dapla/_build/latest?definitionId=12&branchName=master)

This application is built for in-house use in Statistics Norway and it aims to create a smart and interactive variable
and dataset search with the help of the 
[graphql-api](https://github.com/statisticsnorway/linked-data-store-documentation/blob/master/docs/graphql-api.adoc) 
exposed by [Linked Data Store](https://github.com/statisticsnorway/linked-data-store-documentation).

Functionality includes:
* Searching through GSIM domains (specifically variables and datasets) and Lineage
* Listing connections between variables and datasets (which datasets use which variables and vice versa)

The project makes limited use of the [ssb-component-library](https://github.com/statisticsnorway/ssb-component-library)
and is based upon [react-reference-app](https://github.com/statisticsnorway/react-reference-app).

### Use as a library
If you want to use this application as a library in your project, simply add it with yarn.

`yarn add @statisticsnorway/dapla-variable-search`

The component requires a few peer dependencies to work, namely:

* @statisticsnorway/dapla-js-utilities
* axios-hooks
* graphql-hooks
* React
* SemanticUI

In your application import the component.

`import { VariableSearch } from '@statisticsnorway/dapla-variable-search'`

The component needs two properties to function correctly, `restApi` and `language`.

`<VariableSearch restApi='http://localhost:8080' language='en' />`

`restApi` is the base url for any Linked Data Store you wish to use and `language` sets the language of the component.
`en` (English) and `nb` (Norwegian) is available.

In your application housing this component you also need to set up graphql-hooks in a React `Context`.
You can checkout how to do it in `/src/utilities/ContextHandling.js` in this project. This is done because the component
needs several instances of graphql-hooks to run, and without setting up a GraphQLClient that, is impossible.

### Try this application locally
The first time you clone the repository, remember to run `yarn` or `yarn install`.

Run `yarn start` and navigate to `http://localhost:3000/`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Docker locally
* `yarn build`
* `docker build -t variable-search .`
* `docker run -p 8000:80 variable-search:latest`
  * Alternatively with custom environment variables: `docker run -p 8000:80 -e REACT_APP_API=http://localhost:29090 variable-search:latest`
* Navigate to `http://localhost:8000`

**Note** that this application requires [dapla-project (localstack)](https://github.com/statisticsnorway/dapla-project/blob/master/localstack/README.md)
running to function locally (or atleast a running instance of [Linked Data Store](https://github.com/statisticsnorway/linked-data-store-documentation)).

### Publish library
To publish to [npm](https://www.npmjs.com/) you need a user and a membership in the `statisticsnorway` organization on 
npm. The user must also have 2FA authentication enabled. Steps to follow:

1. Login into your npm account in a terminal with `npm login`
2. Make sure all tests works (test components in the example application aswell, if you made a new one)
3. Bump version in `package.json`
4. Run `yarn package`
5. Dry run a release with `npm pack`
6. Publish with `npm publish --access public --otp=<code>` (`<code>` is your 2FA code, without `<>`)
