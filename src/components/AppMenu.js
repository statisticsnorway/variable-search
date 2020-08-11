import React, { useContext } from 'react'
import { Divider, Dropdown, Header, Image, Menu } from 'semantic-ui-react'
import { LANGUAGE, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import SSBLogo from '../media/ssb-logo-rgb.svg'
import { LanguageContext } from '../utilities'
import { TEST_IDS, UI } from '../enums'

function AppMenu ({ setSettingsOpen }) {
  const { language, setLanguage } = useContext(LanguageContext)

  const dropdownItems = Object.keys(LANGUAGE.LANGUAGES).map(languageName =>
    <Dropdown.Item
      key={languageName}
      content={LANGUAGE[languageName][language]}
      onClick={() => setLanguage(LANGUAGE.LANGUAGES[languageName].languageCode)}
    />
  )

  return (
    <Menu secondary size='huge' style={{ padding: '1rem', paddingTop: '2rem' }}>
      <Menu.Item><Image size='medium' src={SSBLogo} /></Menu.Item>
      <Menu.Item><Header size='huge' content={UI.HEADER[language]} /></Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item><Divider vertical /></Menu.Item>
        <Menu.Item
          style={{ color: SSB_COLORS.GREEN }}
          onClick={() => setSettingsOpen(true)}
          icon={{ name: 'setting', size: 'big', 'data-testid': TEST_IDS.ACCESS_SETTINGS_BUTTON }}
        />
        <Dropdown item text={`${LANGUAGE.LANGUAGE[language]} (${LANGUAGE.LANGUAGE_CHOICE[language]})`}>
          <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default AppMenu
