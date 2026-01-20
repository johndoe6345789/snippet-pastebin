import { ComponentProps } from "react"

interface SliderProps extends ComponentProps<"input"> {
  min?: number
  max?: number
  step?: number
}

function Slider({ className, min = 0, max = 100, step = 1, ...props }: SliderProps) {
  return (
    <div className={["mdc-slider", className].filter(Boolean).join(" ")} role="slider" aria-valuemin={min} aria-valuemax={max}>
      <input type="range" min={min} max={max} step={step} className="mdc-slider__input" {...props} />
      <div className="mdc-slider__track">
        <div className="mdc-slider__track--inactive" />
        <div className="mdc-slider__track--active">
          <div className="mdc-slider__track--active_fill" />
        </div>
      </div>
      <div className="mdc-slider__thumb">
        <div className="mdc-slider__thumb-knob" />
      </div>
    </div>
  )
}

export { Slider }
