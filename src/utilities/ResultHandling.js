import { GSIM, MODEL, QUERY_HELPERS } from '../configurations'

const findThroughRepresented = (cur, type) => {
  const lineageFieldsRepresented = cur[type][QUERY_HELPERS.REVERSE.IV_RV]
  const potentialLineageFieldsRepresented = []
  let returnValue = false

  if (lineageFieldsRepresented.length !== 0) {
    lineageFieldsRepresented
      .forEach(lineageFieldRepresented => lineageFieldRepresented[QUERY_HELPERS.REVERSE.LF_IV]
        .forEach(instanceVariables => potentialLineageFieldsRepresented.push(instanceVariables))
      )

    if (potentialLineageFieldsRepresented.length !== 0) {
      returnValue = potentialLineageFieldsRepresented
    }
  }

  return returnValue
}

const findThroughVariable = (cur, type) => {
  const lineageFieldsVariable = cur[type][QUERY_HELPERS.REVERSE.RV_V]
  const potentialRepresented = []
  const potentialLineageFieldsVariable = []
  let returnValue

  if (lineageFieldsVariable.length !== 0) {
    lineageFieldsVariable
      .forEach(lineageFieldVariable => lineageFieldVariable[QUERY_HELPERS.REVERSE.IV_RV]
        .forEach(representedVariables => potentialRepresented.push(representedVariables))
      )

    if (potentialRepresented.length !== 0) {
      potentialRepresented.forEach(representedVariables => representedVariables[QUERY_HELPERS.REVERSE.LF_IV]
        .forEach(instanceVariables => potentialLineageFieldsVariable.push(instanceVariables))
      )

      if (potentialLineageFieldsVariable.length !== 0) {
        returnValue = potentialLineageFieldsVariable
      }
    }
  }

  return returnValue
}

export const drillVariables = (data, type) => data.reduce((acc, cur) => {
  const datasets = []
  let lineageFields

  switch (type) {
    case GSIM.INSTANCE_VARIABLE:
      lineageFields = cur[type][QUERY_HELPERS.REVERSE.LF_IV]
      break

    case GSIM.REPRESENTED_VARIABLE:
      lineageFields = findThroughRepresented(cur, type)
      break

    case GSIM.VARIABLE:
      lineageFields = findThroughVariable(cur, type)
      break

    default:
      lineageFields = cur[type][QUERY_HELPERS.REVERSE.LF_IV]
  }

  if (lineageFields && lineageFields.length !== 0) {
    lineageFields.forEach(lineageField => {
      const smart = lineageField[QUERY_HELPERS.SMART]

      if (smart.length !== 0) {
        const dataset = smart.filter(dataset =>
          dataset[QUERY_HELPERS.LINEAGE_DATASET].hasOwnProperty(QUERY_HELPERS.REVERSE.UDS_L) &&
          dataset[QUERY_HELPERS.LINEAGE_DATASET][QUERY_HELPERS.REVERSE.UDS_L].length !== 0
        )

        if (dataset.length !== 0) {
          dataset.forEach(dataset => {
            dataset[QUERY_HELPERS.LINEAGE_DATASET][QUERY_HELPERS.REVERSE.UDS_L].forEach(lineage =>
              datasets.push(lineage)
            )
          })
        }
      }
    })
  }

  return datasets
}, [])

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
    datasets: datasets,
  })
}
