import styled from "styled-components";
import { LineChart } from "@carbon/charts-react";
import { LineChartOptions, ScaleTypes } from "@carbon/charts/interfaces";
import { min, max, pointers } from "d3";
import "@carbon/charts/styles.css";
import { useEffect, useState } from "react";

export interface ValueChartDataObject {
  group: string;
  date: string;
  value: number;
}

export interface ValueChartProps {
  data: ValueChartDataObject[];
  symbol: string;
  originalValue: number;
}

const StyledValueChartWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.81rem;
  border-radius: 6px;
  background-color: white;
  padding: 1rem 2rem;

  .bx--cc--scatter circle.dot.unfilled:last-of-type {
    opacity: 1;
    stroke: #44ccff;
    fill: #44ccff;
    r: 10;
    animation: pulse-blue 2s infinite;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  }

  @keyframes pulse-blue {
    0% {
      r: 9.5;
    }

    25% {
      r: 12;
    }

    100% {
      r: 9.5;
    }
  }
`;

export const ValueChart: React.FC<ValueChartProps> = ({
  data,
  symbol,
  originalValue,
}) => {
  const dataMin = min(data.map((obj) => obj.value));
  const dataMax = max(data.map((obj) => obj.value));

  const options: LineChartOptions = {
    title: null,
    axes: {
      bottom: {
        title: `Your ${symbol} Portfolio History`,
        mapsTo: "date",
        scaleType: ScaleTypes.TIME,
        visible: false,
      },
      left: {
        title: "Value ($)",
        mapsTo: "value",
        scaleType: ScaleTypes.LINEAR,
        visible: false,
        domain: [dataMin - 1000, dataMax + 1000],
      },
    },
    animations: false,
    points: {
      radius: 4,
    },
    grid: {
      x: {
        enabled: false,
      },
      y: {
        enabled: false,
      },
    },
    curve: "curveMonotoneX",
    height: "40vh",
    width: "80%",
    legend: {
      enabled: false,
    },
    tooltip: {
      customHTML: (data: ValueChartDataObject[]) => {
        const value =
          "$" + parseFloat(data[0].value.toFixed(2)).toLocaleString();
        const date = new Date(Date.parse(data[0].date));
        const getDeltaStatement = (original: number, final: number) => {
          if (original - final < 0)
            return `▲ $${parseFloat(
              (final - original).toFixed(2)
            ).toLocaleString()}`;
          else if (original - final > 0)
            return `▼ -$${parseFloat(
              Math.abs(final - original).toFixed(2)
            ).toLocaleString()}`;
        };
        const customTooltipHTML = `
          <div class="card">
            <main>${value}</main>
            <div class="caption">${date.toLocaleDateString()}</div>
            <div class="caption">${date
              .toLocaleTimeString()
              .replaceAll(" ", "")}</div>
            <div class="delta">${getDeltaStatement(
              originalValue,
              data[0].value
            )}</div>
          </div>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap');
            
            main {
              font-size: 2.0vw;
              font-weight: 700;
            }
            .card {
              font-family: 'Inter', 'sans-serif';
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding: 0.7vw 1vw 0.7vw 0.7vw;
            }
            .caption {
              font-size: 1.3vw;
              font-weight: 500;
            }
            .delta {
              color: ${
                data[0].value - originalValue > 0
                  ? "rgb(0, 199, 36)"
                  : data[0].value - originalValue < 0
                  ? "rgb(255, 26, 0)"
                  : null
              };
              font-size: 1.65vw;
              font-weight: 700;
            }
          </style>
          <script></script>
        `;
        return customTooltipHTML;
      },
    },
  };

  return (
    <StyledValueChartWrapper>
      <LineChart data={data} options={options} />
    </StyledValueChartWrapper>
  );
};
