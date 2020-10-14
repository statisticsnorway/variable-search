import React from 'react'
import { render } from '@testing-library/react'

import { SearchResultVariables } from '../components/search'
import { splitSearchResult } from '../utilities'
import { API, MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { RESULTS } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'

jest.mock('../components/search/VariableInDatasetFilterLookup', () => () => null)
jest.mock('../components/search/VariableInDatasetLineageLookup', () => () => null)
jest.mock('../components/search/VariableInDatasetReverseLookup', () => () => null)

const { language } = TEST_CONFIGURATIONS
const { variables } = splitSearchResult(PersonSearchResult)
const variableName = PersonSearchResult[1].variable.name[0].languageText

const setup = (filter, method) => {
  const { getAllByText, getByText } = render(
    <SearchResultVariables
      language={language}
      variables={variables}
      variableTypeFilter={filter}
      searchMethod={API.SEARCH_METHODS[method]}
    />
  )

  return { getAllByText, getByText }
}

test('Renders basics', () => {
  const { getAllByText } = setup(MODEL.VARIABLE_TYPES, 1)

  expect(getAllByText(variableName)).toHaveLength(2)
})

test('Filters correctly', () => {
  const { getByText } = setup([MODEL.VARIABLE_TYPES[1]], 0)

  expect(getByText(RESULTS.HAVE_FILTERED(1, 2)[language]))
})
