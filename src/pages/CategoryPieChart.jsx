import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'

const COLORS = [
	'#8884d8',
	'#82ca9d',
	'#ffc658',
	'#ff7f50',
	'#00c49f',
	'#ffbb28',
]

export default function CategoryPieChart({ data }) {
	const chartData = Object.entries(data).map(([name, value]) => ({
		name,
		value,
	}))

	return (
		<div className='w-full h-64'>
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart>
					<Pie
						data={chartData}
						cx='50%'
						cy='50%'
						outerRadius={80}
						fill='#8884d8'
						dataKey='value'
						label
					>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}
