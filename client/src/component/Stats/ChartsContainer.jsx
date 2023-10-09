import { useState } from 'react';
import Wrapper from '../../assets/wrappers/ChartsContainer';
import BarChartComponent from './BarChartComponent';
import MyAreaChart from './MyAreaChart';

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <MyAreaChart data={data} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
