import { getNestedObject } from '../utilities'
import { MODEL } from '../configurations'

export const datasetsFromVariable = (result, type) => {
  const datasets = getNestedObject(result, MODEL.GET_LOGICAL_RECORDS[type])
    .filter(entry => getNestedObject(entry, MODEL.GET_DATASETS).length !== 0)

  if (datasets.length !== 0) {
    return datasets.map(dataset => getNestedObject(dataset, MODEL.GET_DATASET))
  } else {
    return []
  }
}

export const splitSearchResult = results => {
  const edges = getNestedObject(results, MODEL.SEARCH)

  return ({
    variables: edges.filter(entry => getNestedObject(entry, MODEL.TYPE) !== MODEL.DATASET),
    datasets: edges.filter(entry => getNestedObject(entry, MODEL.TYPE) === MODEL.DATASET)
  })
}
