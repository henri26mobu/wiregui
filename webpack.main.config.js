module.exports = {
  target: 'electron-main',
  entry: './src/main.ts',
  module: { rules: require('./webpack.rules') },
  resolve: { extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'] },
};
