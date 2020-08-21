import { getNestedObject } from '@statisticsnorway/dapla-js-utilities'

import { MODEL } from '../configurations'

export const datasetsFromVariable = (result, type) => {
  const datasets = getNestedObject(result, MODEL.GET_LOGICAL_RECORDS[type])

  if (Array.isArray(datasets)) {
    const filteredDatasets = datasets.filter(entry => {
      const datasetsFromEntry = getNestedObject(entry, MODEL.GET_DATASETS)

      if (Array.isArray(datasetsFromEntry)) {
        return datasetsFromEntry.length !== 0
      } else {
        return false
      }
    })

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

const splitAndReverse = array => array.reduceRight((accumulator, object) => {
  let id = getNestedObject(object, MODEL.GET_ID)

  if (!accumulator[id]) {
    accumulator[id] = []
  }

  accumulator[id].push(object)

  return accumulator
}, {})

export const splitSearchResult = results => {
  const edges = getNestedObject(results, MODEL.SEARCH)
  const datasets = splitAndReverse(edges.filter(entry => getNestedObject(entry, MODEL.TYPE) === MODEL.DATASET))
  const variables = splitAndReverse(edges.filter(entry => getNestedObject(entry, MODEL.TYPE) !== MODEL.DATASET))

  return ({
    variables: variables,
    datasets: datasets
  })
}
