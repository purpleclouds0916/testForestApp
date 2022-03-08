import { useEffect, VFC } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import ResultPage from './components/pages/ResultPage';

import FormPage from './components/pages/FormPage';
import Home from './components/pages/HomePage';

const App: VFC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <div className="container">
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                title="林業の経営シミュレーション"
                description="経営に必要なデータを入力するだけで、最適な施業方法を提案します"
                isMainPage
              />
            }
          />
          {/* <Route
            path="/document"
            element={
              <Home
                title="このサイトについて"
                description={documentDescription}
                isMainPage={false}
              />
            }
          /> */}
          <Route path="/form" element={<FormPage />} />
          <Route path="/submit" element={<ResultPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
