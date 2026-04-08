import { MainLayout } from "@/components/layout/main-layout";
import { PropertyForm } from "@/components/properties/property-form";
import { useUpdateProperty, useGetProperty, useGetMyProfile, useDeleteProperty } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getGetPropertyQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export default function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const propertyId = parseInt(id || "0", 10);
  
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: property, isLoading: propertyLoading } = useGetProperty(propertyId, { query: { enabled: !!propertyId } });
  
  const updateMutation = useUpdateProperty();
  const deleteMutation = useDeleteProperty();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  if (profileLoading || propertyLoading) {
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

  if (!property) {
    return <MainLayout><div className="text-center py-20">Property not found.</div></MainLayout>;
  }

  const handleSubmit = (data: any) => {
    // Transform empty strings to nulls
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === "") {
        cleanedData[key] = null;
      }
    });

    updateMutation.mutate(
      { id: propertyId, data: cleanedData },
      {
        onSuccess: (updatedProperty) => {
          toast({ title: "Property updated successfully!" });
          queryClient.setQueryData(getGetPropertyQueryKey(propertyId), updatedProperty);
          setLocation(`/properties/${propertyId}`);
        },
        onError: (error) => {
          toast({ 
            title: "Failed to update property", 
            description: error.error?.error || "Unknown error occurred",
            variant: "destructive" 
          });
        }
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(
      { id: propertyId },
      {
        onSuccess: () => {
          toast({ title: "Property deleted successfully!" });
          setLocation(`/dashboard`);
        },
        onError: (error) => {
          toast({ 
            title: "Failed to delete property", 
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
            <p className="text-muted-foreground mt-1">Update details for {property.address}</p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" /> Delete Property
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the property
                  listing and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, delete property
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <PropertyForm initialData={property} onSubmit={handleSubmit} isSubmitting={updateMutation.isPending} />
      </div>
    </MainLayout>
  );
}
