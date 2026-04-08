import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPropertyStats, useGetRecentProperties } from "@workspace/api-client-react";
import { Building2, TrendingUp, AlertTriangle, Scale, Home, Search } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetPropertyStats();
  const { data: recent, isLoading: recentLoading } = useGetRecentProperties();

  const getStatusColor = (type: string) => {
    switch (type) {
      case "foreclosure": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "tax_delinquent": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "code_violation": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getStatusLabel = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your property intelligence</p>
          </div>
          <Link href="/properties">
            <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
              <Search className="w-4 h-4" />
              Start Search
            </Button>
          </Link>
        </div>

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <Card key={i}><CardContent className="h-32 bg-muted/50"></CardContent></Card>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">Total Active</Badge>
                </div>
                <p className="text-3xl font-bold">{stats.total.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1 font-medium text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +{stats.newThisWeek} this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-600">
                    <Scale className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs text-red-600 border-red-200">Foreclosures</Badge>
                </div>
                <p className="text-3xl font-bold">{stats.foreclosures.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">Tax Delinquent</Badge>
                </div>
                <p className="text-3xl font-bold">{stats.taxDelinquent.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-600">
                    <Home className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">Code Violations</Badge>
                </div>
                <p className="text-3xl font-bold">{stats.codeViolations.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recently Added</h2>
            <Link href="/properties">
              <Button variant="link" className="text-primary pr-0">View all</Button>
            </Link>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Property</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium text-right">Value</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoading ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Loading recent properties...</td></tr>
                  ) : recent?.length === 0 ? (
                     <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No recent properties found.</td></tr>
                  ) : (
                    recent?.map((property) => (
                      <tr key={property.id} className="bg-card border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">
                          {property.address}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={getStatusColor(property.type)}>
                            {getStatusLabel(property.type)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {property.city}, {property.state} {property.zip}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          ${property.estimatedValue?.toLocaleString() || property.price?.toLocaleString() || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/properties/${property.id}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
