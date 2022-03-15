import React, { VFC } from 'react';
import './FormCard.css';

type Props = {
  title?: string;
  children: JSX.Element;
  axisX: string;
  axisY: string;
};

const ChartItem: VFC<Props> = React.memo((props) => {
  const { title, children, axisX, axisY } = props;

  return (
    <div className="chart-items">
      {title && <div className="chart-title">{title}</div>}
      <div className="chart-axis-y-title">{axisY}</div>
      {children}
      <div className="chart-axis-x-title">{axisX}</div>
    </div>
  );
});

export default ChartItem;
