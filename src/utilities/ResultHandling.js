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

  const lineageFields = results.filter(result =>
    MODEL.LINEAGE_FIELD_TYPES.some(lineageField =>
      Object.getOwnPropertyNames(result).includes(lineageField)
    )
  )

  return ({
    variables: variables,
    datasets: datasets,
    lineageFields: lineageFields
  })
}
