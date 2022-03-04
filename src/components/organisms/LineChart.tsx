/* eslint-disable no-param-reassign */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-this-in-sfc */

import { useEffect, useState, VFC } from 'react';
import * as d3 from 'd3';

import './LineChart.css';

interface IBasicLineChartProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
  className: string;
  idName: string;
}

const LineChart: VFC<IBasicLineChartProps> = (props) => {
  const [ChartData, setData] = useState([
    [43, 176.8772426675182],
    [86, 68.67966011721217],
    [129, 174.35856262540509],
    [172, 111.34545265260115],
    [215, 160.75580980846613],
    [258, 184.2397787208176],
    [301, 139.90507917617077],
    [344, 64.79036306601182],
    [387, 116.75186646604297],
  ]);

  const { top, bottom, left, right, className, idName } = props;

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

    // x axis scale
    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(ChartData, () =>
          Math.max(...ChartData.map((dt) => (dt as unknown as number[])[0]), 0),
        ),
      ] as number[])
      .range([0, width]);

    const maxY = Number(d3.max(ChartData, (d: number[]) => d[1]));

    const y = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    const focus = svg.append('g');

    focus
      .append('path')
      .datum(ChartData)
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

    //  削除可能にする

    const tooldiv = d3
      .select(`#${idName}`)
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'red');

    const xValue = (d: number[]) => d[0];
    const yValue = (d: number[]) => d[1];

    focus
      .selectAll('circle')
      .data(ChartData)
      .enter()
      .append('circle')
      .attr('r', 5.0)
      .attr('cx', (d: Array<number>) => x(d[0]))
      .attr('cy', (d: Array<number>) => y(d[1]))
      .style('cursor', 'pointer')
      .style('fill', 'steelblue')
      .attr('id', (_d, i: number): string => `${i}`)
      .classed('cirStyle', true)
      .on('mouseover', (_e: MouseEvent, d: Array<number>) => {
        tooldiv
          .style('visibility', 'visible')
          .text(`${d[0]}:${d[1]}`)
          .style('top', `${y(yValue(d)) - 50}px`)
          .style('left', `${x(xValue(d)) - 50}px`);
      })
      .on('mousemove', () => undefined)
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden');
      });

    const dragstarted = () => {
      tooldiv.style('visibility', 'visible');
    };

    function dragged(this: SVGCircleElement, e: DragEvent, d: Array<number>) {
      // @ts-ignore
      focus.select('path').attr('d', line);

      d3.select(this).classed('dragging', true);

      const id = Number(this.id);

      // dragの範囲を要素ごとに制限  xは0よりも大きく、次の要素よりも小さい値で前の要素よりも大きい値
      if (id === 0) {
        d[0] = Math.max(0, Math.min(x.invert(e.x), ChartData[id + 1][0]));
      } else if (id === ChartData.length - 1) {
        d[0] = Math.max(ChartData[id - 1][0], x.invert(e.x));
      } else {
        d[0] = Math.max(
          ChartData[id - 1][0],
          Math.min(x.invert(e.x), ChartData[id + 1][0]),
        );
      }

      d[1] = Math.max(0, Math.min(y.invert(e.y), 500000));
      d3.select(this).attr('cx', x(d[0])).attr('cy', y(d[1]));

      tooldiv
        .text(`${d[0]}:${d[1]}`)
        .style('visibility', 'visible')
        .style('top', `${y(yValue(d)) - 50}px`)
        .style('left', `${x(xValue(d)) - 50}px`)
        .style('background-color', 'tomato');
    }

    function dragended(
      this: SVGCircleElement,
      _e: DragEvent,
      d: Array<number>,
    ) {
      tooldiv.style('visibility', 'hidden');
      d3.select(this).classed('dragging', false);

      const id = Number(this.id);

      setData(() =>
        ChartData.map((data, index) => (index === id ? [d[0], d[1]] : data)),
      );
    }

    const drag = d3
      .drag()
      .on('start', dragstarted)
      // @ts-ignore
      .on('drag', dragged)
      // @ts-ignore
      .on('end', dragended);

    // @ts-ignore
    focus.selectAll('circle').call(drag);

    // ここまで
    // 削除するのはここまで
    // グリッド線などの追加 これも選択可能にしたらいいねgrid=() => undefiendみたいに

    const makeXGridlines = () => d3.axisBottom(x).ticks(5);

    const makeYGridlines = () => d3.axisLeft(y).ticks(5);

    // x軸のグリッドラインの追加
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + height + ')') // eslint-disable-line

      .call(
        makeXGridlines()
          .tickSize(-height)
          // @ts-ignore
          .tickFormat(''),
      );
    // Y軸のグリッドラインの追加
    svg
      .append('g')
      .attr('class', 'grid')

      .call(
        makeYGridlines()
          .tickSize(-width)
          // @ts-ignore
          .tickFormat(''),
      );
  }, [bottom, className, ChartData, idName, left, right, top]);

  return <div className="line-chart" id={idName} />;
};

export default LineChart;
