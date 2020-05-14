# variable-search
[![Build Status](https://drone.prod-bip-ci.ssb.no/api/badges/statisticsnorway/variable-search/status.svg)](https://drone.prod-bip-ci.ssb.no/statisticsnorway/variable-search)

This application aims to create an interactive search against the 
[graphql-api](https://github.com/statisticsnorway/linked-data-store-documentation/blob/master/docs/graphql-api.adoc) 
exposed by [Linked Data Store](https://github.com/statisticsnorway/linked-data-store-documentation).

Functionality includes:
* Searching through domains (spesifically variables and dataset)
* Listing connections between variables and datasets

The project makes limited use of the [Component library for SSB](https://github.com/statisticsnorway/ssb-component-library)
and is based upon [react-reference-app](https://github.com/statisticsnorway/fe-react-reference-app).

### Try this application locally
The first time you clone the repository, remember to run `yarn install`.

Run `yarn start` and navigate to `http://localhost:3000`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Docker locally
* `yarn build`
* `docker build -t variable-search .`
* `docker run -p 8000:80 variable-search:latest`
* Navigate to `http://localhost:8000`

**Note** that this application requires [dapla-project (localstack)](https://github.com/statisticsnorway/dapla-project/blob/master/localstack/README.md)
running to function locally (or atleast a running instance of [Linked Data Store](https://github.com/statisticsnorway/linked-data-store-documentation)).