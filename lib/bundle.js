'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlHooks = require('graphql-hooks');
var semanticUiReact = require('semantic-ui-react');
var daplaJsUtilities = require('@statisticsnorway/dapla-js-utilities');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const GSIM = {
  DESCRIPTION: 'description',
  INSTANCE_VARIABLE: 'instanceVariable',
  INSTANCE_VARIABLES: 'instanceVariables',
  LOGICAL_RECORDS: 'logicalRecords',
  NAME: 'name',
  REPRESENTED_VARIABLE: 'representedVariable',
  VARIABLE: 'variable'
};
const MODEL = {
  DATASET_TYPES: ['unitDataSet'],
  VARIABLE_TYPES: ['instanceVariable', 'representedVariable', 'variable']
};
const QUERY_HELPERS = {
  LINEAGE_DATASET: 'lineageDataset',
  REVERSE: {
    LF_IV: 'reverseLineageFieldInstanceVariable',
    IV_RV: 'reverseInstanceVariableRepresentedVariable',
    RV_V: 'reverseRepresentedVariableVariable',
    UDS_L: 'reverseUnitDataSetLineage'
  },
  SMART: 'smart'
};

const VALUATION_COLORS = {
  OPEN: daplaJsUtilities.SSB_COLORS.BLUE,
  INTERNAL: daplaJsUtilities.SSB_COLORS.GREEN,
  SHIELDED: daplaJsUtilities.SSB_COLORS.YELLOW,
  SENSITIVE: daplaJsUtilities.SSB_COLORS.RED
};

const RESULTS = {
  DATA_SOURCE_PATH: {
    en: 'Data source path',
    nb: 'Datasti'
  },
  DESCRIPTION: {
    en: 'Description',
    nb: 'Beskrivelse'
  },
  HAVE_FILTERED: (filtered, total) => ({
    en: `Reminder that you have filtered your search, in total there are ${total} hit(s), but you are only showing ${filtered}`,
    nb: `Obs, du har filtrert søket, totalt ${total} treff, men etter filtrering vises bare ${filtered}`
  }),
  NAME: {
    en: 'Name',
    nb: 'Navn'
  },
  VARIABLE_IN_DATASETS: {
    en: 'Variable linked in datasets',
    nb: 'Datasett denne variabelen er koblet til'
  },
  VARIABLES_IN_DATASET: {
    en: 'Variables linked to this dataset',
    nb: 'Variabler koblet til dette datasettet'
  }
};

const TEST_IDS = {
  ACCESS_SETTINGS_BUTTON: 'settingsCog',
  DEFAULT_SETTINGS_BUTTON: 'setDefaultSettings',
  DATASETS_ACCORDION_TOGGLE: 'datasetsAccordionToggle',
  SEARCH_DATASET_TOGGLE: 'searchDatasetToggle'
};

const UI = {
  API_ERROR_MESSAGE: {
    en: 'Something went wrong, check settings',
    nb: 'Noe gikk galt, sjekk innstillingene'
  },
  CONFIGURE_SEARCH: {
    en: 'Adjust search parameters',
    nb: 'Søkealternativer'
  },
  COPY_ID_TO_CLIPBOARD: {
    en: 'Click to copy id to clipboard',
    nb: 'Klikk for å kopiere id til utklippstavlen'
  },
  DATASETS: {
    en: 'Datasets',
    nb: 'Datasett'
  },
  EDITED: {
    en: 'Current results are from previous search',
    nb: 'Resultatene gjelder forrige søk'
  },
  HEADER: {
    en: 'Variable search',
    nb: 'Variabelsøk'
  },
  NEW_SEARCH: {
    en: 'Hit \'Enter\' for a new search',
    nb: 'Trykk \'Enter\' for et nytt søk'
  },
  NO_RESULTS: {
    en: 'Found nothing',
    nb: 'Fant ingenting'
  },
  OTHER: {
    en: 'Other:',
    nb: 'Annet:'
  },
  SEARCH: {
    en: 'Search...',
    nb: 'Søk...'
  },
  SEARCH_DATASETS: {
    en: 'Search for datasets as well?',
    nb: 'Søk etter datasett også?'
  },
  SHOW_OF_TYPE: (domain, language) => ({
    en: `Of ${UI[domain][language].toLowerCase()} show me: `,
    nb: `Av ${UI[domain][language].toLowerCase()} vis meg: `
  }),
  VARIABLES: {
    en: 'Variables',
    nb: 'Variabler'
  }
};

