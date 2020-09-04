'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlHooks = require('graphql-hooks');
var semanticUiReact = require('semantic-ui-react');
var daplaJsUtilities = require('@statisticsnorway/dapla-js-utilities');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const MODEL = {
  DATASET: 'UnitDataSet',
  GET_CREATED_DATE: ['createdDate'],
  GET_DATASET: ['node', 'reverseUnitDataStructureLogicalRecords', 'edges', 0, 'node', 'reverseUnitDataSetUnitDataStructure', 'edges', 0, 'node'],
  GET_DATASETS: ['node', 'reverseUnitDataStructureLogicalRecords', 'edges', 0, 'node', 'reverseUnitDataSetUnitDataStructure', 'edges'],
  GET_DESCRIPTION: ['description'],
  GET_ID: ['node', 'id'],
  GET_LOGICAL_RECORDS: {
    InstanceVariable: ['InstanceVariableById', 'reverseLogicalRecordInstanceVariables', 'edges'],
    RepresentedVariable: ['RepresentedVariableById', 'reverseInstanceVariableRepresentedVariable', 'edges', 0, 'node', 'reverseLogicalRecordInstanceVariables', 'edges'],
    Variable: ['VariableById', 'reverseRepresentedVariableVariable', 'edges', 0, 'node', 'reverseInstanceVariableRepresentedVariable', 'edges', 0, 'node', 'reverseLogicalRecordInstanceVariables', 'edges']
  },
  GET_NAME: ['name'],
  GET_STATE: ['dataSetState'],
  GET_SUBJECT_FIELD_NAME: ['node', 'name'],
  GET_SUBJECT_FIELDS: {
    InstanceVariable: ['representedVariable', 'variable', 'subjectFields', 'edges'],
    RepresentedVariable: ['variable', 'subjectFields', 'edges'],
    Variable: ['subjectFields', 'edges']
  },
  GET_UNIT_TYPE: {
    InstanceVariable: ['representedVariable', 'variable', 'unitType', 'name'],
    RepresentedVariable: ['variable', 'unitType', 'name'],
    Variable: ['unitType', 'name']
  },
  GET_VALUATION: ['valuation'],
  SEARCH: ['Search', 'edges'],
  TYPE: ['node', '__typename'],
  VARIABLES: ['InstanceVariable', 'RepresentedVariable', 'Variable']
};

const subjectFieldLayout = (text, index) => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
  tag: true,
  key: index,
  size: "large",
  content: text,
  style: {
    backgroundColor: daplaJsUtilities.SSB_COLORS.GREEN,
    borderColor: daplaJsUtilities.SSB_COLORS.GREEN,
    marginRight: '0.5em'
  }
});

const VALUATION_COLORS = {
  OPEN: daplaJsUtilities.SSB_COLORS.BLUE,
  INTERNAL: daplaJsUtilities.SSB_COLORS.GREEN,
  SHIELDED: daplaJsUtilities.SSB_COLORS.YELLOW,
  SENSITIVE: daplaJsUtilities.SSB_COLORS.RED
};

const DATASET = {
  TABLE_HEADERS: {
    NAME: {
      en: 'Name',
      nb: 'Navn'
    },
    DESCRIPTION: {
      en: 'Description',
      nb: 'Beskrivelse'
    },
    STATE: {
      en: 'State',
      nb: 'Tilstand'
    },
    VALUATION: {
      en: 'Valuation',
      nb: 'Verdivurdering'
    },
    DATE_CREATED: {
      en: 'Date created',
      nb: 'Dato opprettet'
    },
    CURSOR: {
      en: 'Cursor (changes)',
      nb: 'Peker (endringer)'
    }
  }
};

