<template>
	<v-chart class="chart" :option="chartOption"></v-chart>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'

import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from 'echarts/components'

import VChart, { THEME_KEY } from 'vue-echarts'

use([
	CanvasRenderer,
	PieChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
])

export default {
	props: ['title', 'subtext', 'label', 'url', 'date', 'group'],

	components: { VChart },

	provide: {
		[THEME_KEY]: 'light',
	},

	data() {
		return {
			data: [],
			chartOption: {
				title: {
					text: this.title,
					left: 'center',
					subtext: this.subtext,
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				legend: {
					orient: 'vertical',
					top: 'middle',
					left: 'left',
					data: [],
					formatter: (n) => {
						const { name, value } = this.data.find((d) => d.name == n)
						return `${name} = ${this.$decimal(value)}`
					},
				},
				series: [
					{
						name: this.label,
						type: 'pie',
						radius: '55%',
						center: ['65%', '60%'],
						data: [],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			},
		}
	},

	methods: {
		getData() {
			const params = { date: this.date, group: this.group }
			this.$axios.$get(this.url, { params }).then((res) => {
				this.data = res
				this.chartOption.legend.data = res.map((d) => d.name)
				this.chartOption.series[0].data = res
			})
		},
	},

	created() {
		this.getData()
	},

	watch: {
		date(v) {
			this.getData()
		},
	},
}
</script>

<style scoped>
.chart {
	height: 300px;
}
</style>
