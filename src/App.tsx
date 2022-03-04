// import LineChart from './components/organisms/LineChart';
import { VFC } from 'react';
import ChartItem from './components/organisms/ChartItem';
import LineChart from './components/organisms/LineChart';

// import Form from './components/organisms/Form'
import './App.css';

// import FormPage from './components/pages/FormPage';

const App: VFC = () => (
  <div className="container">
    {/* <FormPage /> */}
    <ChartItem title="タイトル">
      <LineChart
        top={10}
        bottom={30}
        left={50}
        right={10}
        className="thinning-chart"
        idName="thinning-chart"
      />
    </ChartItem>
  </div>
);

export default App;
