React = require("react");
require('./react-color-mixer.scss');

var ColorSample = React.createClass({
	getInitialState: function() {
	    return {color: this.props.color};
	},

	setColor: function(color){
		this.setState({color: color});
	},

	render: function() {
		var bgColor = this.state.color;
		return (
			<div className="colorSample">
				<div style={{backgroundColor: bgColor}} />
			</div>
		);
	}
});


module.exports = ColorSample;