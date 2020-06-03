import { getNestedObject } from '../utilities'
import { MODEL } from '../configurations'

export const datasetsFromVariable = (result, type) => {
  const datasets = getNestedObject(result, MODEL.GET_LOGICAL_RECORDS[type])

  if (datasets !== undefined) {
    const filteredDatasets = datasets.filter(entry => getNestedObject(entry, MODEL.GET_DATASETS).length !== 0)

    if (filteredDatasets.length !== 0) {
      return datasets.map(dataset => getNestedObject(dataset, MODEL.GET_DATASET))
        .filter(element => element !== undefined)
    } else {
      return []
    }
  } else {
    return []
  }
}

export const splitSearchResult = results => {
  const edges = getNestedObject(results, MODEL.SEARCH)
  const datasets = edges.filter(entry => getNestedObject(entry, MODEL.TYPE) === MODEL.DATASET)

  const variables = edges.filter(entry => getNestedObject(entry, MODEL.TYPE) !== MODEL.DATASET)
    .reduce((accumulator, object) => {
      let id = object.node.id

      if (!accumulator[id]) {
        accumulator[id] = []
      }

      accumulator[id].push(object)

      return accumulator
    }, {})

  return ({
    variables: variables,
    datasets: datasets
  })
}
