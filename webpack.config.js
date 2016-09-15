module.exports = {
     entry: './Demo/main.js',
     output: {
         path: './Demo',
         filename: 'bundle.js'
     },
     module: {
	     loaders: [
	     	{
	     		test: /\.css$/,
	     		loader: "style!css"
	     	},
	     	{ 
	     		test: /\.js$/,
	     		loader: 'babel-loader',
	     	  	exclude: /(node_modules)/,
	      		query: {
			    	presets: ['react']
			    }
	     	},
	     	{
		        test: /\.less$/,
		        loader: "style!css!less"
		    }
	     ]
	 }
 };