import React from 'react'
import userEvent from '@testing-library/user-event'
import { useManualQuery } from 'graphql-hooks'
import { render } from '@testing-library/react'

import VariableInDatasetFilterLookup from '../components/search/VariableInDatasetFilterLookup'
import { DATASETS_FROM_FILTER } from '../queries'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'
import FilterDatasetLookupResult from './test-data/FilterDatasetLookupResult.json'

const { language } = TEST_CONFIGURATIONS
const datasetName = FilterDatasetLookupResult[0].unitDataSet.name[0].languageText
const variableId = PersonSearchResult[0].representedVariable.id
const variableType = MODEL.VARIABLE_TYPES[1]
const fetchResults = jest.fn()

const setup = () => {
  const { getByTestId, getByText } = render(
    <VariableInDatasetFilterLookup id={variableId} type={variableType} language={language} />
  )

  return { getByTestId, getByText }
}

test('Loads', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: true, error: null, data: undefined }])

  setup()
})

test('Renders basics', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: FilterDatasetLookupResult }])

  const { getByText } = setup()

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM_FILTER[variableType], { variables: { id: variableId } })

  expect(getByText(datasetName)).toBeInTheDocument()
})

test('Inflate test coverage by opening/closing accordion', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: [] }])

  const { getByTestId } = setup()

  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
})
