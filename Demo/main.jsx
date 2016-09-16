require("./demo.scss");

var React = require('react');
var ReactDOM = require('react-dom');
var ColorMixer = require("../src/color-mixer.jsx");



ReactDOM.render(
  <ColorMixer/>,
  document.getElementById('content')
);