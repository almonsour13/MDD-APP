import { Home, Users, Leaf, Image, Settings, FileText, User } from 'lucide-react';

export const sidebarItems = (role: string) => {
  const baseItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const adminSidebarItems = [
    { href: '/admin', icon: Home, label: 'Dashboard' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/diseases', icon: Leaf, label: 'Diseases' },
    { href: '/admin/images', icon: Image, label: 'All Scans' },
    { href: '/admin/logs', icon: FileText, label: 'Activity Logs' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return role === 'admin'? adminSidebarItems : baseItems;
};
