'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface Observation {
  id: string; zone_id: string; latitude: number; longitude: number;
  area_label: string; waste_type: string; risk_level: string; risk_score: number;
  site_type: string; management_status: string; burning_observed: string;
  date_captured: string;
}

interface ObservationMapProps {
  observations: Observation[];
  selectedId?: string;
  onSelect?: (obs: Observation) => void;
}

const riskColors: Record<string, string> = {
  HIGH: '#b91c1c',
  MEDIUM: '#d97706',
  LOW: '#16a34a',
};

export default function ObservationMap({ observations, selectedId, onSelect }: ObservationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.CircleMarker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 11,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();

    observations.forEach(obs => {
      const color = riskColors[obs.risk_level] || '#6b7280';
      const marker = L.circleMarker([obs.latitude, obs.longitude], {
        radius: 7,
        fillColor: color,
        color: '#fff',
        weight: 2,
        fillOpacity: 0.9,
      });

      const popupContent = `
        <div style="font-family:Inter,sans-serif;min-width:220px">
          <div style="background:${color};color:white;padding:8px 12px;margin:-12px -12px 10px;border-radius:6px 6px 0 0">
            <span style="font-size:10px;opacity:0.85;font-family:monospace">${obs.id}</span>
            <div style="font-weight:600;font-size:13px;margin-top:2px">${obs.risk_level} RISK</div>
          </div>
          <div style="padding:0 2px">
            <p style="font-weight:600;font-size:12px;margin:0 0 6px;color:#0f1f17">${obs.area_label || obs.zone_id}</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11px">
              <div><span style="color:#6b7280">Zone</span><br><b style="color:#0f1f17">${obs.zone_id}</b></div>
              <div><span style="color:#6b7280">Waste</span><br><b style="color:#0f1f17">${obs.waste_type}</b></div>
              <div><span style="color:#6b7280">Site</span><br><b style="color:#0f1f17">${(obs.site_type||'').split(',')[0]}</b></div>
              <div><span style="color:#6b7280">Management</span><br><b style="color:#0f1f17">${(obs.management_status||'').replace(/_/g,' ')}</b></div>
            </div>
            <div style="margin-top:8px;padding:4px 6px;background:#f9fafb;border-radius:4px;font-size:10px;color:#6b7280">
              ${obs.latitude.toFixed(5)}°N, ${obs.longitude.toFixed(5)}°E
            </div>
            ${obs.burning_observed === 'YES' ? '<div style="margin-top:6px;padding:3px 8px;background:#fee2e2;color:#991b1b;border-radius:4px;font-size:10px;font-weight:600">🔥 Burning Observed</div>' : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 260 });
      marker.on('click', () => { if (onSelect) onSelect(obs); });
      marker.addTo(map);
      markersRef.current.set(obs.id, marker);
    });
  }, [observations, onSelect]);

  // Highlight selected
  useEffect(() => {
    markersRef.current.forEach((m, id) => {
      if (id === selectedId) {
        m.setStyle({ radius: 11, weight: 3, color: '#1a3a2e' });
        m.openPopup();
      } else {
        m.setStyle({ radius: 7, weight: 2, color: '#fff' });
      }
    });

    // Pan to selected
    if (selectedId) {
      const obs = Array.from(markersRef.current.entries()).find(([id]) => id === selectedId);
      if (obs) {
        const ll = obs[1].getLatLng();
        mapRef.current?.panTo(ll, { animate: true, duration: 0.5 });
      }
    }
  }, [selectedId]);

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: 400 }} />
  );
}
