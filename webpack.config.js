const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: {
    app: "./src/app.ts",
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    sourcePrefix: "",
  },
  resolve: {
    fallback: { https: false, zlib: false, http: false, url: false },
    mainFiles: ["app", "Cesium"],
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: ["url-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false, // file-loader 默认使用 ES6 模块解析，将其关闭，启用 CommonJS 模块，不配置这个，html 文件中的图片路径不对
            name: "img/[name]_[hash:6].[ext]",
          },
        },
      },
    ],
  },
  devServer: {
    // 设置服务入口，localhost:9000就可以直接访问public和dist里面的资源文件了
    // contentBase: [
    //   path.resolve(__dirname, "public"),
    //   path.resolve(__dirname, "dist"),
    // ],
    open: true,
    compress: true, // 压缩
    host: "0.0.0.0", // 设置局域网访问
    port: "3030", // 设置端口
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/app.html",
    }),
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
        { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
        {
          // 从public中复制文件
          from: path.resolve(__dirname, "public"),
          // 把复制的文件存放到dis里面
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify(""), // Define relative base path in cesium for loading assets
    }),
  ],
  mode: "development",
  devtool: "inline-source-map",
};
