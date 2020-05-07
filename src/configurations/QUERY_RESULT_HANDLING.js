import { QUERY_RESULT_TRAVERSE } from './'

const nonEmptyNodeDataset = edge => QUERY_RESULT_TRAVERSE.NOT_EMPTY_DATASET(edge).length > 0
const mapEdgeDataset = edge => mapNodeDataset(QUERY_RESULT_TRAVERSE.EDGE_DATASET(edge))
const mapNodeDataset = ({ id, name, __typename, createdBy, createdDate, description }) => ({
  id: id,
  name: name,
  type: __typename,
  createdBy: createdBy,
  createdDate: createdDate,
  description: description
})
const nonEmptyNodeSearch = edge => QUERY_RESULT_TRAVERSE.NOT_EMPTY_SEARCH(edge)
const mapEdgeSearch = ({ node }) => {
  const { id, name, __typename, variable, description } = node

  return ({
    id: id,
    rows: 0,
    data: null,
    name: name,
    type: __typename,
    variable: variable,
    description: description
  })
}

export const mapSearchResult = results =>
  QUERY_RESULT_TRAVERSE.SEARCH(results).filter(nonEmptyNodeSearch).map(mapEdgeSearch)

export const mapDatasetsByVariableIdResult = results =>
  QUERY_RESULT_TRAVERSE.DATASET_BY_VARIABLE(results).filter(nonEmptyNodeDataset).map(mapEdgeDataset)

export const splitSearchResult = results => ({
  variables: results.filter(entry => entry[QUERY_RESULT_TRAVERSE.TYPE] === QUERY_RESULT_TRAVERSE.VARIABLE),
  datasets: results.filter(entry => entry[QUERY_RESULT_TRAVERSE.TYPE] !== QUERY_RESULT_TRAVERSE.VARIABLE)
})
