
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  LogOut, 
  Settings, 
  User, 
  Home, 
  Users, 
  PlusCircle, 
  Brain, 
  AlertTriangle,
  BarChart3
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', icon: <Home className="h-4 w-4 mr-2" />, path: '/dashboard' },
    { label: 'Patients', icon: <Users className="h-4 w-4 mr-2" />, path: '/dashboard' },
    { label: 'Add Patient', icon: <PlusCircle className="h-4 w-4 mr-2" />, path: '/add-patient' },
    { label: 'Mental Health', icon: <Brain className="h-4 w-4 mr-2" />, path: '/mental-health-screening' },
    { label: 'ADR Results', icon: <AlertTriangle className="h-4 w-4 mr-2" />, path: '/adr-results' },
    { label: 'Daily Summary', icon: <BarChart3 className="h-4 w-4 mr-2" />, path: '/daily-summary' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indian-saffron to-indian-red flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indian-blue via-indian-purple to-indian-red bg-clip-text text-transparent">ChikitsakAI</span>
          </Link>
        </div>
        
        {user ? (
          <div className="flex items-center">
            <nav className="hidden md:flex mr-8">
              <ul className="flex space-x-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(item.path)}
                      className="flex items-center hover:bg-indian-blue/5 hover:text-indian-blue"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-indian-saffron/5 hover:text-indian-saffron"
                onClick={() => navigate('/notifications')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indian-red"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-indian-blue/5">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indian-blue to-indian-purple text-white">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-indian-blue/5 hover:text-indian-blue">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-indian-blue/5 hover:text-indian-blue">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-indian-red/5 hover:text-indian-red">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="default" onClick={() => navigate('/')} className="bg-gradient-to-r from-indian-saffron to-indian-red hover:from-indian-saffron/90 hover:to-indian-red/90">
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