const SEARCH = {
  DATASET_RESULTS: {
    en: 'Dataset results',
    nb: 'Datasettresultater'
  },
  EDITED: {
    en: 'Current results came from a previous search',
    nb: 'Resultatene som foreligger gjelder forrige søk'
  },
  HITS: {
    en: 'Number of hits in total',
    nb: 'Antall treff totalt'
  },
  NEW_SEARCH: {
    en: 'Hit \'Enter\' for a new search',
    nb: 'Trykk \'Enter\' for et nytt søk'
  },
  PREVIOUS: {
    en: 'wich was: ',
    nb: 'som var: '
  },
  VARIABLE_DATASETS_CLOSED: {
    en: 'Hide datasets',
    nb: 'Skjul datasett'
  },
  VARIABLE_DATASETS_OPEN: {
    en: 'Show datasets using this variable',
    nb: 'Vis datasett som bruker denne variabelen'
  },
  VARIABLE_RESULTS: {
    en: 'Variable results',
    nb: 'Variabelresultater'
  }
};
const SEARCH_VARIABLE = {
  CURSOR_OLDER: {
    en: 'Cursors to older versions',
    nb: 'Pekere til eldre versjoner'
  },
  DATASET_STATE: {
    en: 'State',
    nb: 'Tilstand'
  },
  DATASET_VALUATION: {
    en: 'Valuation',
    nb: 'Verdivurdering'
  },
  DATE_CREATED: {
    en: 'Date created',
    nb: 'Dato opprettet'
  },
  DESCRIPTION: {
    en: 'Description',
    nb: 'Beskrivelse'
  },
  NAME: {
    en: 'Name',
    nb: 'Navn'
  },
  SUBJECT_FIELDS: {
    en: 'Subject fields',
    nb: '"Emner"'
  },
  TYPE: {
    en: 'Type',
    nb: 'Type'
  },
  UNIT_TYPE: {
    en: 'Unit type',
    nb: 'Enhetstype'
  },
  UPDATES: {
    en: 'Times changed',
    nb: 'Ganger endret'
  }
};

const UI = {
  API_ERROR_MESSAGE: {
    en: 'Something went wrong, check settings',
    nb: 'Noe gikk galt, sjekk innstillingene'
  },
  EXTERNAL_GRAPHIQL: {
    en: 'Access GraphiQL directly',
    nb: 'Skriv Graphql spørringer direkte mot tjenesten'
  },
  HEADER: {
    en: 'Variable search',
    nb: 'Variabelsøk'
  },
  SEARCH: {
    en: 'Search...',
    nb: 'Søk...'
  },
  SEARCH_NO_RESULTS: {
    en: 'No results found',
    nb: 'Fant ingen resultater'
  },
  UNKOWN: '-'
};

const returnString = (language, object) => {
  if (object === undefined) {
    return UI.UNKOWN;
  } else {
    return daplaJsUtilities.getLocalizedGsimObjectText(language, object);
  }
};

const getDatasetCreatedDate = (language, object) => {
  const date = daplaJsUtilities.getNestedObject(object, MODEL.GET_CREATED_DATE);

  if (date === undefined) {
    return UI.UNKOWN;
  } else {
    return new Date(date).toLocaleDateString(daplaJsUtilities.LANGUAGE.LOCALE[language]);
  }
};
const getDatasetState = dataset => daplaJsUtilities.getNestedObject(dataset, MODEL.GET_STATE);
const getDatasetValuation = dataset => daplaJsUtilities.getNestedObject(dataset, MODEL.GET_VALUATION);
const getDescription = (language, object) => returnString(language, daplaJsUtilities.getNestedObject(object, MODEL.GET_DESCRIPTION));
const getName = (language, object) => returnString(language, daplaJsUtilities.getNestedObject(object, MODEL.GET_NAME));
const getVariableSubjectFields = (language, type, variable) => {
  const subjectFields = daplaJsUtilities.getNestedObject(variable, MODEL.GET_SUBJECT_FIELDS[type]);

  if (subjectFields === undefined) {
    return UI.UNKOWN;
  } else {
    return subjectFields.map((subjectField, index) => subjectFieldLayout(returnString(language, daplaJsUtilities.getNestedObject(subjectField, MODEL.GET_SUBJECT_FIELD_NAME)), index));
  }
};
const getVariableUnitType = (language, type, variable) => returnString(language, daplaJsUtilities.getNestedObject(variable, MODEL.GET_UNIT_TYPE[type]));

