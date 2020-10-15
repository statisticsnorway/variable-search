export const RESULTS = {
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
}
