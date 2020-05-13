import { GSIM, MODEL, subjectFieldLayout } from '../configurations'
import { LANGUAGE, UI } from '../enums'

export const getNestedObject = (nestedObject, pathArray) =>
  pathArray.reduce((object, key) =>
    (object && object[key] !== 'undefined') ? object[key] : undefined, nestedObject
  )

export const getLocalizedGsimObjectText = (language, object) => {
  const localized = object.find(object => object[GSIM.LOCALIZED.CODE] === language)

  return localized === undefined ? object[0][GSIM.LOCALIZED.TEXT] : localized[GSIM.LOCALIZED.TEXT]
}

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
