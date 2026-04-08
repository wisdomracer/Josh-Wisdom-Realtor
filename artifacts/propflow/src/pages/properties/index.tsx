import { useState } from "react";
import { useListProperties } from "@workspace/api-client-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { Building2, MapPin, Search, Bed, Bath, Square, SlidersHorizontal, Grid, List } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export default function Properties() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const queryParams: any = { limit: 50 };
  if (type !== "all") queryParams.type = type;
  if (status !== "all") queryParams.status = status;
  if (debouncedSearch) {
    // Basic search simulation - real app would use a proper search endpoint
    queryParams.city = debouncedSearch;
  }

  const { data, isLoading } = useListProperties(queryParams);

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
      <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Property Search</h1>
            <p className="text-muted-foreground mt-1">Find distressed property opportunities</p>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border border-border">
            <Button variant="ghost" size="sm" className={view === "grid" ? "bg-background shadow-sm" : ""} onClick={() => setView("grid")}>
              <Grid className="w-4 h-4 mr-2" /> Grid
            </Button>
            <Button variant="ghost" size="sm" className={view === "list" ? "bg-background shadow-sm" : ""} onClick={() => setView("list")}>
              <List className="w-4 h-4 mr-2" /> List
            </Button>
          </div>
        </div>

        <Card className="mb-6 shadow-sm border-border">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by city..." 
                  className="pl-9 bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="foreclosure">Foreclosure</SelectItem>
                    <SelectItem value="tax_delinquent">Tax Delinquent</SelectItem>
                    <SelectItem value="code_violation">Code Violation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2 shrink-0 border-border">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="overflow-hidden"><div className="h-48 bg-muted/50"></div><CardContent className="p-6 h-32 bg-background"></CardContent></Card>
            ))}
          </div>
        ) : !data?.properties?.length ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-xl border border-dashed border-border shadow-sm">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No properties found</h3>
            <p className="text-muted-foreground max-w-md">We couldn't find any properties matching your current filters. Try adjusting your search criteria.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setSearch(""); setType("all"); setStatus("all"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.properties.map((property) => (
                <Card key={property.id} className="group overflow-hidden border-border hover:border-primary/30 transition-all hover:shadow-md flex flex-col bg-card">
                  <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden flex-shrink-0">
                    {property.imageUrl ? (
                      <img src={property.imageUrl} alt={property.address} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Building2 className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className={`${getStatusColor(property.type)} shadow-sm font-semibold border bg-white/90 backdrop-blur-sm`}>
                        {getStatusLabel(property.type)}
                      </Badge>
                    </div>
                    {property.status !== "active" && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="shadow-sm font-semibold capitalize bg-white/90 backdrop-blur-sm text-foreground">
                          {property.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{property.address}</h3>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span className="truncate">{property.city}, {property.state} {property.zip}</span>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                      <div className="font-bold text-lg text-foreground">
                        ${property.estimatedValue?.toLocaleString() || property.price?.toLocaleString() || "N/A"}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                        {property.beds != null && <span className="flex items-center"><Bed className="w-3.5 h-3.5 mr-1" />{property.beds}</span>}
                        {property.baths != null && <span className="flex items-center"><Bath className="w-3.5 h-3.5 mr-1" />{property.baths}</span>}
                        {property.sqft != null && <span className="flex items-center"><Square className="w-3.5 h-3.5 mr-1" />{property.sqft}</span>}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 border-t border-border bg-muted/20">
                    <Link href={`/properties/${property.id}`} className="w-full">
                      <Button variant="ghost" className="w-full rounded-none h-12 hover:bg-primary hover:text-primary-foreground font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Location</th>
                      <th className="px-6 py-4 font-medium">Specs</th>
                      <th className="px-6 py-4 font-medium text-right">Value</th>
                      <th className="px-6 py-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.properties.map((property) => (
                      <tr key={property.id} className="bg-card border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-foreground">
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
                        <td className="px-6 py-4 text-muted-foreground">
                          {property.beds}bd {property.baths}ba {property.sqft}sqft
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          ${property.estimatedValue?.toLocaleString() || property.price?.toLocaleString() || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/properties/${property.id}`}>
                            <Button variant="secondary" size="sm">Details</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )
        )}
      </div>
    </MainLayout>
  );
}