const datasetsFromVariable = (result, type) => {
  const datasets = daplaJsUtilities.getNestedObject(result, MODEL.GET_LOGICAL_RECORDS[type]);

  if (Array.isArray(datasets)) {
    const filteredDatasets = datasets.filter(entry => {
      const datasetsFromEntry = daplaJsUtilities.getNestedObject(entry, MODEL.GET_DATASETS);

      if (Array.isArray(datasetsFromEntry)) {
        return datasetsFromEntry.length !== 0;
      } else {
        return false;
      }
    });

    if (filteredDatasets.length !== 0) {
      return datasets.map(dataset => daplaJsUtilities.getNestedObject(dataset, MODEL.GET_DATASET)).filter(element => element !== undefined);
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const splitAndReverse = array => array.reduceRight((accumulator, object) => {
  let id = daplaJsUtilities.getNestedObject(object, MODEL.GET_ID);

  if (!accumulator[id]) {
    accumulator[id] = [];
  }

  accumulator[id].push(object);
  return accumulator;
}, {});

const splitSearchResult = results => {
  const edges = daplaJsUtilities.getNestedObject(results, MODEL.SEARCH);
  const datasets = splitAndReverse(edges.filter(entry => daplaJsUtilities.getNestedObject(entry, MODEL.TYPE) === MODEL.DATASET));
  const variables = splitAndReverse(edges.filter(entry => daplaJsUtilities.getNestedObject(entry, MODEL.TYPE) !== MODEL.DATASET));
  return {
    variables: variables,
    datasets: datasets
  };
};

function SearchResultDatasets({
  datasets,
  language
}) {
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    basic: "very"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, Object.entries(DATASET.TABLE_HEADERS).map(([header, text]) => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    key: header
  }, text[language])))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, Object.entries(datasets).map(([id, dataset]) => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
    key: id
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, getName(language, dataset[0].node)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, getDescription(language, dataset[0].node)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, getDatasetState(dataset[0].node)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, /*#__PURE__*/React__default['default'].createElement("span", {
    style: {
      color: VALUATION_COLORS[getDatasetValuation(dataset[0].node)]
    }
  }, getDatasetValuation(dataset[0].node))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, getDatasetCreatedDate(language, dataset[0].node)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, `${dataset[0].cursor} (${dataset.length - 1})`)))));
}

const DATASETS_FROM = {
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
};
const FULL_TEXT_SEARCH = `
query textSearch($text: String!) {
  Search(query: $text, filter: [InstanceVariable, RepresentedVariable, Variable, UnitDataSet]) {
    edges {
      cursor
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
`;

function SearchResultVariable({
  id,
  language,
  variables
}) {
  const [datasets, setDatasets] = React.useState([]);
  const [datasetsOpen, setDatasetsOpen] = React.useState(false);
  const {
    loading,
    error,
    data
  } = graphqlHooks.useQuery(DATASETS_FROM[variables[0].node[MODEL.TYPE[1]]], {
    variables: {
      id: id
    }
  });
  React.useEffect(() => {
    if (!error && !loading && data !== undefined) {
      setDatasets(datasetsFromVariable(data, variables[0].node[MODEL.TYPE[1]]));
    }
  }, [error, loading, data, variables]);
  React.useEffect(() => {
    if (error && !loading) {
      console.log(error);
    }
  }, [error, loading]);
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Segment, {
    textAlign: "left"
  }, /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    text: SEARCH_VARIABLE.UNIT_TYPE[language],
    trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      ribbon: true,
      size: "large",
      style: {
        backgroundColor: daplaJsUtilities.SSB_COLORS.BLUE,
        borderColor: daplaJsUtilities.SSB_COLORS.BLUE
      }
    }, getVariableUnitType(language, variables[0].node[MODEL.TYPE[1]], variables[0].node))
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, {
    columns: "equal"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, {
    relaxed: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.TYPE[language]}: `), variables[0].node[MODEL.TYPE[1]]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.NAME[language]}: `), getName(language, variables[0].node)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.DESCRIPTION[language]}: `), getDescription(language, variables[0].node)), variables.length > 1 && /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.UPDATES[language]}: ${variables.length - 1} `), `
              (${SEARCH_VARIABLE.CURSOR_OLDER[language]}:
              ${variables.map(variable => variable.cursor).filter((cursor, index) => index !== 0).join(', ')})
              `)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    text: SEARCH_VARIABLE.SUBJECT_FIELDS[language],
    trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Container, null, getVariableSubjectFields(language, variables[0].node[MODEL.TYPE[1]], variables[0].node))
  })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    position: "left center",
    text: SEARCH[`VARIABLE_DATASETS_${datasetsOpen ? 'CLOSED' : 'OPEN'}`][language],
    trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
      floating: true,
      size: "large",
      onClick: () => setDatasetsOpen(!datasetsOpen),
      style: {
        backgroundColor: daplaJsUtilities.SSB_COLORS.PURPLE,
        borderColor: daplaJsUtilities.SSB_COLORS.PURPLE
      }
    }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      name: datasetsOpen ? 'minus circle' : 'plus circle'
    }))
  }), datasetsOpen ? datasets.length >= 1 ? datasets.map(dataset => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List, {
    key: dataset.id,
    relaxed: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.NAME[language]}: `), getName(language, dataset)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.DESCRIPTION[language]}: `), getDescription(language, dataset)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.DATASET_STATE[language]}: `), getDatasetState(dataset)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.DATASET_VALUATION[language]}: `), getDatasetValuation(dataset)), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.List.Item, null, /*#__PURE__*/React__default['default'].createElement("b", null, `${SEARCH_VARIABLE.DATE_CREATED[language]}: `), getDatasetCreatedDate(language, dataset)))) : UI.SEARCH_NO_RESULTS[language] : null)), datasetsOpen && datasets.length >= 1 && /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    vertical: true
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
    name: "arrow circle right"
  })));
}

