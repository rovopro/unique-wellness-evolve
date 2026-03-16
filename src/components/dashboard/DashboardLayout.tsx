import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, UsersRound, BarChart3, CreditCard,
  Puzzle, FileText, HeadphonesIcon, Settings, Search, Bell,
  HelpCircle, ChevronDown, ChevronLeft, ChevronRight, LogOut, Home,
  Shield, Eye, UserCog
} from 'lucide-react';
import { useRole, AppRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['Admin', 'Manager', 'Analyst'] },
  { label: 'Users', icon: Users, path: '/dashboard/users', roles: ['Admin', 'Manager', 'Analyst'] },
  { label: 'Teams', icon: UsersRound, path: '/dashboard/teams', roles: ['Admin', 'Manager', 'Analyst'] },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', roles: ['Admin', 'Manager', 'Analyst'] },
  { label: 'Billing', icon: CreditCard, path: '/dashboard/billing', roles: ['Admin'] },
  { label: 'Integrations', icon: Puzzle, path: '/dashboard/integrations', roles: ['Admin'] },
  { label: 'Reports', icon: FileText, path: '/dashboard/reports', roles: ['Admin', 'Analyst'] },
  { label: 'Support', icon: HeadphonesIcon, path: '/dashboard/support', roles: ['Admin', 'Manager'] },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings', roles: ['Admin'] },
];

const roleIcons: Record<AppRole, typeof Shield> = {
  Admin: Shield,
  Manager: UserCog,
  Analyst: Eye,
};

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { role, setRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const visibleNav = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <div className="h-16 flex items-center gap-2 px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Home className="text-primary-foreground" size={16} />
            </div>
            {!collapsed && <span className="font-display font-bold text-base text-foreground truncate">UN1Q Business</span>}
          </Link>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {visibleNav.map(item => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn("flex-1 flex flex-col transition-all duration-300", collapsed ? "ml-16" : "ml-60")}>
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search teams, reports..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs gap-1 cursor-default">
              {(() => { const Icon = roleIcons[role]; return <Icon size={12} />; })()}
              {role}
            </Badge>

            <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>

            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <HelpCircle size={18} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  {!collapsed && <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">Portal Admin</span>
                    <span className="text-xs text-muted-foreground">UNIQ Fitness Ltd</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Shield className="mr-2 h-4 w-4" />
                    Switch Role
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {(['Admin', 'Manager', 'Analyst'] as AppRole[]).map(r => (
                      <DropdownMenuItem key={r} onClick={() => setRole(r)} className={role === r ? 'bg-primary/10 text-primary' : ''}>
                        {(() => { const Icon = roleIcons[r]; return <Icon className="mr-2 h-4 w-4" />; })()}
                        {r === 'Admin' ? 'Company Admin' : r}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Back to Site
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
