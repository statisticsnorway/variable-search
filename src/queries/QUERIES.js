export const DATASETS_FROM = {
  InstanceVariable: `
    query getDatasetsByInstanceVariable($id: ID!) {
      InstanceVariableById(id: $id) {
        reverseLogicalRecordInstanceVariables {edges {node {
          reverseUnitDataStructureLogicalRecords {edges {node {
            reverseUnitDataSetUnitDataStructure {edges {node {
              id
              name {languageText}
              description {languageText}
              createdDate
              dataSetState
              valuation
            }}}
          }}}
        }}}
      }
    }
  `,
  RepresentedVariable: `
    query getDatasetsByRepresentedVariable($id: ID!) {
      RepresentedVariableById(id: $id) {
        reverseInstanceVariableRepresentedVariable {edges {node {
          reverseLogicalRecordInstanceVariables {edges {node {
            reverseUnitDataStructureLogicalRecords {edges {node {
              reverseUnitDataSetUnitDataStructure {edges {node {
                id
                name {languageText}
                description {languageText}
                createdDate
                dataSetState
                valuation
              }}}
            }}}
          }}}
        }}}
      }
    }
  `,
  Variable: `
    query getDatasetsByVariable($id: ID!) {
      VariableById(id: $id) {
        reverseRepresentedVariableVariable {edges {node {
          reverseInstanceVariableRepresentedVariable {edges {node {
            reverseLogicalRecordInstanceVariables {edges {node {
              reverseUnitDataStructureLogicalRecords {edges {node {
                reverseUnitDataSetUnitDataStructure {edges {node {
                  id
                  name {languageText}
                  description {languageText}
                  createdDate
                  dataSetState
                  valuation
                }}}
              }}}
            }}}
          }}}
        }}}
      }
    }
  `
}

export const FULL_TEXT_SEARCH = `
query textSearch($text: String!) {
  Search(query: $text, filter: [InstanceVariable, RepresentedVariable, Variable, UnitDataSet]) {
    edges {
      node {
        __typename
        ... on Variable {
          id
          name {languageText}
          description {languageText}
          subjectFields {edges{node{name{languageText}}}}
          unitType {name {languageText}}
        }
        ... on RepresentedVariable {
          id
          name {languageText}
          description {languageText}
          variable {
            subjectFields {edges{node{name{languageText}}}}
            unitType {name {languageText}} 
          }
        }
        ... on InstanceVariable {
          id
          name {languageText}
          description {languageText}
          representedVariable {
            variable {
              subjectFields {edges{node{name{languageText}}}}
              unitType {name {languageText}} 
            }
          }
        }
        ... on UnitDataSet {
          id
          name {languageText}
          description {languageText}
          createdDate
          dataSetState
          valuation
        }
      }
    }
  }
}
`
