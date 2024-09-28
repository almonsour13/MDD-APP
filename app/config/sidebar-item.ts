import { Home, Users, Leaf, Image, Settings, FileText } from 'lucide-react';

export const sidebarItems = (role: string) => {
  const baseItems = [
    { href: '/', icon: Home, label: 'Home' },
  ];

  const adminSidebarItems = [
    { href: '/admin', icon: Home, label: 'Dashboard' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/diseases', icon: Leaf, label: 'Diseases' },
    { href: '/admin/scans', icon: Image, label: 'All Scans' },
    { href: '/admin/reports', icon: FileText, label: 'Reports' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return role === 'admin'? adminSidebarItems : baseItems;
};
