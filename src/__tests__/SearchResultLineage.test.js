import React from 'react'
import { render } from '@testing-library/react'

import { SearchResultLineage } from '../components/search'
import { splitSearchResult } from '../utilities'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'

import PersonSearchResult from './test-data/PersonSearchResult.json'

const { language } = TEST_CONFIGURATIONS
const { lineageFields } = splitSearchResult(PersonSearchResult)
const lineageFieldName = PersonSearchResult[3].lineageField.name

const setup = () => {
  const { getByText, queryByText } = render(
    <SearchResultLineage lineageFields={lineageFields} language={language} />
  )

  return { getByText, queryByText }
}

test('Renders basics', () => {
  const { getByText } = setup()

  expect(getByText(lineageFieldName)).toBeInTheDocument()
})
