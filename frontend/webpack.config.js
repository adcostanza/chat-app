var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[chunkhash].bundle.js",
    //put in the base directory docs folder
    path: path.resolve(__dirname, "..", "docs")
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "#inline-source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },

  // node: {
  //     fs: "empty"
  //  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html")
    })
  ]
};
