import { ComponentProps } from "react"

function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={["mdc-card", className].filter(Boolean).join(" ")} {...props} />
}

function CardHeader(props: ComponentProps<"div">) {
  return <div className="mdc-card__primary-action" {...props} />
}

function CardTitle(props: ComponentProps<"div">) {
  return <h3 className="mdc-typography--headline6" {...props} />
}

function CardContent(props: ComponentProps<"div">) {
  return <div className="mdc-card__content" {...props} />
}

function CardFooter(props: ComponentProps<"div">) {
  return <div className="mdc-card__actions" {...props} />
}

function CardAction(props: ComponentProps<"button">) {
  return <button className="mdc-button mdc-card__action mdc-card__action--button" {...props} />
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction }
