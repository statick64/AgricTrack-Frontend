import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Beef,
  Stethoscope,
  Package,
  FileText,
  GraduationCap,
  LogOut,
  Leaf,
  X } from
'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const menuItems = [
  {
    path: '/dashboard',
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard'
  },
  {
    path: '/livestock',
    icon: <Beef size={20} />,
    label: 'Livestock'
  },
  {
    path: '/health',
    icon: <Stethoscope size={20} />,
    label: 'Health & Vax'
  },
  {
    path: '/inventory',
    icon: <Package size={20} />,
    label: 'Inventory'
  },
  {
    path: '/reports',
    icon: <FileText size={20} />,
    label: 'Reports'
  },
  {
    path: '/training',
    icon: <GraduationCap size={20} />,
    label: 'Training'
  }];

  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose} />

      }

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>

        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-primary font-bold text-xl">

              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              AgriTrack
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-gray-600">

              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {menuItems.map((item) =>
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onClose()} // Close on mobile when clicked
              className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
                  ${isActive(item.path) ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'}
                `}>

                {item.icon}
                {item.label}
              </Link>
            )}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                TM
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  Thabo Mokobi
                </p>
                <p className="text-xs text-text-secondary truncate">
                  Farm Owner
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">

              <LogOut size={18} />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>
    </>);

}