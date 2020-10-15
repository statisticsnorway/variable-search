import React from 'react'
import { render } from '@testing-library/react'

import { SearchResultDatasets } from '../components/search'
import { splitSearchResult } from '../utilities'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'

import PersonSearchResult from './test-data/PersonSearchResult.json'

const { language } = TEST_CONFIGURATIONS
const { datasets } = splitSearchResult(PersonSearchResult)
const datasetName = PersonSearchResult[2].unitDataSet.name[0].languageText

const setup = filter => {
  const { getByText, queryByText } = render(
    <SearchResultDatasets datasets={datasets} datasetTypeFilter={filter} language={language} />
  )

  return { getByText, queryByText }
}

test('Renders basics', () => {
  const { getByText } = setup(MODEL.DATASET_TYPES)

  expect(getByText(datasetName)).toBeInTheDocument()
})
