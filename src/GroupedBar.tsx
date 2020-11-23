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
  const trace: Data = {
    type: 'bar',
    x: [],
    y: [],
    marker: {
      color: [],
    },
    text: [],
  };
  if (data.state === LoadingState.Done && data.series.length >= 1 && data.series[0].fields.length >= 3) {
    const fields = data.series[0].fields;
    trace.text = fields[0].values.toArray();
    trace.x = fields[1].values.toArray();
    trace.y = fields[2].values.toArray();
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

    const _colors: string[] = [];

    if (trace.text.length) {
      let next_metric = '';
      let color_index = 0;
      for (let i = 0; i < trace.text.length; i++) {
        const metric = trace.text[i];

        if (metric !== next_metric) {
          color_index++;
          next_metric = metric;
        }

        _colors.push(colors[color_index]);
      }
    }

    trace.marker = { colors: _colors };
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
        data={[trace]}
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
