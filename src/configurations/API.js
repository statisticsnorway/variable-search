import { getNestedObject } from '../utilities'

export const API = {
  ERROR_PATH: ['response', 'data'],
  ERROR_STATUS_PATH: ['response', 'statusText'],
  GET_HEALTH: '/ping',
  GRAPHQL: '/graphql'
}

export const GSIM = {
  LOCALIZED: {
    CODE: 'languageCode',
    TEXT: 'languageText'
  }
}

export const QUERY_RESULT_TRAVERSE = {
  CREATED_BY: (object) => getNestedObject(object, ['createdBy']),
  CREATED_DATE: (object) => getNestedObject(object, ['createdDate']),
  DATASET_BY_VARIABLE: (object) => getNestedObject(
    object,
    [
      'RepresentedVariableById',
      'reverseInstanceVariableRepresentedVariable',
      'edges',
      0,
      'node',
      'reverseLogicalRecordInstanceVariables',
      'edges'
    ]
  ),
  DESCRIPTION: (object) => getNestedObject(object, ['description']),
  EDGE_DATASET: (object) => getNestedObject(
    object,
    [
      'node',
      'reverseUnitDataStructureLogicalRecords',
      'edges',
      0,
      'node',
      'reverseUnitDataSetUnitDataStructure',
      'edges',
      0,
      'node'
    ]
  ),
  NAME: (object) => getNestedObject(object, ['name']),
  NOT_EMPTY_DATASET: (object) => getNestedObject(
    object,
    [
      'node',
      'reverseUnitDataStructureLogicalRecords',
      'edges',
      0,
      'node',
      'reverseUnitDataSetUnitDataStructure',
      'edges'
    ]
  ),
  NOT_EMPTY_SEARCH: (object) => getNestedObject(object, ['node', 'name']),
  SEARCH: (object) => getNestedObject(object, ['Search', 'edges']),
  SUBJECT_FIELD_NAME: (object) => getNestedObject(object, ['node', 'name']),
  SUBJECT_FIELDS_FROM_VARIABLE: (object) => getNestedObject(object, ['variable', 'subjectFields', 'edges']),
  TYPE: 'type',
  UNIT_TYPE_FROM_VARIABLE: (object) => getNestedObject(object, ['variable', 'unitType', 'name']),
  VARIABLE: 'RepresentedVariable'
}
