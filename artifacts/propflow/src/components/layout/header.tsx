import { useUser } from "@clerk/react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user } = useUser();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs or page title could go here */}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="text-sm text-right hidden sm:block">
            <p className="font-medium text-foreground">{user?.fullName || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold border border-primary/20">
            {user?.firstName?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
