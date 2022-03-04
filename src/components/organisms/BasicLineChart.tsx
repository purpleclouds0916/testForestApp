/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, VFC } from 'react';
import './BasicLineChart.css';
import * as d3 from 'd3';
import defaultData from '../../data/DefaultData';
import { ChartData } from './ChartData';
import { inputValuesTs } from '../../models/InputValues';

interface Props {
  inputValues: inputValuesTs;
  setInputValue: React.Dispatch<React.SetStateAction<inputValuesTs>>;
}

interface IBasicLineChartProps {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  fill: string;
}

const points = [
  [43, 176.8772426675182],
  [86, 68.67966011721217],
  [129, 174.35856262540509],
  [172, 111.34545265260115],
  [215, 160.75580980846613],
  [258, 184.2397787208176],
  [301, 139.90507917617077],
  [344, 64.79036306601182],
  [387, 116.75186646604297],
];
const data: ChartData[] = [];
points.map((_, index) => {
  const Xelement = Number(points[index][0]);
  const Yelement = Number(points[index][1]);
  data[index] = { x: Xelement, y: Yelement };
});

const BasicLineChart: VFC<IBasicLineChartProps & Props> = (props) => {
  const drawLine = () => {
    d3.select('.basicLineChart').selectAll('*').remove();

    const width =
      parseInt(d3.select('.basicLineChart').style('width'), 10) -
      props.right -
      props.left;
    const height =
      parseInt(d3.select('.basicLineChart').style('height'), 10) -
      props.top -
      props.bottom;

    const svg = d3
      .select('.basicLineChart')
      .append('svg')
      .attr('width', width + props.left + props.right)
      .attr('height', height + props.top + props.bottom)
      .append('g')
      .attr('transform', `translate(${props.left},${props.top})`);

    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, () =>
          Math.max(...data.map((dt) => (dt as unknown as ChartData).x), 0),
        ),
      ] as number[])
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y) as [number, number])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', props.fill)
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        // @ts-ignore
        d3
          .line()
          .x((d) => x((d as unknown as ChartData).x))
          .y((d) => y((d as unknown as { y: number }).y)),
      );

    svg
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 5.0)
      .attr('cx', (d: ChartData) => x(d.x))
      .attr('cy', (d: ChartData) => y(d.y))
      .style('cursor', 'pointer')
      .style('fill', 'steelblue')
      .attr('id', (d, i: number): string => `${i}`)
      .classed('cirStyle', true);

    const drag = d3
      .drag()
      .on('start', () => undefined)
      .on('drag', dragged)
      .on('end', () => undefined);

    // eslint-disable-next-line
    // @ts-ignore
    svg.append('g').selectAll('circle').call(drag);

    function dragged(event: any, d: any) {
      // eslint-disable-next-line
      // @ts-ignore
      focus.select('path').attr('d', line); // eslint-disable-line

      // eslint-disable-next-line
      // @ts-ignore
      d3.select(this).classed('dragging', true);
      d.x = x.invert(event.x);
      d.y = y.invert(event.y);
    }
  };
  useEffect(() => {
    drawLine();
  });

  return <div className="basicLineChart" />;
};

export default BasicLineChart;
