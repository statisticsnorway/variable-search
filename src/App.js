import React, { useContext, useEffect, useRef, useState } from 'react'
import useAxios from 'axios-hooks'
import { Loader, Ref, Segment } from 'semantic-ui-react'
import { ErrorMessage } from '@statisticsnorway/dapla-js-utilities'

import { AppHome, AppMenu, AppSettings } from './components'
import { ApiContext, LanguageContext } from './context/AppContext'
import { API } from './configurations'
import { UI } from './enums'

function App () {
  const { restApi } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const appRefArea = useRef()

  const [apiReady, setApiReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [{ loading, error }] = useAxios(`${restApi}${API.GET_HEALTH}`, { useCache: false })

  useEffect(() => {
    if (!loading && !error) {
      setApiReady(true)
    } else {
      setApiReady(false)
    }
  }, [error, loading])

  return (
    <>
      <AppMenu setSettingsOpen={setSettingsOpen} context={appRefArea} />
      <Ref innerRef={appRefArea}>
        <Segment basic>
          {loading ? <Loader active inline='centered' /> :
            error ? <ErrorMessage error={UI.API_ERROR_MESSAGE[language]} language={language} /> :
              apiReady && <AppHome lineageUrl={window.__ENV.REACT_APP_LINEAGE} language={language} />
          }
        </Segment>
      </Ref>
      <AppSettings error={error} loading={loading} setOpen={setSettingsOpen} open={settingsOpen} />
    </>
  )
}

export default App
