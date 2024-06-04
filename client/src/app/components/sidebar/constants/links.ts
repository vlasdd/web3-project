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
  {
    link: '/campaigns',
    title: 'Campaigns',
    inactiveIconName: 'heroSquares2x2',
    activeIconName: 'heroSquares2x2Solid',
  },
  {
    link: '/donates',
    title: 'Donates',
    inactiveIconName: 'heroBars3CenterLeft',
    activeIconName: 'heroBars3CenterLeftSolid',
    authRequired: true,
  },
]