const instanceVariable = [
  'reverseLogicalRecordInstanceVariables',
  'reverseUnitDataStructureLogicalRecords',
  'reverseUnitDataSetUnitDataStructure'
]
const representedVariable = ['reverseInstanceVariableRepresentedVariable'].concat(instanceVariable)
const variable = ['reverseRepresentedVariableVariable'].concat(representedVariable)

export const API = {
  GET_HEALTH: '/health/ready',
  GRAPHQL: '/graphql',
  GRAPHIQL: '/graphiql',
  SEARCH_METHODS: ['filter', 'reverse']
}

export const MODEL = {
  DATASET_TYPES: ['dimensionalDataSet', 'unitDataSet'],
  ID: 'id',
  LINEAGE_FIELD_TYPES: ['lineageField'],
  REVERSE: {
    instanceVariable: instanceVariable,
    representedVariable: representedVariable,
    variable: variable
  },
  VARIABLE_TYPES: ['instanceVariable', 'representedVariable', 'variable']
}
