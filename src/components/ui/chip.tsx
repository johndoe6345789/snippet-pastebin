import { ComponentProps } from "react"

function Chip({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={["mdc-evolution-chip", className].filter(Boolean).join(" ")}
      {...props}
    >
      <span className="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary">
        <span className="mdc-evolution-chip__action mdc-evolution-chip__action--primary">
          <span className="mdc-evolution-chip__ripple" />
          <span className="mdc-evolution-chip__text-label">{children}</span>
        </span>
      </span>
    </button>
  )
}

export { Chip }
