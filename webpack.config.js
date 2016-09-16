module.exports = {
     entry: './Demo/main.jsx',
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
	     		test: /\.jsx$/,
	     		loader: 'babel-loader',
	     	  	exclude: /(node_modules)/,
	      		query: {
			    	presets: ['react']
			    }
	     	},
	     	{
		        test: /\.scss$/,
		        loaders: ["style", "css", "sass"]
		    },
		    {
		      test: /\.js$/,
		      exclude: /(node_modules)/,
		      loader: 'babel-loader',
		      query: {
		        presets: ['es2015']
		      }
		    }
	     ]
	 }
 };