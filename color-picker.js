React = require("react");
ColorPicker = require('rc-color-picker');
require("rc-color-picker/assets/index.css");

var ReactColorPicker = React.createClass({
  changeHandler: function(e){
  	console.log(e);
  },
  render: function() {
    return (
      <div style={{ margin: '20px 20px 20px', textAlign: 'center' }}>
	    <ColorPicker
	      animation="slide-up"
	      color={'#36c'}
	      onChange={this.changeHandler}
	    />
	  </div>
    );
  }
});

module.exports = ReactColorPicker;
