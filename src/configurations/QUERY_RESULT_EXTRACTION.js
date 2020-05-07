import React from 'react'
import { Label } from 'semantic-ui-react'

import { getLocalizedGsimObjectText } from '../utilities'
import { QUERY_RESULT_TRAVERSE, SSB_COLORS } from './'
import { LANGUAGE, UI } from '../enums'

const returnString = (language, object) => {
  if (object === undefined) {
    return UI.UNKOWN
  } else {
    return getLocalizedGsimObjectText(language, object)
  }
}

export const getCreatedBy = (language, object) => QUERY_RESULT_TRAVERSE.CREATED_BY(object)

export const getCreatedDate = (language, object) => {
  const date = QUERY_RESULT_TRAVERSE.CREATED_DATE(object)

  if (date === undefined) {
    return UI.UNKOWN
  } else {
    return new Date(date).toLocaleDateString(LANGUAGE.LOCALE[language])
  }
}

export const getDescription = (language, object) => returnString(language, QUERY_RESULT_TRAVERSE.DESCRIPTION(object))

export const getName = (language, object) => returnString(language, QUERY_RESULT_TRAVERSE.NAME(object))

export const getUnitTypeName = (language, variable) =>
  returnString(language, QUERY_RESULT_TRAVERSE.UNIT_TYPE_FROM_VARIABLE(variable))

export const getSubjectFields = (language, variable) => {
  const subjectFields = QUERY_RESULT_TRAVERSE.SUBJECT_FIELDS_FROM_VARIABLE(variable)

  if (subjectFields === undefined) {
    return UI.UNKOWN
  } else {
    return subjectFields.map((subjectField, index) =>
      <Label
        tag
        key={index}
        size='large'
        style={{ backgroundColor: SSB_COLORS.GREEN, borderColor: SSB_COLORS.GREEN, marginRight: '0.5em' }}
      >
        {getLocalizedGsimObjectText(language, QUERY_RESULT_TRAVERSE.SUBJECT_FIELD_NAME(subjectField))}
      </Label>
    )
  }
}
