import {Card, useTheme} from 'react-native-paper';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {GridComponent, LegendComponent} from 'echarts/components';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {uppercase} from '../../helper';
import {useRef, useEffect} from 'react';
import {PokemonItem, Stat} from '../../api/types';

echarts.use([SVGRenderer, BarChart, GridComponent, LegendComponent]);

export function Chart({
  firstPokemon,
  secondPokemon,
  firstStat,
  secondStat,
}: {
  firstPokemon:
    | {
        item: PokemonItem;
        pokeId: number;
      }
    | undefined;
  secondPokemon:
    | {
        item: PokemonItem;
        pokeId: number;
      }
    | undefined;
  firstStat: Array<Stat> | undefined;
  secondStat: Array<Stat> | undefined;
}) {
  const {colors} = useTheme();

  const svgRef = useRef<any>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const option = {
      legend: {
        textStyle: {
          color: colors.onSurface,
        },
      },
      xAxis: {
        type: 'category',
        data: ['HP', 'ATK', 'DEF', 'SP ATK', 'SP DEF', 'Speed'],
        axisLine: {
          lineStyle: {
            color: colors.onSurface,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: colors.onSurface,
          },
        },
      },
      series: [
        {
          name: firstPokemon ? uppercase(firstPokemon.item.name) : '',
          data: firstStat
            ? firstStat.map(stat => stat.base_stat)
            : [0, 0, 0, 0, 0, 0],
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            color: colors.onSurface,
          },
        },
        {
          name: secondPokemon ? uppercase(secondPokemon.item.name) : '',
          data: secondStat
            ? secondStat.map(stat => stat.base_stat)
            : [0, 0, 0, 0, 0, 0],
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            color: colors.onSurface,
          },
        },
      ],
    };
    let chart: null | echarts.ECharts = null;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 350,
      });
      chart.setOption(option);
      chartRef.current = chart;
    }

    return () => chart?.dispose();
  }, [firstStat, secondStat, colors]);

  return (
    <Card style={{marginTop: 16}}>
      <Card.Title title="Stats" />
      <Card.Content>
        <SvgChart ref={svgRef} useRNGH />
      </Card.Content>
    </Card>
  );
}