function ConfigureSearch({
  searchDataset,
  handleSearchDataset,
  variableTypeFilter,
  handleVariableTypeCheckbox,
  language
}) {
  const panels = [{
    key: 1,
    title: UI.CONFIGURE_SEARCH[language],
    content: {
      content: /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header, {
        size: "tiny",
        content: UI.SHOW_OF_TYPE('VARIABLES', language)[language]
      }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, MODEL.VARIABLE_TYPES.map(variableType => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
        key: variableType
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: variableType,
        checked: variableTypeFilter.includes(variableType),
        onClick: () => handleVariableTypeCheckbox(variableTypeFilter.includes(variableType), variableType)
      })))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
        hidden: true
      }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header, {
        size: "tiny",
        content: UI.OTHER[language]
      }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        toggle: true,
        checked: searchDataset,
        label: UI.SEARCH_DATASETS[language],
        "data-testid": TEST_IDS.SEARCH_DATASET_TOGGLE,
        onClick: () => handleSearchDataset(!searchDataset)
      }))
    }
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Accordion, {
    defaultActiveIndex: 0,
    panels: panels,
    styled: true
  });
}

function CopyToClipboard({
  id,
  type,
  language
}) {
  return /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    text: UI.COPY_ID_TO_CLIPBOARD[language],
    trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      link: true,
      fitted: true,
      size: "large",
      name: "copy outline",
      style: {
        color: daplaJsUtilities.SSB_COLORS.BLUE
      },
      onClick: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(id).then(() => {
            console.log(`Copied ${type} id to the clipboard: ${id}`);
          }, copyError => {
            console.log(copyError);
          });
        } else {
          console.log('Copy to clipboard not supported in your browser');
        }
      }
    })
  });
}

function SearchResultDatasets({
  datasets,
  lineageUrl,
  language
}) {
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very",
    selectable: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    collapsing: true
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.DESCRIPTION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.DATA_SOURCE_PATH[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VARIABLES_IN_DATASET[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, datasets.map(dataset => {
    const type = Object.keys(dataset)[0];
    const values = dataset[type];
    const {
      id,
      name,
      description,
      dataSourcePath
    } = values;
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
      textAlign: "center"
    }, /*#__PURE__*/React__default['default'].createElement(CopyToClipboard, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, name)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, description)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, dataSourcePath), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement("a", {
      href: `${lineageUrl}?id=${id}&type=dataset`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Sporing")));
  }))));
}

function FilterWarning({
  language,
  filtered,
  total
}) {
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
    name: "warning circle",
    style: {
      color: daplaJsUtilities.SSB_COLORS.BLUE
    }
  }), RESULTS.HAVE_FILTERED(filtered, total)[language], /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }));
}

function DatasetModal({
  dataset,
  language
}) {
  const {
    name,
    description
  } = dataset;
  const localizedName = daplaJsUtilities.getLocalizedGsimObjectText(language, name);
  const localizedDescription = daplaJsUtilities.getLocalizedGsimObjectText(language, description);
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Modal, {
    style: daplaJsUtilities.SSB_STYLE,
    content: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Segment, {
      basic: true
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, null, Object.entries(dataset).map(([entry, value]) => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, {
      key: entry
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
      width: 4
    }, /*#__PURE__*/React__default['default'].createElement("b", null, entry)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
      width: 12
    }, entry === GSIM.NAME || entry === GSIM.DESCRIPTION ? daplaJsUtilities.getLocalizedGsimObjectText(language, value) : value))))),
    trigger: /*#__PURE__*/React__default['default'].createElement("p", null, /*#__PURE__*/React__default['default'].createElement("b", null, localizedName), /*#__PURE__*/React__default['default'].createElement("br", null), localizedDescription)
  });
}

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
};
const DATASETS_FROM_LINEAGE = variableType => fromVariableType[variableType];
const FULL_TEXT_SEARCH = `
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
`;

