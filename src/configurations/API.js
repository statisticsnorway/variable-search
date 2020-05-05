import { getNestedObject } from '../utilities'

export const API = {
  ERROR_PATH: ['response', 'data'],
  ERROR_STATUS_PATH: ['response', 'statusText'],
  GET_HEALTH: '/ping',
  GRAPHQL: '/graphql'
}

export const QUERY_RESULT_TRAVERSE = {
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
  SEARCH: (object) => getNestedObject(object, ['Search', 'edges'])
}
