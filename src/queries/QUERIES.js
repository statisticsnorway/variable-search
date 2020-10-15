const fromVariableType = {
  instanceVariable: 'id: $id',
  representedVariable: 'representedVariable: {id: $id}',
  variable: 'representedVariable: {variable: {id: $id}}'
}

export const DATASETS_FROM_DIRECT = variableType => `
  {
    unitDataSet(filter: {unitDataStructure: {logicalRecords_some: {instanceVariables_some: {${fromVariableType[variableType]}}}}}) {
      id
      name {languageText}
      description {languageText}
      version
      administrativeStatus
      valuation
      createdBy
      dataSourcePath
      lastUpdatedBy
      metadataSourcePath
      shortName
      temporalityType
      dataSetState
    }
  }
`

export const DATASETS_FROM_LINEAGE = variableType => `
  {
    unitDataSet(filter: {lineage: {reverseLineageFieldLineageDataset_every: {smart_every: {instanceVariable: {${fromVariableType[variableType]}}}}}}) {
      id
      name {languageText}
      description {languageText}
      version
      administrativeStatus
      valuation
      createdBy
      dataSourcePath
      lastUpdatedBy
      metadataSourcePath
      shortName
      temporalityType
      dataSetState
    }
  }
`

export const FULL_TEXT_SEARCH = `
{
  instanceVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  representedVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  variable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  unitDataSet(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    version
    administrativeStatus
    valuation
    createdBy
    dataSourcePath
    lastUpdatedBy
    metadataSourcePath
    shortName
    temporalityType
    dataSetState
    unitDataStructure {
      logicalRecords {
        instanceVariables {
          id
          name {languageText}
          description {languageText}
        }
      }
    }
  }
}
`
