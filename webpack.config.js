
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    //entrypoint is where webpack will start the bundle i.e looking at all the dependies that it inteds to bundle.
    //"./" is means current folder
    entry:  ['./src/js/index.js'],
    output: {
        //path resolve which is a method available to us through the path node package will join the current absolute path with the one we want our bundle to be in ("dist/js")
        path: path.resolve(__dirname, "dist"),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ],
    module: {
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            }
        ]
    }
}