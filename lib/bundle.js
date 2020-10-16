'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlHooks = require('graphql-hooks');
var semanticUiReact = require('semantic-ui-react');
var daplaJsUtilities = require('@statisticsnorway/dapla-js-utilities');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const MODEL = {
  DATASET_TYPES: ['unitDataSet'],
  ID: 'id',
  VARIABLE_TYPES: ['instanceVariable', 'representedVariable', 'variable']
};

const VALUATION_COLORS = {
  OPEN: daplaJsUtilities.SSB_COLORS.BLUE,
  INTERNAL: daplaJsUtilities.SSB_COLORS.GREEN,
  SHIELDED: daplaJsUtilities.SSB_COLORS.YELLOW,
  SENSITIVE: daplaJsUtilities.SSB_COLORS.RED
};

const RESULTS = {
  DESCRIPTION: {
    en: 'Description',
    nb: 'Beskrivelse'
  },
  DIRECT: {
    en: 'Direct',
    nb: 'Direkte'
  },
  HAVE_FILTERED: (filtered, total) => ({
    en: `Reminder that you have filtered your search, in total there are ${total} hit(s), but you are only showing ${filtered}`,
    nb: `Obs, du har filtrert søket, totalt ${total} treff, men etter filtrering vises bare ${filtered}`
  }),
  LINEAGE: {
    en: 'Indirect',
    nb: 'Indirekte'
  },
  NAME: {
    en: 'Name',
    nb: 'Navn'
  },
  VALUATION: {
    en: 'Valuation',
    nb: 'Verdivurdering'
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
  BOXES: {
    en: 'Boxes',
    nb: 'Bokser'
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
  SEARCH: {
    en: 'Search...',
    nb: 'Søk...'
  },
  SEARCH_DATASETS: {
    en: 'Search for datasets as well:',
    nb: 'Søk etter datasett også?'
  },
  SHOW_OF_TYPE: (domain, language) => ({
    en: `Of ${UI[domain][language].toLowerCase()} show me: `,
    nb: `Av ${UI[domain][language].toLowerCase()} vis meg: `
  }),
  SHOW_RESULTS_AS: {
    en: 'Show results as:',
    nb: 'Vis resultater som:'
  },
  TABLE: {
    en: 'Table',
    nb: 'Tabell'
  },
  VARIABLES: {
    en: 'Variables',
    nb: 'Variabler'
  }
};

function ConfigureSearch({
  searchDataset,
  resultAsBoxes,
  handleSearchDataset,
  handleResultAsBoxes,
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
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SHOW_RESULTS_AS[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: UI.BOXES[language],
        checked: resultAsBoxes,
        onClick: () => handleResultAsBoxes(true)
      })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: UI.TABLE[language],
        checked: !resultAsBoxes,
        onClick: () => handleResultAsBoxes(false)
      }))))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SHOW_OF_TYPE('VARIABLES', language)[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, MODEL.VARIABLE_TYPES.map(variableType => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
        key: variableType
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: variableType,
        checked: variableTypeFilter.includes(variableType),
        onClick: () => handleVariableTypeCheckbox(variableTypeFilter.includes(variableType), variableType)
      })))))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SEARCH_DATASETS[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        checked: searchDataset,
        "data-testid": TEST_IDS.SEARCH_DATASET_TOGGLE,
        onClick: () => handleSearchDataset(!searchDataset)
      }))))
    }
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Accordion, {
    defaultActiveIndex: -1,
    panels: panels
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
  language
}) {
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very",
    selectable: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    collapsing: true
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.DESCRIPTION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VALUATION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VARIABLES_IN_DATASET[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, datasets.map(dataset => {
    const type = Object.keys(dataset)[0];
    const values = dataset[type];
    const {
      id,
      name,
      description,
      valuation,
      unitDataStructure
    } = values;
    const something = daplaJsUtilities.getNestedObject(unitDataStructure, ['logicalRecords']).map(entry => entry['instanceVariables']);
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
      textAlign: "center"
    }, /*#__PURE__*/React__default['default'].createElement(CopyToClipboard, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, name)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, description)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement("span", {
      style: {
        color: VALUATION_COLORS[valuation]
      }
    }, valuation)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, something.length === 0 ? '-' : /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, {
      bulleted: true
    }, something.map(thing => thing.map(thingy => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
      key: thingy.id
    }, daplaJsUtilities.getLocalizedGsimObjectText(language, thingy.name), /*#__PURE__*/React__default['default'].createElement("br", null), /*#__PURE__*/React__default['default'].createElement("i", null, daplaJsUtilities.getLocalizedGsimObjectText(language, thingy.description))))))));
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
    name
  } = dataset;
  const localizedName = daplaJsUtilities.getLocalizedGsimObjectText(language, name);
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
    }, entry === 'name' || entry === 'description' ? daplaJsUtilities.getLocalizedGsimObjectText(language, value) : value))))),
    trigger: /*#__PURE__*/React__default['default'].createElement("span", null, localizedName)
  });
}

