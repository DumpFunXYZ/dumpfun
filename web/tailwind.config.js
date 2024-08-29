const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      scale: {
        '95': '0.95',
        '105': '1.05',
      }
    }
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
    }
  },
  plugins: [require('daisyui')],
};
