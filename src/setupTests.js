import '@testing-library/jest-dom/extend-expect'

jest.mock('axios-hooks')
jest.mock('graphql-hooks')

window.__ENV = {
  REACT_APP_API: process.env.REACT_APP_API,
  REACT_APP_LINEAGE: process.env.REACT_APP_LINEAGE
}
