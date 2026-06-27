import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CalendarCheck, LayoutGrid, ListTodo, NotepadText, Users } from 'lucide-react';
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
                  url: '/admin/departments',
                  icon: FaPeopleLine,
              },
              {
                  title: 'Staffs List',
                  url: '/admin/list-staffs',
                  icon: Users,
              },
              {
                  title: 'Leave Requests',
                  url: '/admin/leave-requests',
                  icon: ListTodo,
              },
          ]
        : [
              {
                  title: 'Dashboard',
                  url: '/staffs/dashboard',
                  icon: LayoutGrid,
              },
              {
                  title: 'Attendance',
                  url: '/staffs/attendance',
                  icon: CalendarCheck,
              },
              {
                  title: 'Leave',
                  url: '/staffs/leave',
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
