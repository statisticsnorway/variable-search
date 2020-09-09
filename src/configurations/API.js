const instanceVariable = [
  'reverseLogicalRecordInstanceVariables',
  'reverseUnitDataStructureLogicalRecords',
  'reverseUnitDataSetUnitDataStructure'
]
const representedVariable = ['reverseInstanceVariableRepresentedVariable'].concat(instanceVariable)
const variable = ['reverseRepresentedVariableVariable'].concat(representedVariable)

export const API = {
  GET_HEALTH: '/health/ready',
  GRAPHQL: '/graphql'
}

export const MODEL = {
  DATASET_TYPES: ['dimensionalDataSet', 'unitDataSet'],
  REVERSE: {
    instanceVariable: instanceVariable,
    representedVariable: representedVariable,
    variable: variable
  },
  VARIABLE_TYPES: ['instanceVariable', 'representedVariable', 'variable']
}
