import { useEffect, useRef, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useListProperties } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Building2, AlertTriangle, ShieldAlert } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

const TYPE_CONFIG = {
  foreclosure: {
    color: "#ef4444",
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-200",
    label: "Foreclosure",
    icon: Building2,
  },
  tax_delinquent: {
    color: "#f59e0b",
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-200",
    label: "Tax Delinquent",
    icon: AlertTriangle,
  },
  code_violation: {
    color: "#8b5cf6",
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-200",
    label: "Code Violation",
    icon: ShieldAlert,
  },
} as const;

type PropertyType = keyof typeof TYPE_CONFIG;

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<PropertyType>>(
    new Set(["foreclosure", "tax_delinquent", "code_violation"])
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data, isLoading } = useListProperties({ limit: 200 });
  const properties = data?.properties ?? [];

  const toggleType = (type: PropertyType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    let map: LeafletMap;
    let mounted = true;

    import("leaflet").then((L) => {
      if (!mounted || !mapRef.current || leafletMapRef.current) return;

      map = L.map(mapRef.current, {
        center: [29.7604, -95.3698],
        zoom: 11,
        zoomControl: true,
      });

      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
    });

    return () => {
      mounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletMapRef.current || properties.length === 0) return;

    import("leaflet").then((L) => {
      const map = leafletMapRef.current;
      if (!map) return;

      // Clear existing markers
      map.eachLayer((layer) => {
        if ((layer as any)._isPropertyMarker) {
          map.removeLayer(layer);
        }
      });

      const filtered = properties.filter(
        (p) =>
          activeTypes.has(p.type as PropertyType) &&
          p.latitude != null &&
          p.longitude != null
      );

      filtered.forEach((prop) => {
        const config = TYPE_CONFIG[prop.type as PropertyType];
        if (!config) return;

        const color = config.color;
        const isSelected = prop.id === selectedId;

        const icon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: ${isSelected ? 20 : 16}px;
              height: ${isSelected ? 20 : 16}px;
              border-radius: 50%;
              background: ${color};
              border: ${isSelected ? "3px solid white" : "2px solid white"};
              box-shadow: 0 2px 6px rgba(0,0,0,0.4);
              cursor: pointer;
              transition: all 0.15s ease;
            "></div>`,
          iconSize: [isSelected ? 20 : 16, isSelected ? 20 : 16],
          iconAnchor: [isSelected ? 10 : 8, isSelected ? 10 : 8],
        });

        const marker = L.marker([prop.latitude!, prop.longitude!], { icon }) as any;
        marker._isPropertyMarker = true;

        const price = prop.estimatedValue ?? prop.price;
        const priceStr = price ? `$${Number(price).toLocaleString()}` : "Price N/A";

        marker.bindPopup(`
          <div style="min-width:220px; font-family: system-ui, sans-serif;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
              <span style="
                display:inline-block;
                background:${color}20;
                color:${color};
                border:1px solid ${color}40;
                border-radius:4px;
                padding:2px 8px;
                font-size:11px;
                font-weight:600;
              ">${config.label}</span>
              <span style="font-size:13px;font-weight:700;color:#111;">${priceStr}</span>
            </div>
            <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#111;">${prop.address}</p>
            <p style="margin:0 0 10px;font-size:12px;color:#666;">${prop.city}, ${prop.state} ${prop.zip}</p>
            <a href="${import.meta.env.BASE_URL}properties/${prop.id}" 
               style="display:inline-block;background:#1e3a5f;color:white;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;text-decoration:none;">
              View Details
            </a>
          </div>
        `);

        marker.on("click", () => setSelectedId(prop.id));
        marker.addTo(map);
      });
    });
  }, [properties, activeTypes, selectedId]);

  const counts = {
    foreclosure: properties.filter((p) => p.type === "foreclosure").length,
    tax_delinquent: properties.filter((p) => p.type === "tax_delinquent").length,
    code_violation: properties.filter((p) => p.type === "code_violation").length,
  };

  return (
    <MainLayout noPadding>
      <div className="flex h-[calc(100vh-4rem)] relative">
        {/* Sidebar controls */}
        <div className="w-72 bg-card border-r border-border flex flex-col z-10 shadow-md overflow-y-auto shrink-0">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-accent" />
              <h1 className="text-lg font-bold">Property Map</h1>
            </div>
            <p className="text-sm text-muted-foreground">Houston, TX metro area</p>
          </div>

          <div className="p-5 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Filter by Type
            </p>
            <div className="space-y-2">
              {(Object.keys(TYPE_CONFIG) as PropertyType[]).map((type) => {
                const config = TYPE_CONFIG[type];
                const Icon = config.icon;
                const active = activeTypes.has(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                      active
                        ? `${config.bg} ${config.border} ${config.text}`
                        : "border-border text-muted-foreground opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: config.color }}
                      />
                      <span className="text-sm font-medium">{config.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {counts[type]}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              All Properties
            </p>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-2">
                {properties
                  .filter((p) => activeTypes.has(p.type as PropertyType))
                  .map((prop) => {
                    const config = TYPE_CONFIG[prop.type as PropertyType];
                    const isSelected = prop.id === selectedId;
                    const price = prop.estimatedValue ?? prop.price;
                    return (
                      <button
                        key={prop.id}
                        onClick={() => {
                          setSelectedId(prop.id);
                          if (
                            leafletMapRef.current &&
                            prop.latitude != null &&
                            prop.longitude != null
                          ) {
                            leafletMapRef.current.setView(
                              [prop.latitude, prop.longitude],
                              14,
                              { animate: true }
                            );
                          }
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all hover:border-primary/40 ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: config?.color }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {config?.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium leading-snug">{prop.address}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {prop.city}, {prop.state}
                          {price ? ` · $${Number(price).toLocaleString()}` : ""}
                        </p>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-muted/30 flex items-center justify-center z-20 pointer-events-none">
              <p className="text-muted-foreground text-sm font-medium">Loading properties...</p>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
    </MainLayout>
  );
}
