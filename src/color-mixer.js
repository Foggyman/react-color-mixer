React = require("react");
ColorPicker = require('rc-color-picker');
require("rc-color-picker/assets/index.css");

var ColorMixer = React.createClass({
  changeHandlerColor1: function(e){
  	console.log("Color 1:");
    console.log(e);
  },
  changeHandlerColor2: function(e){
    console.log("Color 2:");
    console.log(e);
  },
  render: function() {
    return (
      <div>
  	    <ColorPicker
  	      animation="slide-up"
  	      placement="bottomLeft"
  	      color={'#36c'}
  	      onChange={this.changeHandlerColor1}
  	    />
        <ColorPicker
          animation="slide-up"
          placement="bottomLeft"
          color={'#67f'}
          onChange={this.changeHandlerColor2}
        />
      </div>
    );
  }
});

module.exports = ColorMixer;
