'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlHooks = require('graphql-hooks');
var semanticUiReact = require('semantic-ui-react');
var daplaJsUtilities = require('@statisticsnorway/dapla-js-utilities');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const RESULTS = {
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
  TYPE: {
    en: 'Type',
    nb: 'Type'
  },
  VARIABLE_IN_DATASETS: {
    en: 'Variable used in datasets',
    nb: 'Datasett variabelen er brukt i'
  }
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
  DATASETS: {
    en: 'Datasets',
    nb: 'Datasett'
  },
  EDITED: {
    en: 'Current results came from a previous search',
    nb: 'Resultatene som foreligger gjelder forrige søk'
  },
  EXTERNAL_GRAPHIQL: {
    en: 'Access GraphiQL directly',
    nb: 'Skriv Graphql spørringer direkte mot tjenesten'
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
  PREVIOUS: {
    en: 'wich was: ',
    nb: 'som var: '
  },
  SEARCH: {
    en: 'Search...',
    nb: 'Søk...'
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

const instanceVariable = ['reverseLogicalRecordInstanceVariables', 'reverseUnitDataStructureLogicalRecords', 'reverseUnitDataSetUnitDataStructure'];
const representedVariable = ['reverseInstanceVariableRepresentedVariable'].concat(instanceVariable);
const variable = ['reverseRepresentedVariableVariable'].concat(representedVariable);
const MODEL = {
  DATASET_TYPES: ['dimensionalDataSet', 'unitDataSet'],
  REVERSE: {
    instanceVariable: instanceVariable,
    representedVariable: representedVariable,
    variable: variable
  },
  VARIABLE_TYPES: ['instanceVariable', 'representedVariable', 'variable']
};

const VALUATION_COLORS = {
  OPEN: daplaJsUtilities.SSB_COLORS.BLUE,
  INTERNAL: daplaJsUtilities.SSB_COLORS.GREEN,
  SHIELDED: daplaJsUtilities.SSB_COLORS.YELLOW,
  SENSITIVE: daplaJsUtilities.SSB_COLORS.RED
};

function ConfigureSearch({
  datasetTypeFilter,
  handleDatasetTypeCheckbox,
  variableTypeFilter,
  handleVariableTypeCheckbox,
  language
}) {
  const panels = [{
    key: 1,
    title: UI.CONFIGURE_SEARCH[language],
    content: {
      content: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, {
        columns: "equal"
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SHOW_OF_TYPE('DATASETS', language)[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, MODEL.DATASET_TYPES.map(datasetType => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        key: datasetType,
        label: datasetType,
        checked: datasetTypeFilter.includes(datasetType),
        onClick: () => handleDatasetTypeCheckbox(datasetTypeFilter.includes(datasetType), datasetType)
      })))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SHOW_OF_TYPE('VARIABLES', language)[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, MODEL.VARIABLE_TYPES.map(variableType => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        key: variableType,
        label: variableType,
        checked: variableTypeFilter.includes(variableType),
        onClick: () => handleVariableTypeCheckbox(variableTypeFilter.includes(variableType), variableType)
      })))))
    }
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Accordion, {
    defaultActiveIndex: -1,
    panels: panels
  });
}

function FilterWarning({
  language,
  filtered,
  total
}) {
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
    name: "warning circle",
    style: {
      color: daplaJsUtilities.SSB_COLORS.YELLOW
    }
  }), RESULTS.HAVE_FILTERED(filtered, total)[language], /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }));
}

function SearchResultDatasets({
  datasets,
  datasetTypeFilter,
  language
}) {
  const [filteredDatasets, setFilteredDatasets] = React.useState(datasets.filter(dataset => datasetTypeFilter.includes(Object.keys(dataset)[0])));
  React.useEffect(() => {
    setFilteredDatasets(datasets.filter(dataset => datasetTypeFilter.includes(Object.keys(dataset)[0])));
  }, [datasets, datasetTypeFilter]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, datasetTypeFilter.length !== 2 && /*#__PURE__*/React__default['default'].createElement(FilterWarning, {
    language: language,
    filtered: filteredDatasets.length,
    total: datasets.length
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very",
    selectable: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.DESCRIPTION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.TYPE[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, filteredDatasets.map(dataset => {
    const type = Object.keys(dataset)[0];
    const values = dataset[type];
    const {
      id,
      name,
      description
    } = values;
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, name)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, description)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, type));
  }))));
}

