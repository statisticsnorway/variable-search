import React from 'react'
import userEvent from '@testing-library/user-event'
import { useManualQuery } from 'graphql-hooks'
import { render } from '@testing-library/react'

import VariableInDatasetLookup from '../components/search/VariableInDatasetLookup'
import { DATASETS_FROM_LINEAGE } from '../queries'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS } from '../enums'

import VariableInDatasetLookupResultInstance from './test-data/VariableInDatasetLookupResultInstance.json'
import VariableInDatasetLookupResultRepresented from './test-data/VariableInDatasetLookupResultRepresented.json'
import VariableInDatasetLookupResultVariable from './test-data/VariableInDatasetLookupResultVariable.json'

const { language } = TEST_CONFIGURATIONS
const fetchResults = jest.fn()

const setup = (variableType, variableId) => {
  const { getByTestId, getByText } = render(
    <VariableInDatasetLookup id={variableId} type={variableType} language={language} />
  )

  return { getByTestId, getByText }
}

test('Loads', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: true, error: null, data: undefined }])

  setup()
})

test('Renders basics for InstanceVariable', () => {
  useManualQuery.mockReturnValue([fetchResults, {
    loading: false,
    error: null,
    data: VariableInDatasetLookupResultInstance
  }])

  setup(MODEL.VARIABLE_TYPES[0], 'felles.demo.dapla.oktober.kommune$fnr')

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM_LINEAGE(MODEL.VARIABLE_TYPES[0]), { variables: { id: 'felles.demo.dapla.oktober.kommune$fnr' } })
})

test('Renders basics for RepresentedVariable', () => {
  useManualQuery.mockReturnValue([fetchResults, {
    loading: false,
    error: null,
    data: VariableInDatasetLookupResultRepresented
  }])

  setup(MODEL.VARIABLE_TYPES[1], 'RepresentedVariable_DUMMY')

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM_LINEAGE(MODEL.VARIABLE_TYPES[1]), { variables: { id: 'RepresentedVariable_DUMMY' } })
})

test('Renders basics for Variable', () => {
  useManualQuery.mockReturnValue([fetchResults, {
    loading: false,
    error: null,
    data: VariableInDatasetLookupResultVariable
  }])

  setup(MODEL.VARIABLE_TYPES[2], 'Variable_DUMMY')

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM_LINEAGE(MODEL.VARIABLE_TYPES[2]), { variables: { id: 'Variable_DUMMY' } })
})

test('Inflate test coverage by opening/closing accordion', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: [] }])

  const { getByTestId } = setup()

  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
})
