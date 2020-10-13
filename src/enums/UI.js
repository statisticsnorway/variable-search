export const UI = {
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
    en: 'Lineage fields',
    nb: 'Lineage fields'
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
    en: `Of ${(UI[domain][language]).toLowerCase()} show me: `,
    nb: `Av ${(UI[domain][language]).toLowerCase()} vis meg: `
  }),
  VARIABLES: {
    en: 'Variables',
    nb: 'Variabler'
  }
}
