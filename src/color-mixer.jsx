React = require("react");
ColorPicker = require('rc-color-picker');
GradientMixer = require('./gradient-mixer.jsx');
require("rc-color-picker/assets/index.css");
require("./react-color-mixer.scss")

var ColorMixer = React.createClass({
  gradientColor: null,

  getInitialState() {
      return {
          gradientColor: null,
          color1: '#ff0000',
          color2: '#00ff00'
      };
  },

  changeHandlerColor1: function(e){
    this.refs.gradient.setColor1(e);
    this.setState({color1: e.color});
  },
  changeHandlerColor2: function(e){
     this.refs.gradient.setColor2(e);
     this.setState({color2: e.color});
  },
  getMixerContainer: function(){
    return this.refs.mixerContainer;
  },
  changeHandlerGradientColor: function(color){
    this.setState({gradientColor: color});
  },

  getGradientResultContainer: function(){
    return this.refs.mixerResult;
  },


  render: function() {

    var gradientColor = this.state.gradientColor;
    var color1 = this.state.color1;
    var color2 = this.state.color2;

    return (
      <div className="rc-color-mixer" ref="mixerContainer">
        <div className="mixer-result" ref="mixerResult">
          <ColorPicker
            getCalendarContainer={this.getGradientResultContainer}
            animation="slide-up"
            placement="bottomLeft"
            color={gradientColor}
          />
        </div>
  	    <ColorPicker
          getCalendarContainer={this.getMixerContainer}
  	      animation="slide-up"
  	      placement="bottomLeft"
  	      color={color1}
  	      onChange={this.changeHandlerColor1}
  	    />
        <GradientMixer
          ref="gradient"
          onChange={this.changeHandlerGradientColor}
        />
        <ColorPicker
          getCalendarContainer={this.getMixerContainer}
          className="rc-color-picker-sipliefied"
          animation="slide-up"
          placement="bottomRight"
          color={color2}
          onChange={this.changeHandlerColor2}
        />
      </div>
    );
  }
});

module.exports = ColorMixer;
