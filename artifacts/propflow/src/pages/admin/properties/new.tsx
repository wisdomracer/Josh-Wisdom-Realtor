import { MainLayout } from "@/components/layout/main-layout";
import { PropertyForm } from "@/components/properties/property-form";
import { useCreateProperty, useGetMyProfile } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function NewProperty() {
  const { data: profile, isLoading } = useGetMyProfile();
  const createMutation = useCreateProperty();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <MainLayout><div className="animate-pulse h-96 bg-muted/50 rounded-xl" /></MainLayout>;
  }

  if (profile?.role !== "admin") {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You do not have permission to access this page.</p>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = (data: any) => {
    // Transform empty strings to nulls
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === "") {
        cleanedData[key] = null;
      }
    });

    createMutation.mutate(
      { data: cleanedData },
      {
        onSuccess: (property) => {
          toast({ title: "Property created successfully!" });
          setLocation(`/properties/${property.id}`);
        },
        onError: (error) => {
          toast({ 
            title: "Failed to create property", 
            description: error.error?.error || "Unknown error occurred",
            variant: "destructive" 
          });
        }
      }
    );
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
          <p className="text-muted-foreground mt-1">Enter details for a new distressed property lead</p>
        </div>
        
        <PropertyForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
      </div>
    </MainLayout>
  );
}
