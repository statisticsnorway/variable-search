export const DATASETS_FROM_FILTER = {
  instanceVariable: `
    {
      unitDataSet(filter: {unitDataStructure: {logicalRecords_some: {instanceVariables_some: {id: $id}}}}) {
        id
        name {languageText}
        description {languageText}
        version
        administrativeStatus
        valuation
      }
    }
  `,
  representedVariable: `
    {
      unitDataSet(filter: {unitDataStructure: {logicalRecords_some: {instanceVariables_some: {representedVariable: {id: $id}}}}}) {
        id
        name {languageText}
        description {languageText}
        version
        administrativeStatus
        valuation
      }
    }
  `,
  variable: `
    {
      unitDataSet(filter: {unitDataStructure: {logicalRecords_some: {instanceVariables_some: {representedVariable: {variable: {id: $id}}}}}}) {
        id
        name {languageText}
        description {languageText}
        version
        administrativeStatus
        valuation
      }
    }
  `
}

export const DATASETS_FROM_LINEAGE = {
  instanceVariable: `
    {
      unitDataSet(filter: {lineage: {reverseLineageFieldLineageDataset_every: {lineage_every: {instanceVariable: {id: $id}}}}}) {
        id
        name {languageText}
        description {languageText}
        version
        administrativeStatus
        valuation
      }
    }
  `,
  representedVariable: `
    {
      unitDataSet(filter: {lineage: {reverseLineageFieldLineageDataset_every: {lineage_every: {instanceVariable: {representedVariable: {id: $id}}}}}}) {
        id
        name {languageText}
        description {languageText}
        version
        administrativeStatus
        valuation
      }
    }
  `,
  variable: `
    {
      unitDataSet(filter: {lineage: {reverseLineageFieldLineageDataset_every: {lineage_every: {instanceVariable: {representedVariable: {variable: {id: $id}}}}}}}) {
        id
        name {languageText}
        description {languageText}
        version
        administrativeStatus
        valuation
      }
    }
  `
}

export const DATASETS_FROM_REVERSE = {
  instanceVariable: `
    {
      instanceVariable(id: $id) {
        reverseLogicalRecordInstanceVariables {
          reverseUnitDataStructureLogicalRecords {
            reverseUnitDataSetUnitDataStructure {
              id
              name {languageText}
              description {languageText}
              version
              administrativeStatus
              valuation
            }
          }
        }
      }
    }
  `,
  representedVariable: `
    {
      representedVariable(id: $id) {
        reverseInstanceVariableRepresentedVariable {
          reverseLogicalRecordInstanceVariables {
            reverseUnitDataStructureLogicalRecords {
              reverseUnitDataSetUnitDataStructure {
                id
                name {languageText}
                description {languageText}
                version
                administrativeStatus
                valuation
              }
            }
          }
        }
      }
    }
  `,
  variable: `
    {
      variable(id: $id) {
        reverseRepresentedVariableVariable {
          reverseInstanceVariableRepresentedVariable {
            reverseLogicalRecordInstanceVariables {
              reverseUnitDataStructureLogicalRecords {
                reverseUnitDataSetUnitDataStructure {
                  id
                  name {languageText}
                  description {languageText}
                  version
                  administrativeStatus
                  valuation
                }
              }
            }
          }
        }
      }
    }
  `
}

export const FULL_TEXT_SEARCH = `
{
  instanceVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    shortName
  }
  representedVariable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    shortName
  }
  variable(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    shortName
  }
  unitDataSet(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    valuation
  }
  dimensionalDataSet(filter: {OR: [{name_every: {languageText_contains: $text}}, {description_every: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
    valuation
  }
  lineageField(filter: {name_contains: $text}) {
    id
    name
    confidence
    relationType
    instanceVariable {id}
    lineageDataset {id}
  }
}
`
