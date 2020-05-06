export const FULL_TEXT_SEARCH = `
    query textSearch($text: String!) {
        Search(query: $text) {
            edges {
                node {
                    __typename
                    ... on UnitDataSet {
                        id
                        name {
                            languageCode
                            languageText
                        }
                        description {
                            languageCode
                            languageText
                        }
                        __typename
                    }
                    ... on DimensionalDataSet {
                        id
                        name {
                            languageCode
                            languageText
                        }
                        description {
                            languageCode
                            languageText
                        }
                        __typename
                    }
                    ... on RepresentedVariable {
                        id
                        variable {
                            id
                            name {
                                languageCode
                                languageText
                            }
                            description {
                                languageCode
                                languageText
                            }
                            validFrom
                            validUntil
                            subjectFields {
                                edges {
                                    node {
                                        name {
                                            languageCode
                                            languageText
                                        }
                                    }
                                }
                            }
                            unitType {
                                name {
                                    languageCode
                                    languageText
                                }
                                description {
                                    languageCode
                                    languageText
                                }
                                typeOfStatisticalUnit
                            }
                        }
                        name {
                            languageCode
                            languageText
                        }
                        description {
                            languageCode
                            languageText
                        }
                        __typename
                    }
                }
            }
        }
    }
`

export const GET_DATASETS_FROM_VARIABLE = `
    query getDatasetsByVariable($id: ID!) {
        RepresentedVariableById(id: $id) {
            name {
                languageText
            }
            reverseInstanceVariableRepresentedVariable {
                edges {
                    node {
                        reverseLogicalRecordInstanceVariables {
                            edges {
                                node {
                                    reverseUnitDataStructureLogicalRecords {
                                        edges {
                                            node {
                                                reverseUnitDataSetUnitDataStructure {
                                                    edges {
                                                        node {
                                                            __typename
                                                            id
                                                            name {
                                                                languageCode
                                                                languageText
                                                            }
                                                            description {
                                                                languageCode
                                                                languageText
                                                            }
                                                            createdDate
                                                            createdBy
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
