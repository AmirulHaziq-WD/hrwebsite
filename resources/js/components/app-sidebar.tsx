import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CircleUserRound, LayoutGrid, NotepadText, Users } from 'lucide-react';
import { FaPeopleLine } from 'react-icons/fa6';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage().props as any;

    const isAdmin = auth.user.role === 'admin';

    const mainNavItems: NavItem[] = isAdmin
        ? [
              {
                  title: 'Dashboard',
                  url: '/admin/dashboard',
                  icon: LayoutGrid,
              },
              {
                  title: 'Departments',
                  url: '/departments',
                  icon: FaPeopleLine,
              },
              {
                  title: 'Staffs',
                  url: '/staffs',
                  icon: Users,
              },
          ]
        : [
              {
                  title: 'Dashboard',
                  url: '/staff/dashboard',
                  icon: LayoutGrid,
              },
              {
                  title: 'Profile',
                  url: '/profile',
                  icon: CircleUserRound,
              },
              {
                  title: 'Leave',
                  url: '/leave',
                  icon: NotepadText,
              },
          ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/admin/dashboard' : '/staff/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