const DATASETS_FROM = {
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
};
const FULL_TEXT_SEARCH = `
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
`;

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
  }] = graphqlHooks.useManualQuery(DATASETS_FROM[type], {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      const datasets = [];
      const reverseDatasets = data[0][type];

      const getDatasets = (reverseDatasets, i = 0) => {
        if (Array.isArray(reverseDatasets)) {
          if (reverseDatasets.length >= 1) {
            reverseDatasets.forEach(entry => getDatasets(entry, i));
          }
        } else {
          if (reverseDatasets.hasOwnProperty(MODEL.REVERSE[type][i])) {
            getDatasets(reverseDatasets[MODEL.REVERSE[type][i]], i + 1);
          }

          if (reverseDatasets.hasOwnProperty('id')) {
            datasets.push(reverseDatasets);
          }
        }
      };

      getDatasets(reverseDatasets);
      setRetrievedDatasets(datasets);
    }
  }, [loading, error, data, type]);

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
    title: '',
    content: {
      content: loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
        loading: true,
        name: "spinner"
      }) : retrievedDatasets.length >= 1 ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, retrievedDatasets.map(dataset => {
        const {
          id,
          name
        } = dataset;
        return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
          key: id
        }, daplaJsUtilities.getLocalizedGsimObjectText(language, name));
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
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very",
    selectable: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VARIABLE_IN_DATASETS[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.TYPE[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, filteredVariables.map(variable => {
    const type = Object.keys(variable)[0];
    const values = variable[type];
    const {
      id,
      name,
      description
    } = values;
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Popup, {
      basic: true,
      flowing: true,
      size: "large",
      position: "right center",
      trigger: /*#__PURE__*/React__default['default'].createElement("span", null, daplaJsUtilities.getLocalizedGsimObjectText(language, name))
    }, daplaJsUtilities.getLocalizedGsimObjectText(language, description))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement(VariableInDatasetLookup, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, type));
  }))));
}

const splitSearchResult = results => {
  const variables = results.filter(result => MODEL.VARIABLE_TYPES.some(variable => Object.getOwnPropertyNames(result).includes(variable)));
  const datasets = results.filter(result => MODEL.DATASET_TYPES.some(dataset => Object.getOwnPropertyNames(result).includes(dataset)));
  return {
    variables: variables,
    datasets: datasets
  };
};

function AppHome({
  restApi,
  language
}) {
  const [searched, setSearched] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchEdited, setSearchEdited] = React.useState(false);
  const [previousSearch, setPreviousSearch] = React.useState('');
  const [datasetResults, setDatasetResults] = React.useState([]);
  const [variableResults, setVariableResults] = React.useState([]);
  const [datasetTypeFilter, setDatasetTypeFilter] = React.useState(MODEL.DATASET_TYPES);
  const [variableTypeFilter, setVariableTypeFilter] = React.useState(MODEL.VARIABLE_TYPES);
  const [fetchResults, {
    loading,
    error,
    data
  }] = graphqlHooks.useManualQuery(FULL_TEXT_SEARCH, {
    variables: {
      text: searchValue
    }
  });
  React.useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const searchResults = splitSearchResult(data);
      setDatasetResults(searchResults.datasets);
      setVariableResults(searchResults.variables);
    }
  }, [error, loading, data]);

  const doSearch = () => {
    if (searchValue.length >= 1) {
      setSearched(true);
      setSearchEdited(false);
      setPreviousSearch(searchValue); // noinspection JSIgnoredPromiseFromCall

      fetchResults();
    }
  };

  const handleDatasetTypeCheckbox = (includes, datasetType) => {
    if (includes) {
      setDatasetTypeFilter(datasetTypeFilter.filter(element => element !== datasetType));
    } else {
      setDatasetTypeFilter(datasetTypeFilter.concat([datasetType]));
    }
  };

  const handleVariableTypeCheckbox = (includes, variableType) => {
    if (includes) {
      setVariableTypeFilter(variableTypeFilter.filter(element => element !== variableType));
    } else {
      setVariableTypeFilter(variableTypeFilter.concat([variableType]));
    }
  };

  const panes = [{
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
      datasets: datasetResults,
      datasetTypeFilter: datasetTypeFilter
    })) : null
  }, {
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
      variables: variableResults,
      variableTypeFilter: variableTypeFilter
    })) : null
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 4
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
    attached: "top right",
    style: {
      background: 'transparent'
    }
  }, /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    position: "right center",
    text: UI.EXTERNAL_GRAPHIQL[language],
    trigger: /*#__PURE__*/React__default['default'].createElement("a", {
      href: `${restApi}/graphiql`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      link: true,
      size: "large",
      name: "external",
      style: {
        color: daplaJsUtilities.SSB_COLORS.BLUE
      }
    }))
  })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Search, {
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
  }), searched && searchEdited && previousSearch !== '' && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, ` (`, /*#__PURE__*/React__default['default'].createElement("i", null, UI.PREVIOUS[language]), `'`, /*#__PURE__*/React__default['default'].createElement("b", null, previousSearch), `')`, /*#__PURE__*/React__default['default'].createElement("p", null, UI.NEW_SEARCH[language])), /*#__PURE__*/React__default['default'].createElement(ConfigureSearch, {
    language: language,
    datasetTypeFilter: datasetTypeFilter,
    variableTypeFilter: variableTypeFilter,
    handleDatasetTypeCheckbox: handleDatasetTypeCheckbox,
    handleVariableTypeCheckbox: handleVariableTypeCheckbox
  })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 12
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Tab, {
    defaultActiveIndex: -1,
    menu: {
      secondary: true,
      pointing: true
    },
    panes: panes
  })));
}

exports.VariableSearch = AppHome;
