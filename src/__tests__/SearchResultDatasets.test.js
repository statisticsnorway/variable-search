import React from 'react'
import { render } from '@testing-library/react'

import { SearchResultDatasets } from '../components/search'
import { splitSearchResult } from '../utilities'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'

import PersonSearchResult from './test-data/PersonSearchResult.json'

const { language } = TEST_CONFIGURATIONS
const { datasets } = splitSearchResult(PersonSearchResult)
const datasetName = PersonSearchResult[2].unitDataSet.name[0].languageText

const setup = () => {
  const { getByText, queryByText } = render(
    <SearchResultDatasets datasets={datasets} language={language} />
  )

  return { getByText, queryByText }
}

test('Renders basics', () => {
  const { getByText } = setup()

  expect(getByText(datasetName)).toBeInTheDocument()
})
