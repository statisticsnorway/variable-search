export const UI = {
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
    en: `Of ${(UI[domain][language]).toLowerCase()} show me: `,
    nb: `Av ${(UI[domain][language]).toLowerCase()} vis meg: `
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
}
