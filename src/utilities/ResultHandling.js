import { MODEL } from '../configurations'

export const splitSearchResult = results => {
  const variables = results.filter(result =>
    MODEL.VARIABLE_TYPES.some(variable =>
      Object.getOwnPropertyNames(result).includes(variable)
    )
  )

  const datasets = results.filter(result =>
    MODEL.DATASET_TYPES.some(dataset =>
      Object.getOwnPropertyNames(result).includes(dataset)
    )
  )

  return ({
    variables: variables,
    datasets: datasets
  })
}
