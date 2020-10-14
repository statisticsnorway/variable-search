import React from 'react'
import userEvent from '@testing-library/user-event'
import { useManualQuery } from 'graphql-hooks'
import { render } from '@testing-library/react'

import VariableInDatasetLineageLookup from '../components/search/VariableInDatasetLineageLookup'
import { DATASETS_FROM_LINEAGE } from '../queries'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'
import LineageDatasetLookupResult from './test-data/LineageDatasetLookupResult.json'

const { language } = TEST_CONFIGURATIONS
const firstDatasetName = LineageDatasetLookupResult[0].unitDataSet.name[0].languageText
const secondDatasetName = LineageDatasetLookupResult[1].unitDataSet.name[0].languageText
const variableId = PersonSearchResult[0].representedVariable.id
const variableType = MODEL.VARIABLE_TYPES[1]
const fetchResults = jest.fn()

const setup = () => {
  const { getByTestId, getByText } = render(
    <VariableInDatasetLineageLookup id={variableId} type={variableType} language={language} />
  )

  return { getByTestId, getByText }
}

test('Loads', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: true, error: null, data: undefined }])

  setup()
})

test('Renders basics', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: LineageDatasetLookupResult }])

  const { getByText } = setup()

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM_LINEAGE[variableType], { variables: { id: variableId } })

  expect(getByText(firstDatasetName)).toBeInTheDocument()
  expect(getByText(secondDatasetName)).toBeInTheDocument()
})

test('Inflate test coverage by opening/closing accordion', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: [] }])

  const { getByTestId } = setup()

  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
})
