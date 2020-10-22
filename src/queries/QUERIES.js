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
                name {
                  languageText
                  languageCode
                }
                description {
                  languageText
                  languageCode
                }
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
                  name {
                    languageText
                    languageCode
                  }
                  description {
                    languageText
                    languageCode  
                  }
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
                    name {
                      languageText
                      languageCode
                    }
                    description {
                      languageText
                      languageCode
                    }
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
    name {
      languageText
      languageCode
    }
    description {
      languageText
      languageCode
    }
    representedVariable {
      id
      name {
        languageText
        languageCode
      }
      description {
        languageText
        languageCode
      }
    }
  }
  representedVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {
      languageText
      languageCode  
    }
    description {
      languageText
      languageCode
    }
    variable {
      id
      name {
        languageText
        languageCode
      }
      description {
        languageText
        languageCode
      }
    }
  }
  variable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {
      languageText
      languageCode
    }
    description {
      languageText
      languageCode
    }
  }
  unitDataSet(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}, {dataSourcePath_contains: $text}]}) {
    id
    name {
      languageText
      languageCode
    }
    description {
      languageText
      languageCode
    }
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
