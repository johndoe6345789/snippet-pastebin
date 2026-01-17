// Re-export all sidebar components from their modular files
export { SidebarProvider, useSidebar } from "./sidebar-context"
export { Sidebar, SidebarTrigger, SidebarRail, SidebarInset } from "./sidebar-core"
export {
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
} from "./sidebar-parts"
export {
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./sidebar-menu"

