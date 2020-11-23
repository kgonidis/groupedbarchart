import React from 'react';
import { PanelProps, LoadingState } from '@grafana/data';
import { BarOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { Data } from 'plotly.js';
import Plot from 'react-plotly.js';

interface Props extends PanelProps<BarOptions> {}

declare global {
  interface Array<T> {
    Unique(): T[];
  }
}

Array.prototype.Unique = function() {
  function onlyUnique(value: any, index: number, self: string | any[]) {
    return self.indexOf(value) === index;
  }
  return this.filter(onlyUnique);
};

export const GroupedBarPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  let traces: Data[] = [];
  if (data.state === LoadingState.Done && data.series.length >= 1 && data.series[0].fields.length >= 3) {
    const fields = data.series[0].fields;
    const metrics = fields[0].values.toArray();
    const X = fields[1].values.toArray();
    const Y = fields[2].values.toArray();
    const colors = [
      options.fieldColor1,
      options.fieldColor2,
      options.fieldColor3,
      options.fieldColor4,
      options.fieldColor5,
      options.fieldColor6,
      options.fieldColor7,
      options.fieldColor8,
    ];
    const d = [];
    for (let i = 0; i < X.length; i++) {
      d.push({
        series: metrics[i],
        x: X[i],
        y: Y[i],
      });
    }

    let uniqueMetrics = metrics.Unique();
    let uniqueX = X.Unique();
    for (let i = 0; i < uniqueMetrics.length; i++) {
      let m = uniqueMetrics[i];
      let y = [];
      let xx = [];
      for (const x of uniqueX) {
        const v = d.find(v => v.series === m && v.x === x);
        if (v === undefined) {
          //y.push(0);
        } else {
          xx.push(v.x);
          y.push(v.y);
        }
      }

      traces.push({
        x: xx,
        y: y,
        name: m,
        marker: { color: i < 8 ? colors[i] : undefined },
        type: 'bar',
      });
    }
  }
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Plot
        data={traces}
        layout={{
          barmode: options.barType,
          width: width,
          height: height,
          plot_bgcolor: theme.colors.bg1,
          paper_bgcolor: theme.colors.bg1,
          xaxis: {
            linecolor: theme.colors.text,
            tickcolor: theme.colors.text,
            tickfont: { color: theme.colors.text },
            type: 'category',
          },
          yaxis: {
            linecolor: theme.colors.text,
            tickcolor: theme.colors.text,
            tickfont: { color: theme.colors.text },
          },
          margin: { l: 40, r: 0, b: 40, t: 40 },
          showlegend: options.showLegend,
          legend: { x: 1, y: 1, xanchor: 'right' },
        }}
      />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
