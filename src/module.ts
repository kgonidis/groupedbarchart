import { PanelPlugin } from '@grafana/data';
import { BarOptions } from './types';
import { GroupedBarPanel } from './GroupedBar';

export const plugin = new PanelPlugin<BarOptions>(GroupedBarPanel).setPanelOptions(builder => {
  return builder
    .addRadio({
      path: 'barType',
      defaultValue: 'stack',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'stack',
            label: 'Stack',
          },
          {
            value: 'group',
            label: 'Group',
          },
        ],
      },
    })
    .addBooleanSwitch({
      path: 'showLegend',
      name: 'Show graph legend',
      defaultValue: false,
    })
    .addColorPicker({
      path: 'fieldColor1',
      name: 'Metric 1 Color',
      defaultValue: '#73BF69',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor2',
      name: 'Metric 2 Color',
      defaultValue: '#FF9830',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor3',
      name: 'Metric 3 Color',
      defaultValue: '#F2495C',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor4',
      name: 'Metric 4 Color',
      defaultValue: '#5794F2',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor5',
      name: 'Metric 5 Color',
      defaultValue: '#FADE2A',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor6',
      name: 'Metric 6 Color',
      defaultValue: '#B877D9',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor7',
      name: 'Metric 7 Color',
      defaultValue: '#8AB8FF',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    })
    .addColorPicker({
      path: 'fieldColor8',
      name: 'Metric 8 Color',
      defaultValue: '#FFA6B0',
      settings: {
        allowUndefined: true,
        disableNamedColors: true,
        textWhenUndefined: 'default',
      },
    });
});
