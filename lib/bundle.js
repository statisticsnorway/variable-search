'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlHooks = require('graphql-hooks');
var semanticUiReact = require('semantic-ui-react');
var daplaJsUtilities = require('@statisticsnorway/dapla-js-utilities');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const instanceVariable = ['reverseLogicalRecordInstanceVariables', 'reverseUnitDataStructureLogicalRecords', 'reverseUnitDataSetUnitDataStructure'];
const representedVariable = ['reverseInstanceVariableRepresentedVariable'].concat(instanceVariable);
const variable = ['reverseRepresentedVariableVariable'].concat(representedVariable);
const API = {
  GET_HEALTH: '/health/ready',
  GRAPHQL: '/graphql',
  GRAPHIQL: '/graphiql',
  SEARCH_METHODS: ['filter', 'reverse']
};
const MODEL = {
  DATASET_TYPES: ['dimensionalDataSet', 'unitDataSet'],
  ID: 'id',
  LINEAGE_FIELD_TYPES: ['lineageField'],
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

const RESULTS = {
  CONFIDENCE: {
    en: 'Confidence',
    nb: 'Confidence'
  },
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
  INSTANCE_VARIABLE: {
    en: 'Instance Variable',
    nb: 'Instansvariabel'
  },
  LINEAGE: {
    en: 'Lineage',
    nb: 'Lineage'
  },
  LINEAGE_FIELD_IN_LINEAGE_DATASETS: {
    en: 'Lineage field in Lineage datasets',
    nb: 'Lineage field in Lineage datasets'
  },
  NAME: {
    en: 'Name',
    nb: 'Navn'
  },
  RELATION_TYPE: {
    en: 'Relation type',
    nb: 'Relasjonstype'
  },
  SHORT_NAME: {
    en: 'Short name',
    nb: 'Kortnavn'
  },
  TYPE: {
    en: 'Type',
    nb: 'Type'
  },
  VALUATION: {
    en: 'Valuation',
    nb: 'Verdivurdering'
  },
  VARIABLE_IN_DATASETS: {
    en: 'Variable used in datasets',
    nb: 'Datasett variabelen er brukt i'
  },
  VARIABLES_IN_DATASET: {
    en: 'Variables in this dataset',
    nb: 'Variabler i dette datasettet'
  }
};

const TEST_IDS = {
  ACCESS_SETTINGS_BUTTON: 'settingsCog',
  DEFAULT_SETTINGS_BUTTON: 'setDefaultSettings',
  DATASETS_ACCORDION_TOGGLE: 'datasetsAccordionToggle'
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
  LINEAGE_FIELDS: {
    en: 'Lineage',
    nb: 'Lineage'
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
  SEARCH_METHOD: {
    en: 'Search method:',
    nb: 'Søkemetode:'
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
  datasetTypeFilter,
  handleDatasetTypeCheckbox,
  chosenSearchMethod,
  handleSearchMethodCheckbox,
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
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SHOW_OF_TYPE('DATASETS', language)[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, MODEL.DATASET_TYPES.map(datasetType => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
        key: datasetType
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: datasetType,
        checked: datasetTypeFilter.includes(datasetType),
        onClick: () => handleDatasetTypeCheckbox(datasetTypeFilter.includes(datasetType), datasetType)
      })))))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SHOW_OF_TYPE('VARIABLES', language)[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, MODEL.VARIABLE_TYPES.map(variableType => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
        key: variableType
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: variableType,
        checked: variableTypeFilter.includes(variableType),
        onClick: () => handleVariableTypeCheckbox(variableTypeFilter.includes(variableType), variableType)
      })))))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, UI.SEARCH_METHOD[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, null, API.SEARCH_METHODS.map(searchMethod => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, {
        key: searchMethod
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
        label: searchMethod,
        checked: searchMethod === chosenSearchMethod,
        onClick: () => handleSearchMethodCheckbox(searchMethod)
      })))))))
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

function CopyToClipboard({
  id,
  type,
  language
}) {
  return /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    text: UI.COPY_ID_TO_CLIPBOARD[language],
    trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      link: true,
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
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.DESCRIPTION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VALUATION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.TYPE[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VARIABLES_IN_DATASET[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, filteredDatasets.map(dataset => {
    const type = Object.keys(dataset)[0];
    const values = dataset[type];
    const {
      id,
      name,
      description,
      valuation,
      lineage
    } = values;
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
    }, valuation)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, type), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, lineage));
  }))));
}

function SearchResultLineage({
  language,
  lineageFields
}) {
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very",
    selectable: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.LINEAGE_FIELD_IN_LINEAGE_DATASETS[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.RELATION_TYPE[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.CONFIDENCE[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.INSTANCE_VARIABLE[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, lineageFields.map(lineageField => {
    const type = Object.keys(lineageField)[0];
    const {
      id,
      name,
      confidence,
      relationType,
      lineageDataset,
      instanceVariable
    } = lineageField[type];
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
      textAlign: "center"
    }, /*#__PURE__*/React__default['default'].createElement(CopyToClipboard, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, name), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, lineageDataset !== null && lineageDataset !== undefined && lineageDataset.id), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, relationType), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, confidence), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, instanceVariable !== null && instanceVariable !== undefined && instanceVariable.toString()));
  })));
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

const DATASETS_FROM_FILTER = {
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
};
const DATASETS_FROM_LINEAGE = {
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
};
const DATASETS_FROM_REVERSE = {
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
};
const FULL_TEXT_SEARCH = `
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
`;