function AppHome({
  restApi,
  language
}) {
  const [searched, setSearched] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchEdited, setSearchEdited] = React.useState(false);
  const [previousSearch, setPreviousSearch] = React.useState('');
  const [datasetResults, setDatasetResults] = React.useState([]);
  const [variableResults, setVariableResults] = React.useState({});
  const [variableFilter, setVariableFilter] = React.useState(MODEL.VARIABLES);
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
  React.useEffect(() => {
    if (error && !loading) {
      if (data !== undefined) {
        try {
          const searchResults = splitSearchResult(data);
          setDatasetResults(searchResults.datasets);
          setVariableResults(searchResults.variables);
        } catch (e) {
          console.log('Tried to extract query results from returned error but could not:');
          console.log(e);
        }
      }

      console.log(error);
    }
  }, [data, error, loading]);

  const doSearch = () => {
    setSearched(true);
    setSearchEdited(false);
    setPreviousSearch(searchValue); // noinspection JSIgnoredPromiseFromCall

    fetchResults();
  };

  const handleCheckbox = (includes, variable) => {
    if (includes) {
      setVariableFilter(variableFilter.filter(element => element !== variable));
    } else {
      setVariableFilter(variableFilter.concat([variable]));
    }
  };

  const variableSelect = MODEL.VARIABLES.map(variable => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Checkbox, {
    key: variable,
    label: variable,
    style: {
      marginRight: '2rem'
    },
    checked: variableFilter.includes(variable),
    onClick: () => handleCheckbox(variableFilter.includes(variable), variable)
  }));
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Segment, {
    basic: true,
    textAlign: "center"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
    attached: "top right",
    style: {
      background: 'transparent'
    }
  }, /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    position: "bottom right",
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
    text: SEARCH.EDITED[language]
  }), searched && searchEdited && previousSearch !== '' && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, ` (`, /*#__PURE__*/React__default['default'].createElement("i", null, SEARCH.PREVIOUS[language]), `'`, /*#__PURE__*/React__default['default'].createElement("b", null, previousSearch), `')`, /*#__PURE__*/React__default['default'].createElement("p", null, SEARCH.NEW_SEARCH[language])), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, {
    columns: "equal"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header, {
    size: "huge",
    content: SEARCH.DATASET_RESULTS[language]
  }), loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Loader, {
    active: true,
    inline: "centered"
  }) : Object.keys(datasetResults).length >= 1 ? /*#__PURE__*/React__default['default'].createElement(SearchResultDatasets, {
    datasets: datasetResults,
    language: language
  }) : searched ? UI.SEARCH_NO_RESULTS[language] : null), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header, {
    size: "huge",
    content: SEARCH.VARIABLE_RESULTS[language]
  }), variableSelect, Object.keys(variableResults).length >= 1 && `${SEARCH.HITS[language]}: ${Object.keys(variableResults).length}`, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Loader, {
    active: true,
    inline: "centered"
  }) : Object.keys(variableResults).length >= 1 ? Object.entries(variableResults).filter(entry => variableFilter.includes(entry[1][0].node[MODEL.TYPE[1]])).map(([id, variables]) => /*#__PURE__*/React__default['default'].createElement(SearchResultVariable, {
    key: id,
    id: id,
    language: language,
    variables: variables
  })) : searched ? UI.SEARCH_NO_RESULTS[language] : null)));
}

exports.VariableSearch = AppHome;
