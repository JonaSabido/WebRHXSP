
export interface SidebarModuleItem {
    title: string
    visible: boolean
    subitems: SidebarModuleSubitem[]
}

export interface SidebarModuleSubitem {
    icon: string
    title: string
    path: string
    isActive: boolean
}

