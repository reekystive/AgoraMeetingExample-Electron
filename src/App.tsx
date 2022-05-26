import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RootProvider } from './hooks';
import MainView from './views/main';
import MeetingView from './views/meeting';

import './utils/logtransports';

const App = () => {
  return (
    <RootProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<MainView />} />
          <Route path="meeting" element={<MeetingView />} />
        </Routes>
      </HashRouter>
    </RootProvider>
  );
};

export default App;
