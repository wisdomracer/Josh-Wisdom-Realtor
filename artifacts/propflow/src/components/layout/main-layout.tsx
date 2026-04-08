import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Show } from "@clerk/react";
import { Redirect } from "wouter";

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function MainLayout({ children, requireAuth = true }: MainLayoutProps) {
  const content = (
    <div className="flex min-h-screen bg-background w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );

  if (requireAuth) {
    return (
      <>
        <Show when="signed-in">{content}</Show>
        <Show when="signed-out">
          <Redirect to="/" />
        </Show>
      </>
    );
  }

  return content;
}
