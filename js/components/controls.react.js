import React, {Component, PropTypes} from 'react'
import Slider from '../components/slider_wrapper'

export default class Controls extends Component{

  static displayName = 'Controls'

  static propTypes = {
    autoRender: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    sliders: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props){
    super(props)
  }

  render(){
    let sliders = []
    this.props.sliders.forEach((slider, i) => {
      sliders.push(
        <Slider
          key={`slider_${i}`}
          value={this.props.sliderValues[slider.type]}
          type={slider.type}
          label={slider.label}
          min={slider.min}
          max={slider.max}
          step={slider.step}
          onChange={this.props.onChange}
        />
      )
    })

    return(
      <div id="controls">
        <div id="button">
          <label>auto render: </label>
          <input
            type="button"
            value={this.props.autoRender ? 'on' : 'off'}
            onClick={this.props.onClick}
          />
        </div>
        <div id="sliders">
          {sliders}
        </div>
      </div>
    )
  }
}

