"use client"

import { ComponentProps } from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

function Tabs(props: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className="mdc-tab-bar" activationMode="automatic" {...props} />
}

function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List className="mdc-tab-scroller" {...props}>
      <div className="mdc-tab-scroller__scroll-area">
        <div className="mdc-tab-scroller__scroll-content">{props.children}</div>
      </div>
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ children, className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={["mdc-tab", className].filter(Boolean).join(" ")}
      {...props}
    >
      <span className="mdc-tab__content">
        <span className="mdc-tab__text-label">{children}</span>
      </span>
      <span className="mdc-tab__ripple" />
      <span className="mdc-tab__focus-ring" />
      <span className="mdc-tab-indicator">
        <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
      </span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent(props: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className="mdc-tab-panel" {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