const fromVariableType = {
  instanceVariable: 'id: $id',
  representedVariable: 'representedVariable: {id: $id}',
  variable: 'representedVariable: {variable: {id: $id}}'
};
const DATASETS_FROM_LINEAGE = variableType => `
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
`;
const FULL_TEXT_SEARCH = `
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
  }] = graphqlHooks.useManualQuery(DATASETS_FROM_LINEAGE(type), {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data) && data.length !== 0) {
        //TODO: Drop this filter when backend correctly removes nameless results
        setRetrievedDatasets(data.map(dataset => dataset[MODEL.DATASET_TYPES[0]]).filter(dataset => {
          const {
            name
          } = dataset;
          const extractedName = daplaJsUtilities.getLocalizedGsimObjectText(language, name);
          return extractedName !== '';
        }));
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
  resultAsBoxes,
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
  }), resultAsBoxes ? filteredVariables.map(variable => {
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
    }))));
  }) : /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very",
    selectable: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    collapsing: true
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.DESCRIPTION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, filteredVariables.map(variable => {
    const type = Object.keys(variable)[0];
    const values = variable[type];
    const {
      id,
      name,
      description
    } = values;
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
      textAlign: "center",
      collapsing: true
    }, /*#__PURE__*/React__default['default'].createElement(CopyToClipboard, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
      text: type,
      trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, name))
    }), /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
      text: type,
      trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, daplaJsUtilities.getLocalizedGsimObjectText(language, description))
    }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement(VariableInDatasetLookup, {
      id: id,
      type: type,
      language: language
    })));
  }))));
}

const splitSearchResult = (results, language) => {
  const variables = results.filter(result => MODEL.VARIABLE_TYPES.some(variable => Object.getOwnPropertyNames(result).includes(variable) && result['id'] !== null));
  const datasets = results.filter(result => MODEL.DATASET_TYPES.some(dataset => Object.getOwnPropertyNames(result).includes(dataset)) //TODO: Drop this filter when backend correctly removes nameless results
  ).filter(dataset => {
    const {
      name
    } = dataset[MODEL.DATASET_TYPES[0]];
    const extractedName = daplaJsUtilities.getLocalizedGsimObjectText(language, name);
    return extractedName !== '';
  });
  return {
    variables: variables,
    datasets: datasets
  };
};

function AppHome({
  language
}) {
  const [searched, setSearched] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchEdited, setSearchEdited] = React.useState(false);
  const [resultAsBoxes, setResultAsBoxes] = React.useState(true);
  const [searchDataset, setSearchDataset] = React.useState(false);
  const [previousSearch, setPreviousSearch] = React.useState('');
  const [datasetResults, setDatasetResults] = React.useState([]);
  const [variableResults, setVariableResults] = React.useState([]);
  const [variableTypeFilter, setVariableTypeFilter] = React.useState([MODEL.VARIABLE_TYPES[1]]);
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
      const searchResults = splitSearchResult(data, language);
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

  const handleResultAsBoxes = value => setResultAsBoxes(value);

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
      variables: variableResults,
      resultAsBoxes: resultAsBoxes,
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
      datasets: datasetResults
    })) : null
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 3
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
  }), searched && searchEdited && previousSearch !== '' && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, ` '`, /*#__PURE__*/React__default['default'].createElement("b", null, previousSearch), `'`, /*#__PURE__*/React__default['default'].createElement("p", null, UI.NEW_SEARCH[language])), /*#__PURE__*/React__default['default'].createElement(ConfigureSearch, {
    language: language,
    resultAsBoxes: resultAsBoxes,
    searchDataset: searchDataset,
    variableTypeFilter: variableTypeFilter,
    handleResultAsBoxes: handleResultAsBoxes,
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
