import { Show } from "@clerk/react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Building2, Bookmark, User, Settings, LogOut, ShieldAlert, MapPin, Map } from "lucide-react";
import { useClerk } from "@clerk/react";
import { useGetMyProfile } from "@workspace/api-client-react";

export function Sidebar() {
  const [location] = useLocation();
  const { signOut } = useClerk();
  const { data: profile } = useGetMyProfile();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/properties", label: "Property Search", icon: Building2 },
    { href: "/map", label: "Property Map", icon: Map },
    { href: "/saved", label: "Saved Properties", icon: Bookmark },
    { href: "/memberships", label: "Memberships", icon: ShieldAlert },
    { href: "/profile", label: "My Profile", icon: User },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col text-sidebar-foreground">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white cursor-pointer">
          <MapPin className="w-5 h-5 text-accent shrink-0" />
          <span className="text-sm leading-tight">Houston Foreclosure Alerts</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || location.startsWith(`${item.href}/`);
          
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white"}`}>
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}

        {profile?.role === "admin" && (
          <div className="pt-4 mt-4 border-t border-sidebar-border">
            <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">Admin</p>
            <Link href="/admin/properties/new" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location === "/admin/properties/new" ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white"}`}>
              <Settings className="w-5 h-5" />
              Add Property
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
