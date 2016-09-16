React = require("react");
ColorPicker = require('rc-color-picker');
GradientMixer = require('./gradient-mixer.jsx');
ColorSample = require('./color-sample.jsx');
require('rc-color-picker/assets/index.css');
require('./react-color-mixer.scss');
Color = require('color');

var ColorMixer = React.createClass({
  gradientColor: null,

  getInitialState() {
      return {
          gradientColor: "#800080",
          gradientColorComplementary: "#008000",
          color1: '#ff0000',
          color2: '#0000ff'
      };
  },

  changeHandlerColor1: function(e){
    this.refs.gradient.setColor1(e.color);
    this.setState({color1: e.color, color2: this.state.color2});
  },
  changeHandlerColor2: function(e){
     this.refs.gradient.setColor2(e.color);
     this.setState({color1:this.state.color1,color2: e.color});
  },
  getMixerContainer: function(){
    return this.refs.mixerContainer;
  },
  changeHandlerGradientColor: function(color){
    var compl = new Color(color);
    compl.rotate(180);
    var complHex = compl.hexString();

    this.setState({
      gradientColor: color,
      gradientColorComplementary: complHex
    });

    if(this.refs.verticalTint){
      this.refs.verticalTint.setColor1(color);
      this.refs.verticalTintCompl.setColor1(complHex);
      this.refs.verticalShade.setColor1(color);
      this.refs.verticalShadeCompl.setColor1(complHex);
      this.refs.colorSample.setColor(color);
      this.refs.complementarySample.setColor(complHex);
    }

    

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
            <ColorSample
              ref="colorSample"
              color={gradientColor}
            />
            <p>Color Mix</p>
            <GradientMixer
              ref="verticalTint"
              vertical="true"
              pickerDisabled="true"
              color1 = {gradientColor}
              color2 = "#ffffff"
            />
            <GradientMixer
              ref="verticalShade"
              vertical="true"
              pickerDisabled="true"
              color1 = {gradientColor}
              color2 = "#000000"
            />
            <span className="label">Tints</span>
            <span className="label">Shades</span>
          </div>
          <div className="mixer-result-color">
             <ColorSample
              ref="complementarySample"
              color={gradientColorComplementary}
            />
            <p>Color Compl.</p>
            <GradientMixer
              ref="verticalTintCompl"
              pickerDisabled="true"
              vertical="true"
              color1= {gradientColorComplementary}
              color2="#ffffff"
            />
            <GradientMixer
              ref="verticalShadeCompl"
              vertical="true"
              pickerDisabled="true"
              color1 = {gradientColorComplementary}
              color2 = "#000000"
            />
            <span className="label">Tints</span>
            <span className="label">Shades</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ColorMixer;