const findThroughRepresented = (cur, type) => {
  const lineageFieldsRepresented = cur[type][QUERY_HELPERS.REVERSE.IV_RV];
  const potentialLineageFieldsRepresented = [];
  let returnValue = false;

  if (lineageFieldsRepresented.length !== 0) {
    lineageFieldsRepresented.forEach(lineageFieldRepresented => lineageFieldRepresented[QUERY_HELPERS.REVERSE.LF_IV].forEach(instanceVariables => potentialLineageFieldsRepresented.push(instanceVariables)));

    if (potentialLineageFieldsRepresented.length !== 0) {
      returnValue = potentialLineageFieldsRepresented;
    }
  }

  return returnValue;
};

const findThroughVariable = (cur, type) => {
  const lineageFieldsVariable = cur[type][QUERY_HELPERS.REVERSE.RV_V];
  const potentialRepresented = [];
  const potentialLineageFieldsVariable = [];
  let returnValue;

  if (lineageFieldsVariable.length !== 0) {
    lineageFieldsVariable.forEach(lineageFieldVariable => lineageFieldVariable[QUERY_HELPERS.REVERSE.IV_RV].forEach(representedVariables => potentialRepresented.push(representedVariables)));

    if (potentialRepresented.length !== 0) {
      potentialRepresented.forEach(representedVariables => representedVariables[QUERY_HELPERS.REVERSE.LF_IV].forEach(instanceVariables => potentialLineageFieldsVariable.push(instanceVariables)));

      if (potentialLineageFieldsVariable.length !== 0) {
        returnValue = potentialLineageFieldsVariable;
      }
    }
  }

  return returnValue;
};

const drillVariables = (data, type) => data.reduce((acc, cur) => {
  const datasets = [];
  let lineageFields;

  switch (type) {
    case GSIM.INSTANCE_VARIABLE:
      lineageFields = cur[type][QUERY_HELPERS.REVERSE.LF_IV];
      break;

    case GSIM.REPRESENTED_VARIABLE:
      lineageFields = findThroughRepresented(cur, type);
      break;

    case GSIM.VARIABLE:
      lineageFields = findThroughVariable(cur, type);
      break;

    default:
      lineageFields = cur[type][QUERY_HELPERS.REVERSE.LF_IV];
  }

  if (lineageFields && lineageFields.length !== 0) {
    lineageFields.forEach(lineageField => {
      const smart = lineageField[QUERY_HELPERS.SMART];

      if (smart.length !== 0) {
        const dataset = smart.filter(dataset => dataset[QUERY_HELPERS.LINEAGE_DATASET].hasOwnProperty(QUERY_HELPERS.REVERSE.UDS_L) && dataset[QUERY_HELPERS.LINEAGE_DATASET][QUERY_HELPERS.REVERSE.UDS_L].length !== 0);

        if (dataset.length !== 0) {
          dataset.forEach(dataset => {
            dataset[QUERY_HELPERS.LINEAGE_DATASET][QUERY_HELPERS.REVERSE.UDS_L].forEach(lineage => datasets.push(lineage));
          });
        }
      }
    });
  }

  return datasets;
}, []);
const splitSearchResult = results => {
  const variables = results.filter(result => MODEL.VARIABLE_TYPES.some(variable => Object.getOwnPropertyNames(result).includes(variable)));
  const datasets = results.filter(result => MODEL.DATASET_TYPES.some(dataset => Object.getOwnPropertyNames(result).includes(dataset)));
  return {
    variables: variables,
    datasets: datasets
  };
};

