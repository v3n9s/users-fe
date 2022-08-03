import 'webpack-dev-server';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default function({ ISDEV }: { ISDEV: true | undefined }): Configuration {
  return {
    mode: ISDEV ? 'development' : 'production',
    entry: {
      index: './src/index'
    },
    devtool: ISDEV ? 'eval-cheap-source-map' : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 3000
    },
    resolve: {
      extensions: ['.ts', '.tsx', '...']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: false
      }),
      new MiniCssExtractPlugin(),
      new ForkTsCheckerWebpackPlugin()
    ],
    output: {
      clean: true
    }
  };
}
