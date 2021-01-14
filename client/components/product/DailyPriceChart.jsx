import React, { useEffect } from "react";
import * as d3 from "d3";
import { scaleBand } from "d3";

const DailyPriceChart = ({ priceHistory }) => {
  const api = [
    {
      date: "2021-01-11",
      price: 79.99,
    },
    {
      date: "2021-01-12",
      price: 89.99,
    },
    {
      date: "2021-01-13",
      price: 99.99,
    },
    {
      date: "2021-01-14",
      price: 69.99,
    },
    {
      date: "2021-01-15",
      price: 59.99,
    },
  ];

  const data = api.map((el) => {
    return {
      date: new Date(el.date),
      price: el.price,
    };
  });

  const dataPrice = [];
  for (let el of data) {
    dataPrice.push(el.price);
  }

  const dataDate = [];
  for (let el of data) {
    dataDate.push(el.date);
  }

  // console.log('formatted data', data);

  const drawChart = () => {
    const svgWidth = 500,
          svgHeight = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select("#container")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    //   .attr('width', width + margin.left + margin.right)
    //   .attr('height', height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max[dataDate]])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataPrice)])
      .range([height, 0]);
    
    const x_axis = d3.axisBottom().scale(xScale);

    const y_axis = d3.axisLeft().scale(yScale);

    svg.append('g')
    .attr('transform', 'translate(50,10)')
    .call(y_axis);

    svg.append('g')
    .attr('transform', 'translate(50, ' + (svgHeight - 50) + ')')
    .call(x_axis);
    
    // const x = d3.scaleTime().rangeRound([0, width]);
    // const y = d3.scaleLinear().rangeRound([height, 0]);

    // const line = d3
    //   .line()
    //   .x(function (d) {
    //     return x(d.date);
    //   })
    //   .y(function (d) {
    //     return y(d.price);
    //   });
    // x.domain(
    //   d3.extent(data, function (d) {
    //     return d.date;
    //   })
    // );
    // y.domain(
    //   d3.extent(data, function (d) {
    //     return d.price;
    //   })
    // );

    //   g.append('g')
    //     .attr('transform', 'translate(0,' + height + ')')
    //     .call(d3.axisBottom(x))
    //     .select('.domain')
    //     .remove();

    //   g.append('g')
    //     .call(d3.axisLeft(y))
    //     .select('domain')
    //     .append('text')
    //     .attr('fill', '#000')
    //     .attr('transform', 'rotate(-90)')
    //     .attr('y', 6)
    //     .attr('dy', '0.71em')
    //     .attr('text-anchor', 'end')
    //     .text('Price ($)');

    //   g.append('path')
    //     .datum(data)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', line);
  };

  useEffect(() => {
    drawChart();
  }, [data]);

  // return (
  //   <div id="container" style={{ border: "1px solid lightgray" }}>
  //     {" "}
  //   </div>
  // );

  return <svg id='container'></svg>;
};

export default DailyPriceChart;