function VariableInDatasetLookup({
  id,
  type,
  language
}) {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [retrievedDatasets, setRetrievedDatasets] = React.useState([]);
  const [fetchResults, {
    loading,
    error,
    data
  }] = graphqlHooks.useManualQuery(DATASETS_FROM_LINEAGE(type), {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data) && data.length !== 0) {
        const datasets = drillVariables(data, type);
        const filteredDatasets = datasets.filter((dataset, index, a) => a.findIndex(t => t.id === dataset.id) === index);

        if (datasets.length !== filteredDatasets.length) {
          console.log('Unfiltered datasets');
          console.log(datasets);
        }

        setRetrievedDatasets(filteredDatasets);
      }
    }
  }, [loading, error, data, type, language]);

  const handleTitleClick = (e, {
    index
  }) => {
    if (activeIndex !== index) {
      // noinspection JSIgnoredPromiseFromCall
      fetchResults();
    }

    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const panels = [{
    key: 1,
    title: {
      content: /*#__PURE__*/React__default['default'].createElement("b", null, RESULTS.VARIABLE_IN_DATASETS[language]),
      'data-testid': TEST_IDS.DATASETS_ACCORDION_TOGGLE
    },
    content: {
      content: loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
        loading: true,
        name: "spinner"
      }) : retrievedDatasets.length >= 1 ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, {
        bulleted: true,
        relaxed: true,
        style: {
          padding: '0 1rem 1rem 1rem'
        }
      }, retrievedDatasets.map(dataset => {
        const {
          id
        } = dataset;
        return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
          key: id,
          as: "a"
        }, /*#__PURE__*/React__default['default'].createElement(DatasetModal, {
          dataset: dataset,
          language: language
        }));
      })) : UI.NO_RESULTS[language]
    }
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Accordion, {
    activeIndex: activeIndex,
    panels: panels,
    onTitleClick: handleTitleClick
  });
}

function SearchResultVariables({
  language,
  lineageUrl,
  variables,
  variableTypeFilter
}) {
  const [filteredVariables, setFilteredVariables] = React.useState(variables.filter(variable => variableTypeFilter.includes(Object.keys(variable)[0])));
  React.useEffect(() => {
    setFilteredVariables(variables.filter(variable => variableTypeFilter.includes(Object.keys(variable)[0])));
  }, [variables, variableTypeFilter]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, variableTypeFilter.length !== 3 && /*#__PURE__*/React__default['default'].createElement(FilterWarning, {
    language: language,
    filtered: filteredVariables.length,
    total: variables.length
  }), filteredVariables.map(variable => {
    const type = Object.keys(variable)[0];
    const values = variable[type];
    const {
      id,
      name,
      description
    } = values;
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Segment, {
      key: id,
      raised: true
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      ribbon: true,
      color: "blue"
    }, type), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      attached: "top right"
    }, /*#__PURE__*/React__default['default'].createElement(CopyToClipboard, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, {
      columns: "equal"
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
      hidden: true,
      style: {
        marginBottom: 0
      }
    }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
      width: 4
    }, /*#__PURE__*/React__default['default'].createElement("b", null, RESULTS.NAME[language])), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
      width: 12
    }, daplaJsUtilities.getLocalizedGsimObjectText(language, name))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
      width: 4
    }, /*#__PURE__*/React__default['default'].createElement("b", null, RESULTS.DESCRIPTION[language])), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
      width: 12
    }, daplaJsUtilities.getLocalizedGsimObjectText(language, description))))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(VariableInDatasetLookup, {
      id: id,
      type: type,
      language: language
    }))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
      hidden: true
    }), /*#__PURE__*/React__default['default'].createElement("a", {
      href: `${lineageUrl}?id=${id}&type=${type}`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Sporing"));
  }));
}

