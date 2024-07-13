import { IconType } from "@ng-icons/core";

export interface SidebarItem {
  link: string;
  title: string;
  inactiveIconName: IconType;
  activeIconName: IconType;
  authRequired?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    link: '/',
    title: 'Home',
    inactiveIconName: 'heroHome',
    activeIconName: 'heroHomeSolid'
  },
]