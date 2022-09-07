// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// webpack中所有的配置信息都因该卸载module.exports
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在的目录
    output: {
        // 指定打包的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件
        filename: 'vermount.js',
        clean: true,
        // 告诉webpack不使用箭头函数
        environment: {
            // arrowFunction: false,
            // const: false,
        }
    },

    // 指定webpack打包时使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定得十规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置Babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容环境的插件
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 要指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage",
                                    },
                                ],
                            ],
                        }
                    }
                    ,
                    'ts-loader'],
                // 要排除的文件
                exclude: /node_modules/
            },
            // 设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ],
            },
        ],
    },

    // 配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/index.html",
        }),
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js'],
    }
};