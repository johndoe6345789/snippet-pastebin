import { Page } from "@playwright/test"

declare global {
  namespace Playwright {
    interface Page {
      metrics(): Promise<{
        Timestamp: number
        Documents: number
        Frames: number
        JSEventListeners: number
        Nodes: number
        LayoutCount: number
        RecalcStyleCount: number
        JSHeapUsedSize: number
        JSHeapTotalSize: number
        JSHeapSizeLimit: number
        NavigationStart: number
      }>
    }
  }
}

declare module "@playwright/test" {
  interface Page {
    metrics(): Promise<{
      Timestamp: number
      Documents: number
      Frames: number
      JSEventListeners: number
      Nodes: number
      LayoutCount: number
      RecalcStyleCount: number
      JSHeapUsedSize: number
      JSHeapTotalSize: number
      JSHeapSizeLimit: number
      NavigationStart: number
    }>
  }
}
