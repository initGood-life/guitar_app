import purgeCSSPlugin from "@fullhuman/postcss-purgecss";

const purgecss = purgeCSSPlugin({
  content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { '@fullhuman/postcss-purgecss': purgecss } : {})
  },
};
