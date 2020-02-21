const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: ["./src/js/app.js", "./src/scss/main.scss"],
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new CopyPlugin([
      { from: './src/index.html', to: './' },
      { from: './src/about.html', to: './' },
      { from: './src/tours.html', to: './' },
      { from: './src/contact.html', to: './' },
      { from: './src/img', to: './img' },
    ])
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: !devMode
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    stats: "errors-only",
    open: true,
    contentBase: path.join(__dirname, 'src'),
    inline: true,
    hot: true,
    progress: true,
  }
};
