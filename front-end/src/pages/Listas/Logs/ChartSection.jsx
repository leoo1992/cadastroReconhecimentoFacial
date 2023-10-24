import React from 'react';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const ChartSection = ({
  theme,
  chartData,
  options,
  activeChart,
  activeButton,
  handleButtonClick,
}) => {
  return (
    <div className='d-flex flex-column justify-content-center align-content-center align-items-center p-0 m-0 h-75 w-100'>
      <h5 className={`mt-5 text-${theme === 'dark' ? 'light' : 'dark'}`}>Gráficos de Logs</h5>
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item className='mb-4'>
          <Button
            className={`m-1 btn ${activeButton === 'bar' ? 'btn-primary' : 'btn-info'} btn-sm`}
            onClick={() => handleButtonClick('bar')}
          >
            Barras
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            className={`m-1 btn ${activeButton === 'line' ? 'btn-primary' : 'btn-info'} btn-sm`}
            onClick={() => handleButtonClick('line')}
          >
            Linha
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            className={`m-1 btn ${activeButton === 'pie' ? 'btn-primary' : 'btn-info'} btn-sm`}
            onClick={() => handleButtonClick('pie')}
          >
            Pizza
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            className={`m-1 btn ${activeButton === 'doughnut' ? 'btn-primary' : 'btn-info'} btn-sm`}
            onClick={() => handleButtonClick('doughnut')}
          >
            Doughnut
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            className={`m-1 btn ${activeButton === 'polar' ? 'btn-primary' : 'btn-info'} btn-sm`}
            onClick={() => handleButtonClick('polar')}
          >
            Polar
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            className={`m-1 btn ${activeButton === 'area' ? 'btn-primary' : 'btn-info'} btn-sm`}
            onClick={() => handleButtonClick('area')}
          >
            Area
          </Button>
        </Nav.Item>
      </Nav>
      <Bar
        data={chartData}
        options={options}
        className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'bar' ? 'd-flex' : 'd-none'}`}
      />
      <Line
        data={chartData}
        options={options}
        className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'line' ? 'd-flex' : 'd-none'}`}
      />
      <Pie
        data={chartData}
        options={options}
        className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'pie' ? 'd-flex' : 'd-none'}`}
      />
      <Doughnut
        data={chartData}
        options={options}
        className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'doughnut' ? 'd-flex' : 'd-none'}`}
      />
      <PolarArea
        data={chartData}
        options={options}
        className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'polar' ? 'd-flex' : 'd-none'}`}
      />
      <Radar
        data={chartData}
        options={options}
        className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'area' ? 'd-flex' : 'd-none'}`}
      />
    </div>
  );
};

export default ChartSection;