function VariableInDatasetFilterLookup({
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
  }] = graphqlHooks.useManualQuery(DATASETS_FROM_FILTER[type], {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data) && data.length !== 0) {
        setRetrievedDatasets(data.map(dataset => dataset[MODEL.DATASET_TYPES[1]]));
      }
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
    title: {
      content: RESULTS.DIRECT[language],
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

function VariableInDatasetLineageLookup({
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
  }] = graphqlHooks.useManualQuery(DATASETS_FROM_LINEAGE[type], {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data) && data.length !== 0) {
        setRetrievedDatasets(data.map(dataset => dataset[MODEL.DATASET_TYPES[1]]));
      }
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
    title: {
      content: RESULTS.LINEAGE[language],
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

function VariableInDatasetReverseLookup({
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
  }] = graphqlHooks.useManualQuery(DATASETS_FROM_REVERSE[type], {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      const datasets = [];

      if (Array.isArray(data) && data.length !== 0) {
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

            if (reverseDatasets.hasOwnProperty(MODEL.ID)) {
              datasets.push(reverseDatasets);
            }
          }
        };

        getDatasets(reverseDatasets);
        setRetrievedDatasets(datasets);
      }
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
    title: {
      content: RESULTS.DIRECT[language],
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
  searchMethod,
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
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.NAME[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.VARIABLE_IN_DATASETS[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.TYPE[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, RESULTS.SHORT_NAME[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, filteredVariables.map(variable => {
    const type = Object.keys(variable)[0];
    const values = variable[type];
    const {
      id,
      name,
      description,
      shortName
    } = values;
    return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
      key: id
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
      textAlign: "center"
    }, /*#__PURE__*/React__default['default'].createElement(CopyToClipboard, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Popup, {
      basic: true,
      flowing: true,
      size: "large",
      position: "right center",
      trigger: /*#__PURE__*/React__default['default'].createElement("span", null, daplaJsUtilities.getLocalizedGsimObjectText(language, name))
    }, daplaJsUtilities.getLocalizedGsimObjectText(language, description))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, searchMethod === API.SEARCH_METHODS[0] ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(VariableInDatasetFilterLookup, {
      id: id,
      type: type,
      language: language
    }), /*#__PURE__*/React__default['default'].createElement(VariableInDatasetLineageLookup, {
      id: id,
      type: type,
      language: language
    })) : /*#__PURE__*/React__default['default'].createElement(VariableInDatasetReverseLookup, {
      id: id,
      type: type,
      language: language
    })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, type), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, shortName));
  }))));
}

const splitSearchResult = results => {
  const variables = results.filter(result => MODEL.VARIABLE_TYPES.some(variable => Object.getOwnPropertyNames(result).includes(variable)));
  const datasets = results.filter(result => MODEL.DATASET_TYPES.some(dataset => Object.getOwnPropertyNames(result).includes(dataset)));
  const lineageFields = results.filter(result => MODEL.LINEAGE_FIELD_TYPES.some(lineageField => Object.getOwnPropertyNames(result).includes(lineageField)));
  return {
    variables: variables,
    datasets: datasets,
    lineageFields: lineageFields
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
  const [lineageFieldResults, setLineageFieldResults] = React.useState([]);
  const [datasetTypeFilter, setDatasetTypeFilter] = React.useState(MODEL.DATASET_TYPES);
  const [variableTypeFilter, setVariableTypeFilter] = React.useState(MODEL.VARIABLE_TYPES);
  const [chosenSearchMethod, setChosenSearchMethod] = React.useState(API.SEARCH_METHODS[0]);
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
      setLineageFieldResults(searchResults.lineageFields);
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

  const handleSearchMethodCheckbox = searchMethod => setChosenSearchMethod(searchMethod);

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
      searchMethod: chosenSearchMethod,
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
      datasets: datasetResults,
      datasetTypeFilter: datasetTypeFilter
    })) : null
  }, {
    menuItem: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Menu.Item, {
      key: "lineageFields"
    }, UI.LINEAGE_FIELDS[language], /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      style: {
        background: daplaJsUtilities.SSB_COLORS.BLUE
      }
    }, loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      loading: true,
      name: "spinner"
    }) : lineageFieldResults.length)),
    render: () => lineageFieldResults.length >= 1 ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Tab.Pane, {
      as: semanticUiReact.Segment,
      basic: true,
      style: {
        border: 'none'
      }
    }, /*#__PURE__*/React__default['default'].createElement(SearchResultLineage, {
      language: language,
      lineageFields: lineageFieldResults
    })) : null
  }];
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 3
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
    attached: "top right",
    style: {
      background: 'transparent'
    }
  }, /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    position: "right center",
    text: UI.EXTERNAL_GRAPHIQL[language],
    trigger: /*#__PURE__*/React__default['default'].createElement("a", {
      href: `${restApi}${API.GRAPHIQL}`,
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
    chosenSearchMethod: chosenSearchMethod,
    handleDatasetTypeCheckbox: handleDatasetTypeCheckbox,
    handleVariableTypeCheckbox: handleVariableTypeCheckbox,
    handleSearchMethodCheckbox: handleSearchMethodCheckbox
  })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    width: 13
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Tab, {
    defaultActiveIndex: 0,
    menu: {
      secondary: true,
      pointing: true
    },
    panes: panes
  })));
}

exports.VariableSearch = AppHome;
