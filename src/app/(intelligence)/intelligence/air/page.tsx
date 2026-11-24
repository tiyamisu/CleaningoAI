import { ComingSoon } from '@/components/ui/ComingSoon';
export default function AirSoilPage() {
  return (
    <ComingSoon
      title="Air, Soil & Ecosystem Intelligence"
      domain="Environmental Intelligence"
      description="Air quality indices, soil contamination analysis, vegetation health monitoring, and integrated ecosystem health indicators across urban and peri-urban environments."
      backHref="/intelligence"
      backLabel="Back to Environmental Observatory"
      plannedFeatures={[
        'PM2.5 / PM10 / NO₂ / CO₂ air quality tracking',
        'Soil heavy metal contamination mapping',
        'Vegetation health from satellite NDVI indices',
        'Urban heat island mapping',
        'Waste burning air quality impact correlation',
        'Ecosystem services valuation framework',
      ]}
    />
  );
}
