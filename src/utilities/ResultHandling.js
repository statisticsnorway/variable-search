import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import { MODEL } from '../configurations'

export const splitSearchResult = (results, language) => {
  const variables = results.filter(result =>
    MODEL.VARIABLE_TYPES.some(variable =>
      Object.getOwnPropertyNames(result).includes(variable) && result['id'] !== null
    )
  )

  const datasets = results.filter(result =>
      MODEL.DATASET_TYPES.some(dataset =>
        Object.getOwnPropertyNames(result).includes(dataset)
      )
    //TODO: Drop this filter when backend correctly removes nameless results
  ).filter(dataset => {
    const { name } = dataset[MODEL.DATASET_TYPES[0]]
    const extractedName = getLocalizedGsimObjectText(language, name)

    return extractedName !== ''
  })

  return ({
    variables: variables,
    datasets: datasets,
  })
}
