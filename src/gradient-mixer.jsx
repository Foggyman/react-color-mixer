React = require("react");
ColorPicker = require('rc-color-picker');
ReactDOM = require('react-dom');
rcUtilAddEventListener = require('rc-util/lib/Dom/addEventListener');
Colr = require('colr');


var GradientMixer = React.createClass({

  color1: {
    hsv: {
      h: 0,
      s: 100,
      v: 100
    },
    color: "#ff0000"
  },
  color2: {
    hsv: {
      h: 120,
      s: 100,
      v: 100
    },
    color: "#00ff00"
  },


  getInitialState: function() {
    return {perPosition: 50};
  },

  componentDidMount: function() {
    this.updateCanvas();
    this.updateGradintColor();
  },

  mouseDownHandler: function(e){
    this.moveGradient(e.clientX);

    this.dragListener = rcUtilAddEventListener(window, 'mousemove', this.mouseDragHandler);
    this.dragUpListener = rcUtilAddEventListener(window, 'mouseup', this.mouseDragEndHandler);

  },

  mouseDragHandler: function(e){
    this.moveGradient(e.clientX);
  },

  mouseDragEndHandler: function(e){
    this.moveGradient(e.clientX);
    this.removeListeners();
  },

  removeListeners: function() {
    if (this.dragListener) {
      this.dragListener.remove();
      this.dragListener = null;
    }
    if (this.dragUpListener) {
      this.dragUpListener.remove();
      this.dragUpListener = null;
    }
  },

  moveGradient(x){
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    var width = rect.width;
    var left = x - rect.left;
    left = Math.max(0, left);
    left = Math.min(left, width);
    this.setState({perPosition: 100* (left / width) },this.updateGradintColor);

  },


  updateGradintColor: function(){


    var p = this.state.perPosition  / 100;
    console.log(p);

    var rgb1 = Colr.fromHex(this.color1.color).toRgbObject();
    var rgb2 = Colr.fromHex(this.color2.color).toRgbObject();

    var gradientColor = Colr.fromRgb(rgb2.r * p + rgb1.r * (1 - p),rgb2.g * p + rgb1.g * (1 - p),rgb2.b * p + rgb1.b * (1 - p));
      

    this.props.onChange(gradientColor.toHex());
  },

  setColor1: function(color) {
    this.color1 = color;
    this.updateCanvas();
    this.updateGradintColor();
  },

  setColor2: function(color) {
    this.color2 = color;
    this.updateCanvas();
    this.updateGradintColor();
  },

  updateCanvas: function() {
    var ctx = this.refs.canvas.getContext('2d');

    ctx.canvas.width  = 300;
    ctx.canvas.height = 25;

    var grd=ctx.createLinearGradient(0,0,300,0);
    grd.addColorStop(0,this.color1.color);
    grd.addColorStop(1,this.color2.color);


    ctx.clearRect(0, 0, 300, 25);
    ctx.fillStyle=grd;
    ctx.fillRect(0, 0, 300, 25);
  },

  render: function() {
    var perPosition = this.state.perPosition;
    return (
      <div
        className="gradient-picker"
        onMouseDown={this.mouseDownHandler}
      >
  	    <canvas ref="canvas"/>
        <span className="gradient-point" style={{left: perPosition + '%'}}></span>
      </div>
    );
  }
});

module.exports = GradientMixer;
