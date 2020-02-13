import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import usePersistedState from './util/usePersistedState';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import Pad from './components/Pad';
import schema from './util/schema';
import CRUDStore from './flux/CRUDStore';
import GlobalStyle from './styles/global';

import SwitchButton from './components/Switch';


CRUDStore.init(schema);

const SwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 40px;
  margin-bottom: 0;
`;

const App = () => {

  const [theme, setTheme] = usePersistedState('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <SwitchContainer>
          <SwitchButton toggleTheme={toggleTheme} />
        </SwitchContainer>
        <GlobalStyle />
        <Pad toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  );
}


export default App;

