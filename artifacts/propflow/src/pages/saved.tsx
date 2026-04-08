import { MainLayout } from "@/components/layout/main-layout";
import { useGetSavedProperties } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, MapPin, Bed, Bath, Square, BookmarkX } from "lucide-react";

export default function SavedProperties() {
  const { data: savedProperties, isLoading } = useGetSavedProperties();

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Saved Properties</h1>
          <p className="text-muted-foreground mt-1">Your bookmarked leads and opportunities</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <Card key={i} className="overflow-hidden"><div className="h-48 bg-muted/50"></div><CardContent className="p-6 h-32 bg-background"></CardContent></Card>
            ))}
          </div>
        ) : !savedProperties?.length ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-xl border border-dashed border-border shadow-sm">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <BookmarkX className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No saved properties</h3>
            <p className="text-muted-foreground max-w-md">You haven't bookmarked any properties yet. Browse the listings to find deals.</p>
            <Link href="/properties">
              <Button className="mt-6 bg-primary text-primary-foreground font-semibold">
                Browse Properties
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((saved) => {
              const property = saved.property;
              return (
                <Card key={saved.id} className="group overflow-hidden border-border hover:border-primary/30 transition-all hover:shadow-md flex flex-col bg-card">
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
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
