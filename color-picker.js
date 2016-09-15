React = require("react");
ColorPicker = require('rc-color-picker');
require("rc-color-picker/assets/index.css");

var ReactColorPicker = React.createClass({
  changeHandler: function(e){
  	console.log(e);
  },
  render: function() {
    return (
	    <ColorPicker
	      animation="slide-up"
	      placement="bottomLeft"
	      color={'#36c'}
	      onChange={this.changeHandler}
	    />
    );
  }
});

module.exports = ReactColorPicker;
