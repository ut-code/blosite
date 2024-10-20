const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Base config that applies to either development or production mode.
const config = {
  entry: {
    index: './src/index.js',
    tutorial: './src/tutorial/index.js',
    sandbox: './src/sandbox/index.js',
  },
  output: {
    // Compile the source files into a bundle.
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // Enable webpack-dev-server to get hot refresh of the app.
  devServer: {
    static: './build',
  },
  module: {
    rules: [
      {
        // Load CSS files. They can be imported into JS files.
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Generate the HTML index page based on our template.
    // This will output the same index page with the bundle we
    // created above added in a script tag.
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorial/index.html', // tutorial用のHTMLテンプレート
      filename: 'tutorial/index.html',       // dist/tutorial/index.htmlとして出力
      chunks: ['tutorial'],
    }),
    new HtmlWebpackPlugin({
      template: './src/sandbox/index.html', // sandbox用のHTMLテンプレート
      filename: 'sandbox/index.html',        // dist/sandbox/index.htmlとして出力
      chunks: ['sandbox'],
    }),
    new HtmlWebpackPlugin({
      template: './src/todo/index.html', // sandbox用のHTMLテンプレート
      filename: 'todo/index.html',        // dist/sandbox/index.htmlとして出力
      chunks: ['todo'],
    }),

  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // Set the output path to the `build` directory
    // so we don't clobber production builds.
    config.output.path = path.resolve(__dirname, 'build');

    // Generate source maps for our code for easier debugging.
    // Not suitable for production builds. If you want source maps in
    // production, choose a different one from https://webpack.js.org/configuration/devtool
    config.devtool = 'eval-cheap-module-source-map';

    // Include the source maps for Blockly for easier debugging Blockly code.
    config.module.rules.push({
      test: /(blockly\/.*\.js)$/,
      use: [require.resolve('source-map-loader')],
      enforce: 'pre',
    });

    // Ignore spurious warnings from source-map-loader
    // It can't find source maps for some Closure modules and that is expected
    config.ignoreWarnings = [/Failed to parse source map/];
  }
  return config;
};
