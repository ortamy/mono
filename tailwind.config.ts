import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Палитра AgentOS — строгий монохром. Исключение: семантические цвета дельт
      // (up/down) — они несут смысл роста/падения и используются только в метриках.
      colors: {
        agentos: {
          bg: '#FAFAFA',
          card: '#FFFFFF',
          line: '#E5E5E5',
          ink: '#0A0A0A',
          muted: '#737373',
          faint: '#A3A3A3',
          soft: '#F5F5F5',
          // Промежуточный серый: второй уровень шкалы скора и текст бейджей.
          graphite: '#404040',
          up: '#16A34A',
          down: '#DC2626',
        },
      },
      borderRadius: {
        agentos: '10px',
        control: '6px',
      },
      fontFamily: {
        agentos: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;