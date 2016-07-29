import React, {Component, PropTypes} from 'react'
import ReactSlider from './slider.react'

// wrapper for ReactSlider

class Slider extends Component{

  static displayName = 'Slider'

  render(){

    let {
      min: min = 1,
      max: max = 200,
      step: step = 1,
      value: value = 0,
      onMouseDown: onMouseDown = e => {},
      onMouseUp: onMouseUp = e => {},
    } = this.props

    return (
      <ReactSlider
        min={min}
        max={max}
        step={step}
        type={this.props.type}
        label={this.props.label}
        value={value}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onChange={this.props.onChange}
      />
    )
  }
}

Slider.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  type: PropTypes.string.isRequired,
}

export default Slider

