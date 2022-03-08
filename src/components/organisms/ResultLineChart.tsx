/* eslint-disable no-param-reassign */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-this-in-sfc */

import { useEffect, VFC } from 'react';
import * as d3 from 'd3';

import './LineChart.css';

interface IBasicLineChartProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
  idName: string;
  data: number[][];
  yaxisUnit: string;
  yaxisTitle: string;
  increaseYaxis?: number;
  displayUnit?: number;
}

const ResultLineChart: VFC<IBasicLineChartProps> = (props) => {
  const {
    top,
    bottom,
    left,
    right,
    idName,
    data,
    yaxisUnit,
    yaxisTitle,
    increaseYaxis = 0,
    displayUnit = 1,
  } = props;

  useEffect(() => {
    d3.select(`#${idName}`).selectAll('*').remove();

    const width =
      parseInt(d3.select(`#${idName}`).style('width'), 10) - left - right;
    const height =
      parseInt(d3.select(`#${idName}`).style('height'), 10) - top - bottom;

    const svg = d3
      .select(`#${idName}`)
      .append('svg')
      .attr('width', width + left + right + 20)
      .attr('height', height + top + bottom)
      .append('g')
      .attr('transform', `translate(${left},${top})`);

    //   const maxX =
    //   Math.ceil(arrayX.reduce((a: number, b: number) => (a > b ? a : b)) / 10) *
    //   10;
    // const minX = arrayX.reduce((a: number, b: number) => (a < b ? a : b));

    // x axis scale
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(data, () =>
          Math.min(...data.map((dt) => (dt as unknown as number[])[0])),
        ),
        d3.max(data, () =>
          Math.max(...data.map((dt) => (dt as unknown as number[])[0]), 0),
        ),
      ] as number[])
      .range([0, width]);

    const minY = Number(
      d3.min(data, () =>
        Math.min(...data.map((dt) => (dt as unknown as number[])[1])),
      ),
    );
    const maxY = Number(d3.max(data, (d: number[]) => d[1]));

    const y = d3
      .scaleLinear()
      .domain([minY / displayUnit, (maxY + increaseYaxis) / displayUnit])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(8);
    const yAxis = d3.axisLeft(y).ticks(7);

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1] / displayUnit));

    const focus = svg.append('g');

    focus
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      // @ts-ignore
      .attr('d', line);

    focus
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    focus.append('g').attr('class', 'axis axis--y').call(yAxis);

    //  ここまでMoveLineChart.tsxとほぼ同じコード→短くしたかったが、できなかった。

    const tooldiv = d3
      .select(`#${idName}`)
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden')
      .style('position', 'absolute');

    const xValue = (d: number[]) => d[0];
    const yValue = (d: number[]) => d[1];

    const circle = focus
      .append('circle')
      .attr('r', 6)
      .style('opacity', 0)
      .style('fill', 'steelblue');

    svg
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        circle.style('opacity', 1);
      })
      .on('mousemove', (e: MouseEvent) => {
        // 動くメカニズムを後で理解する必要がある
        // eslint-disable-next-line
        const bisect = d3.bisector((d: any) => d[0]).left;
        const x0 = x.invert(d3.pointer(e)[0]);
        const i = bisect(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];

        const d = x0 - d0[0] > d1[0] - x0 ? d1 : d0;
        circle.attr(
          'transform',
          `translate(${x(d[0])},${y(d[1] / displayUnit)})`,
        );

        tooldiv
          .style('visibility', 'visible')
          .html(
            `林齢:${d[0]}年<br>${yaxisTitle}:${Math.round(
              d[1] / displayUnit,
            )}${yaxisUnit}`,
          )
          .style('top', `${y(yValue(d) / displayUnit) - 75}px`)
          .style('left', `${x(xValue(d)) - 75}px`);
      })
      .on('mouseout', () => {
        circle.style('opacity', 0);
        tooldiv.style('visibility', 'hidden');
      });
  }, [
    displayUnit,
    bottom,
    data,
    idName,
    increaseYaxis,
    left,
    right,
    top,
    yaxisTitle,
    yaxisUnit,
  ]);

  return <div className="line-chart" id={idName} />;
};

export default ResultLineChart;
