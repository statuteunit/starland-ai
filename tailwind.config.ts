import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],
	content: ['./app_pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1400px',
			'3xl': '1920px',
			'4xl': '2500px'
		},
		extend: {
			colors: {
				background: '',
				foreground: '',
				primary: {
					1: '#f1f5f9',
					2: '#1e293b'
				},
				'primary-foreground': '',
				secondary: '',
				'secondary-foreground': '',
				muted: '',
				'muted-foreground': '',
				accent: '',
				'accent-foreground': '',
				cancel: '',
				destructive: '',
				// 处理 text 对象，映射到新的扁平变量名
				text: {
					1: '',
					2: '',
					3: '',
					4: '',
					5: '',
					6: '',
					7: '',
					8: '',
					9: '',
					10: ''
				}
			},
			borderRadius: {
				sm: '0.5rem',
				default: '0.625rem'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'sk-loading': {
					'0%, 100%': { transform: 'scale(0.0)' },
					'50%': { transform: 'scale(1.0)' }
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(2rem)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				fadeOutDown: {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(2rem)' }
				},
				caretBlink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'sk-loading': 'sk-loading 2.0s infinite ease-in-out;',
				'fade-in-up': 'fadeInUp 1s ease-in-out',
				'fade-out-down': 'fadeOutDown 1s ease-in-out',
				'caret-blink': 'caretBlink 1s infinite'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
