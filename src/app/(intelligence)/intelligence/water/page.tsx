import { ComingSoon } from '@/components/ui/ComingSoon';
export default function WaterIntelligencePage() {
  return (
    <ComingSoon
      title="Water & Ocean Intelligence"
      domain="Environmental Intelligence"
      description="Hydrological risk mapping, drainage connectivity analysis, water quality monitoring, and marine environmental tracking. The HydroRisk module in the existing app demonstrates early proximity scoring as a foundation."
      backHref="/intelligence"
      backLabel="Back to Environmental Observatory"
      plannedFeatures={[
        'Real drainage network connectivity (PostGIS routing)',
        'Water quality parameter monitoring (pH, turbidity, dissolved oxygen)',
        'Flood risk prediction from upstream waste accumulation',
        'Lake and wetland health indicators',
        'Ocean plastic tracking integration with satellite data',
        'Water body contamination risk matrices',
      ]}
    />
  );
}
