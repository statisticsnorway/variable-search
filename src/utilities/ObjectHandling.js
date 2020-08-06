import { getLocalizedGsimObjectText, getNestedObject, LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

import { MODEL, subjectFieldLayout } from '../configurations'
import { UI } from '../enums'

const returnString = (language, object) => {
  if (object === undefined) {
    return UI.UNKOWN
  } else {
    return getLocalizedGsimObjectText(language, object)
  }
}

export const getDatasetCreatedDate = (language, object) => {
  const date = getNestedObject(object, MODEL.GET_CREATED_DATE)

  if (date === undefined) {
    return UI.UNKOWN
  } else {
    return new Date(date).toLocaleDateString(LANGUAGE.LOCALE[language])
  }
}

export const getDatasetState = dataset => getNestedObject(dataset, MODEL.GET_STATE)

export const getDatasetValuation = dataset => getNestedObject(dataset, MODEL.GET_VALUATION)

export const getDescription = (language, object) =>
  returnString(language, getNestedObject(object, MODEL.GET_DESCRIPTION))

export const getName = (language, object) => returnString(language, getNestedObject(object, MODEL.GET_NAME))

export const getVariableSubjectFields = (language, type, variable) => {
  const subjectFields = getNestedObject(variable, MODEL.GET_SUBJECT_FIELDS[type])

  if (subjectFields === undefined) {
    return UI.UNKOWN
  } else {
    return subjectFields.map((subjectField, index) =>
      subjectFieldLayout(returnString(language, getNestedObject(subjectField, MODEL.GET_SUBJECT_FIELD_NAME)), index)
    )
  }
}

export const getVariableUnitType = (language, type, variable) =>
  returnString(language, getNestedObject(variable, MODEL.GET_UNIT_TYPE[type]))
