React = require("react");
ColorPicker = require('rc-color-picker');
ReactDOM = require('react-dom');
rcUtilAddEventListener = require('rc-util/lib/Dom/addEventListener');
Colr = require('colr');


var GradientMixer = React.createClass({

  color1: "#ff0000",
  color2: "#00ff00",

  vertical: false,

  pickerDisabled: false,

  width: 300,
  height: 25,

  getInitialState: function() {
    return {perPosition: 50};
  },

  componentDidMount: function() {
    this.color1 = this.props.color1 || this.color1;
    this.color2 = this.props.color2 || this.color2;

    this.vertical = this.props.vertical || this.vertical;
    this.pickerDisabled = this.props.pickerDisabled || this.pickerDisabled;


    if(this.vertical){
      this.width = 25;
      this.height = 300;
    }

    this.updateCanvas();
    this.updateGradientColor();
  },

  mouseDownHandler: function(e){
    if(this.pickerDisabled) return;
    if(this.vertical){
      this.moveGradient(e.clientY);
    }else{
      this.moveGradient(e.clientX);
    }
    

    this.dragListener = rcUtilAddEventListener(window, 'mousemove', this.mouseDragHandler);
    this.dragUpListener = rcUtilAddEventListener(window, 'mouseup', this.mouseDragEndHandler);

  },

  mouseDragHandler: function(e){
    if(this.vertical){
      this.moveGradient(e.clientY);
    }else{
      this.moveGradient(e.clientX);
    }
    
  },

  mouseDragEndHandler: function(e){
    if(this.vertical){
      this.moveGradient(e.clientY);
    }else{
      this.moveGradient(e.clientX);
    }
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

  moveGradient(coord){
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    if(this.vertical){
       var height = rect.height;
       var top = coord -rect.top;
       top = Math.max(0, top);
       top = Math.min(top, height);
       this.setState({perPosition: 100* (top / height) },this.updateGradientColor);
    }else{
      var width = rect.width;
      var left = coord - rect.left;
      left = Math.max(0, left);
      left = Math.min(left, width);
      this.setState({perPosition: 100* (left / width) },this.updateGradientColor);
    } 

  },


  updateGradientColor: function(){


    var p = this.state.perPosition  / 100;

    var rgb1 = Colr.fromHex(this.color1).toRgbObject();
    var rgb2 = Colr.fromHex(this.color2).toRgbObject();

    var gradientColor = Colr.fromRgb(rgb2.r * p + rgb1.r * (1 - p),rgb2.g * p + rgb1.g * (1 - p),rgb2.b * p + rgb1.b * (1 - p));
      
    if(!this.pickerDisabled){
      this.props.onChange(gradientColor.toHex());
    }
    
  },

  setColor1: function(color) {
    this.color1 = color;
    this.updateCanvas();
    this.updateGradientColor();
  },

  setColor2: function(color) {
    this.color2 = color;
    this.updateCanvas();
    this.updateGradientColor();
  },

  updateCanvas: function() {
    var ctx = this.refs.canvas.getContext('2d');

    ctx.canvas.width  = this.width;
    ctx.canvas.height = this.height;

    var grd=ctx.createLinearGradient(0,0,this.vertical?0:this.width,this.vertical?this.height:0);


    grd.addColorStop(0,this.color1);
    grd.addColorStop(1,this.color2);


    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle=grd;
    ctx.fillRect(0, 0, this.width, this.height);
  },

  render: function() {
    var containerClass = "gradient-picker";
    var pointStyle = {
      left: this.state.perPosition + '%'
    };
    if(this.props.vertical) {
      containerClass += " vertical-gradient";
      pointStyle = {
        top: this.state.perPosition + '%'
      }
    }
    if(this.props.pickerDisabled) {
      containerClass += " disable-picker";
    }
    
    return (
      <div
        className={containerClass}
        onMouseDown={this.mouseDownHandler}
      >
  	    <canvas ref="canvas"/>
        <span className="gradient-point" style={pointStyle}></span>
      </div>
    );
  }
});

module.exports = GradientMixer;
