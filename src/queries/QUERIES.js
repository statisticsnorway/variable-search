export const DATASETS_FROM = {
  instanceVariable: `
    {
      instanceVariable(id: $id) {
        reverseLogicalRecordInstanceVariables {
          reverseUnitDataStructureLogicalRecords {
            reverseUnitDataSetUnitDataStructure {
              id
              name {languageText}
              description {languageText}
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
  instanceVariable(filter: {OR: [{name: {languageText_contains: $text}}, {description: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  representedVariable(filter: {OR: [{name: {languageText_contains: $text}}, {description: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  variable(filter: {OR: [{name: {languageText_contains: $text}}, {description: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  unitDataSet(filter: {OR: [{name: {languageText_contains: $text}}, {description: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
  dimensionalDataSet(filter: {OR: [{name: {languageText_contains: $text}}, {description: {languageText_contains: $text}}]}) {
    id
    name {languageText}
    description {languageText}
  }
}
`
