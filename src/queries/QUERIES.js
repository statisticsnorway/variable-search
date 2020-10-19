const fromVariableType = {
  instanceVariable: `
    {
      instanceVariable(filter: {id: $id}) {
        id
        reverseLineageFieldInstanceVariable {
          id
          smart {
            id
            lineageDataset {
              id
              reverseUnitDataSetLineage {
                id
                name {languageText}
                description {languageText}
                version
                administrativeStatus
                valuation
                createdBy
                lastUpdatedBy
                metadataSourcePath
                shortName
                temporalityType
                dataSetState
                dataSourcePath
              }
            }
          }
        }
      }
    }
  `,
  representedVariable: `
    {
      representedVariable(filter: {id: $id}) {
        id
        reverseInstanceVariableRepresentedVariable {
          id
          reverseLineageFieldInstanceVariable {
            id
            smart {
              id
              lineageDataset {
                id
                reverseUnitDataSetLineage {
                  id
                  name {languageText}
                  description {languageText}
                  version
                  administrativeStatus
                  valuation
                  createdBy
                  lastUpdatedBy
                  metadataSourcePath
                  shortName
                  temporalityType
                  dataSetState
                  dataSourcePath
                }
              }
            }
          }
        }
      }
    }
  `,
  variable: `
    {
      variable(filter: {id: $id}) {
        id
        reverseRepresentedVariableVariable {
          id
          reverseInstanceVariableRepresentedVariable {
            id
            reverseLineageFieldInstanceVariable {
              id
              smart {
                id
                lineageDataset {
                  id
                  reverseUnitDataSetLineage {
                    id
                    name {languageText}
                    description {languageText}
                    version
                    administrativeStatus
                    valuation
                    createdBy
                    lastUpdatedBy
                    metadataSourcePath
                    shortName
                    temporalityType
                    dataSetState
                    dataSourcePath
                  }
                }
              }
            }
          }
        }
      }
    }
  `
}

export const DATASETS_FROM_LINEAGE = variableType => fromVariableType[variableType]

export const FULL_TEXT_SEARCH = `
{
  instanceVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    representedVariable {
      id
      name {languageText}
      description {languageText}
    }
  }
  representedVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    variable {
      id
      name {languageText}
      description {languageText}
    }
  }
  variable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  unitDataSet(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}, {dataSourcePath_contains: $text}]}) {
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
