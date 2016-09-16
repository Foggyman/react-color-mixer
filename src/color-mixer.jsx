React = require("react");
ColorPicker = require('rc-color-picker');
GradientMixer = require('./gradient-mixer.jsx');
require('rc-color-picker/assets/index.css');
require('./react-color-mixer.scss');
Color = require('color');

var ColorMixer = React.createClass({
  gradientColor: null,

  getInitialState() {
      return {
          gradientColor: null,
          gradientColorComplementary: null,
          color1: '#ff0000',
          color2: '#0000ff'
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
    var compl = new Color(color);
    compl.rotate(180);

    this.setState({
      gradientColor: color,
      gradientColorComplementary: compl.hexString()
    });

  },

  getGradientResultContainer: function(){
    return this.refs.mixerResult;
  },


  render: function() {

    var gradientColor = this.state.gradientColor;
    var gradientColorComplementary = this.state.gradientColorComplementary;
    var color1 = this.state.color1;
    var color2 = this.state.color2;

    return (
      <div className="rc-color-mixer" ref="mixerContainer">
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
          color1 = {color1}
          color2 = {color2}
        />
        <ColorPicker
          getCalendarContainer={this.getMixerContainer}
          className="rc-color-picker-sipliefied"
          animation="slide-up"
          placement="bottomRight"
          color={color2}
          onChange={this.changeHandlerColor2}
        />
        <div className="mixer-result" ref="mixerResult">
          <div className="mixer-result-color">
            <ColorPicker
              getCalendarContainer={this.getGradientResultContainer}
              animation="slide-up"
              placement="bottomLeft"
              color={gradientColor}
            />
            <p>Color Mix</p>
          </div>
          <div className="mixer-result-color">
            <ColorPicker
              getCalendarContainer={this.getGradientResultContainer}
              animation="slide-up"
              placement="bottomLeft"
              color={gradientColorComplementary}
            />
            <p>Color Compl.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ColorMixer;
