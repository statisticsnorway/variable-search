export const API = {
  GET_HEALTH: '/ping',
  GRAPHQL: '/graphql'
}

export const MODEL = {
  DATASET: 'UnitDataSet',
  GET_CREATED_DATE: ['createdDate'],
  GET_DATASET: [
    'node',
    'reverseUnitDataStructureLogicalRecords',
    'edges',
    0,
    'node',
    'reverseUnitDataSetUnitDataStructure',
    'edges',
    0,
    'node'
  ],
  GET_DATASETS: [
    'node',
    'reverseUnitDataStructureLogicalRecords',
    'edges',
    0,
    'node',
    'reverseUnitDataSetUnitDataStructure',
    'edges'
  ],
  GET_DESCRIPTION: ['description'],
  GET_ID: ['node', 'id'],
  GET_LOGICAL_RECORDS: {
    InstanceVariable: [
      'InstanceVariableById',
      'reverseLogicalRecordInstanceVariables',
      'edges'
    ],
    RepresentedVariable: [
      'RepresentedVariableById',
      'reverseInstanceVariableRepresentedVariable',
      'edges',
      0,
      'node',
      'reverseLogicalRecordInstanceVariables',
      'edges'
    ],
    Variable: [
      'VariableById',
      'reverseRepresentedVariableVariable',
      'edges',
      0,
      'node',
      'reverseInstanceVariableRepresentedVariable',
      'edges',
      0,
      'node',
      'reverseLogicalRecordInstanceVariables',
      'edges'
    ]
  },
  GET_NAME: ['name'],
  GET_STATE: ['dataSetState'],
  GET_SUBJECT_FIELD_NAME: ['node', 'name'],
  GET_SUBJECT_FIELDS: {
    InstanceVariable: ['representedVariable', 'variable', 'subjectFields', 'edges'],
    RepresentedVariable: ['variable', 'subjectFields', 'edges'],
    Variable: ['subjectFields', 'edges']
  },
  GET_UNIT_TYPE: {
    InstanceVariable: ['representedVariable', 'variable', 'unitType', 'name'],
    RepresentedVariable: ['variable', 'unitType', 'name'],
    Variable: ['unitType', 'name']
  },
  GET_VALUATION: ['valuation'],
  SEARCH: ['Search', 'edges'],
  TYPE: ['node', '__typename'],
  VARIABLES: ['InstanceVariable', 'RepresentedVariable', 'Variable']
}
