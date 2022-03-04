import { VFC } from 'react';
import './FormCard.css';

type Props = {
  title: string;
  children: JSX.Element;
};

const ChartItem: VFC<Props> = (props) => {
  const { title, children } = props;

  return (
    <div className="chart-items">
      <div className="chart-title">{title}</div>
      <div className="chart-axis-y-title">{title}</div>
      {children}
      <div className="chart-axis-x-title">{title}</div>
    </div>
  );
};

export default ChartItem;
