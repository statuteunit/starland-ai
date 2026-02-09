const config = {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 16, // 基准值
			propList: ['*'],
			selectorBlackList: ['.no-rem'], // 忽略带此类名的样式
			replace: true,
			mediaQuery: false,
			minPixelValue: 0
		}
	}
}

export default config;