function AppHome({
  lineageUrl,
  language
}) {
  const [searched, setSearched] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchEdited, setSearchEdited] = React.useState(false);
  const [searchDataset, setSearchDataset] = React.useState(false);
  const [previousSearch, setPreviousSearch] = React.useState('');
  const [datasetResults, setDatasetResults] = React.useState([]);
  const [variableResults, setVariableResults] = React.useState([]);
  const [variableTypeFilter, setVariableTypeFilter] = React.useState(MODEL.VARIABLE_TYPES);
  const [fetchResults, {
    loading,
    error,
    data
  }] = graphqlHooks.useManualQuery(FULL_TEXT_SEARCH, {
    variables: {
      text: searchValue.trim()
    }
  });
  React.useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const searchResults = splitSearchResult(data);
      setDatasetResults(searchResults.datasets);
      setVariableResults(searchResults.variables);
    }
  }, [error, loading, data, language]);

  const doSearch = () => {
    if (searchValue.length >= 1) {
      setSearched(true);
      setSearchEdited(false);
      setPreviousSearch(searchValue); // noinspection JSIgnoredPromiseFromCall

      fetchResults();
    }
  };

  const handleVariableTypeCheckbox = (includes, variableType) => {
    if (includes) {
      setVariableTypeFilter(variableTypeFilter.filter(element => element !== variableType));
    } else {
      setVariableTypeFilter(variableTypeFilter.concat([variableType]));
    }
  };

  const handleSearchDataset = value => setSearchDataset(value);

  const panes = [{
    menuItem: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Menu.Item, {
      key: "variables"
    }, UI.VARIABLES[language], /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      style: {
        background: daplaJsUtilities.SSB_COLORS.BLUE
      }
    }, loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      loading: true,
      name: "spinner"
    }) : variableResults.length)),
    render: () => variableResults.length >= 1 ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Tab.Pane, {
      as: semanticUiReact.Segment,
      basic: true,
      style: {
        border: 'none'
      }
    }, /*#__PURE__*/React__default['default'].createElement(SearchResultVariables, {
      language: language,
      lineageUrl: lineageUrl,
      variables: variableResults,
      variableTypeFilter: variableTypeFilter
    })) : null
  }, {
    menuItem: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Menu.Item, {
      key: "datasets"
    }, UI.DATASETS[language], /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      style: {
        background: daplaJsUtilities.SSB_COLORS.BLUE
      }
    }, loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      loading: true,
      name: "spinner"
    }) : datasetResults.length)),
    render: () => datasetResults.length >= 1 ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Tab.Pane, {
      as: semanticUiReact.Segment,
      basic: true,
      style: {
        border: 'none'
      }
    }, /*#__PURE__*/React__default['default'].createElement(SearchResultDatasets, {
      language: language,
      lineageUrl: lineageUrl,
      datasets: datasetResults
    })) : null
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 3
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Container, {
    textAlign: "center"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Search, {
    size: "huge",
    open: false,
    loading: loading,
    value: searchValue,
    placeholder: UI.SEARCH[language],
    onKeyPress: ({
      key
    }) => key === 'Enter' && doSearch(),
    onSearchChange: (event, {
      value
    }) => {
      setSearchEdited(true);
      setSearchValue(value);
    }
  }), searched && searchEdited && /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoText, {
    text: UI.EDITED[language]
  }), searched && searchEdited && previousSearch !== '' && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, ` '`, /*#__PURE__*/React__default['default'].createElement("b", null, previousSearch), `'`, /*#__PURE__*/React__default['default'].createElement("p", null, UI.NEW_SEARCH[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), /*#__PURE__*/React__default['default'].createElement(ConfigureSearch, {
    language: language,
    searchDataset: searchDataset,
    variableTypeFilter: variableTypeFilter,
    handleSearchDataset: handleSearchDataset,
    handleVariableTypeCheckbox: handleVariableTypeCheckbox
  })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 13
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Tab, {
    defaultActiveIndex: 0,
    menu: {
      secondary: true,
      pointing: true
    },
    panes: searchDataset ? panes : [panes.shift()]
  })));
}

exports.VariableSearch = AppHome;
