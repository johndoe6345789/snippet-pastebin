import { ComponentProps } from "react"

type AlertVariant = "default" | "destructive"

function Alert({ className, variant = "default", children, ...props }: ComponentProps<"div"> & { variant?: AlertVariant }) {
  return (
    <div
      role="alert"
      className={["mdc-banner", variant === "destructive" && "mdc-banner--error", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="mdc-banner__content">
        <div className="mdc-banner__graphic-text-wrapper">
          <div className="mdc-banner__text">{children}</div>
        </div>
      </div>
    </div>
  )
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div className={["mdc-typography--subtitle1", className].filter(Boolean).join(" ")} {...props} />
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div className={["mdc-typography--body2", className].filter(Boolean).join(" ")} {...props} />
}

export { Alert, AlertTitle, AlertDescription }
