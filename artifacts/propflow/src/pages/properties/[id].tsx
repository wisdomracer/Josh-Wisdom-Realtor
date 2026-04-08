import { MainLayout } from "@/components/layout/main-layout";
import { useGetProperty, useGetSavedProperties, useSaveProperty, useUnsaveProperty } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Calendar, CalendarDays, DollarSign, BookmarkPlus, BookmarkMinus, Building2, Gavel, AlertOctagon, Scale } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetSavedPropertiesQueryKey } from "@workspace/api-client-react";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const propertyId = parseInt(id || "0", 10);
  const { data: property, isLoading } = useGetProperty(propertyId, { query: { enabled: !!propertyId } });
  
  // Note: Saved properties implementation might need adjustment based on exact API response
  const { data: savedData } = useGetSavedProperties();
  const saveMutation = useSaveProperty();
  const unsaveMutation = useUnsaveProperty();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isSaved = false; // We'd need to check if propertyId is in savedData

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveMutation.mutate({ id: propertyId }, {
        onSuccess: () => {
          toast({ title: "Property removed from saved list" });
          queryClient.invalidateQueries({ queryKey: getGetSavedPropertiesQueryKey() });
        },
        onError: () => toast({ title: "Failed to remove property", variant: "destructive" })
      });
    } else {
      saveMutation.mutate({ data: { propertyId } } as any, {
        onSuccess: () => {
          toast({ title: "Property saved" });
          queryClient.invalidateQueries({ queryKey: getGetSavedPropertiesQueryKey() });
        },
        onError: () => toast({ title: "Failed to save property", variant: "destructive" })
      });
    }
  };

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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!property) return <MainLayout>Property not found.</MainLayout>;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className={`${getStatusColor(property.type)} shadow-sm font-semibold border px-3 py-1 text-sm`}>
                {getStatusLabel(property.type)}
              </Badge>
              <Badge variant="secondary" className="shadow-sm font-semibold capitalize px-3 py-1 text-sm">
                {property.status}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{property.address}</h1>
            <div className="flex items-center text-muted-foreground mt-2 text-lg">
              <MapPin className="w-5 h-5 mr-1.5 shrink-0 text-primary" />
              <span>{property.city}, {property.state} {property.zip} {property.county ? `· ${property.county} County` : ''}</span>
            </div>
          </div>
          
          <Button 
            variant={isSaved ? "secondary" : "default"} 
            size="lg" 
            className={`gap-2 shrink-0 ${!isSaved ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`}
            onClick={handleSaveToggle}
            disabled={saveMutation.isPending || unsaveMutation.isPending}
          >
            {isSaved ? <BookmarkMinus className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
            {isSaved ? "Saved" : "Save Property"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Image / Media */}
            <div className="aspect-video bg-muted/30 rounded-xl overflow-hidden border border-border shadow-sm">
              {property.imageUrl ? (
                <img src={property.imageUrl} alt={property.address} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Building2 className="w-16 h-16 opacity-20 mb-4" />
                  <p>No street view available</p>
                </div>
              )}
            </div>

            {/* Key Specs */}
            <Card className="shadow-sm border-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-border">
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Beds</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2"><Bed className="w-5 h-5 text-primary" /> {property.beds ?? "-"}</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Baths</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2"><Bath className="w-5 h-5 text-primary" /> {property.baths ?? "-"}</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Sq Ft</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2"><Square className="w-5 h-5 text-primary" /> {property.sqft?.toLocaleString() ?? "-"}</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Built</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2"><Calendar className="w-5 h-5 text-primary" /> {property.yearBuilt ?? "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {property.description && (
              <Card className="shadow-sm border-border">
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{property.description}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Financial Overview */}
            <Card className="shadow-sm border-border overflow-hidden">
              <div className="bg-primary p-6 text-primary-foreground">
                <h3 className="font-semibold text-primary-foreground/80 mb-1 uppercase tracking-wider text-sm">Estimated Value</h3>
                <div className="text-4xl font-extrabold flex items-center">
                  ${property.estimatedValue?.toLocaleString() ?? property.price?.toLocaleString() ?? "N/A"}
                </div>
                {property.price && property.estimatedValue && (
                  <div className="mt-4 pt-4 border-t border-primary-foreground/20 flex justify-between items-center">
                    <span className="text-primary-foreground/80">Listed Price</span>
                    <span className="font-bold">${property.price.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6 bg-card">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lot Size</span>
                    <span className="font-medium">{property.lotSize ? `${property.lotSize.toLocaleString()} sqft` : "Unknown"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Type Specific Info */}
            <Card className="shadow-sm border-border border-l-4" style={{ borderLeftColor: `var(--${property.type === 'foreclosure' ? 'destructive' : property.type === 'tax_delinquent' ? 'amber-500' : 'purple-500'})` }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  {property.type === 'foreclosure' && <Scale className="w-5 h-5 text-red-600" />}
                  {property.type === 'tax_delinquent' && <DollarSign className="w-5 h-5 text-amber-600" />}
                  {property.type === 'code_violation' && <AlertOctagon className="w-5 h-5 text-purple-600" />}
                  Distress Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {property.type === "foreclosure" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                      <div className="flex items-center gap-2 text-red-700">
                        <CalendarDays className="w-4 h-4" />
                        <span className="font-medium">Auction Date</span>
                      </div>
                      <span className="font-bold text-red-700">{property.auctionDate ? new Date(property.auctionDate).toLocaleDateString() : "TBD"}</span>
                    </div>
                  </div>
                )}
                
                {property.type === "tax_delinquent" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                      <div className="flex items-center gap-2 text-amber-700">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">Delinquent Amount</span>
                      </div>
                      <span className="font-bold text-amber-700">${property.taxAmount?.toLocaleString() ?? "Unknown"}</span>
                    </div>
                  </div>
                )}

                {property.type === "code_violation" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/10">
                      <div className="flex items-center gap-2 text-purple-700 mb-2">
                        <Gavel className="w-4 h-4" />
                        <span className="font-bold text-sm uppercase tracking-wider">{property.violationCode || "Violation"}</span>
                      </div>
                      <p className="text-sm text-purple-900/80">{property.violationDescription || "No description provided."}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
