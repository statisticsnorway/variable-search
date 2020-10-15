import React from 'react'
import { render } from '@testing-library/react'

import { SearchResultVariables } from '../components/search'
import { splitSearchResult } from '../utilities'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { RESULTS } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'

jest.mock('../components/search/VariableInDatasetLookup', () => () => null)

const { language } = TEST_CONFIGURATIONS
const { variables } = splitSearchResult(PersonSearchResult)
const variableName = PersonSearchResult[1].variable.name[0].languageText

const setup = (filter, resultAsBoxes) => {
  const { getAllByText, getByText } = render(
    <SearchResultVariables
      language={language}
      variables={variables}
      variableTypeFilter={filter}
      resultAsBoxes={resultAsBoxes}
    />
  )

  return { getAllByText, getByText }
}

test('Renders basics with boxes', () => {
  const { getAllByText } = setup(MODEL.VARIABLE_TYPES, true)

  expect(getAllByText(variableName)).toHaveLength(2)
})

test('Renders basics with table', () => {
  const { getAllByText } = setup(MODEL.VARIABLE_TYPES, false)

  expect(getAllByText(variableName)).toHaveLength(2)
})

test('Filters correctly', () => {
  const { getByText } = setup([MODEL.VARIABLE_TYPES[1]])

  expect(getByText(RESULTS.HAVE_FILTERED(1, 2)[language]))
})
