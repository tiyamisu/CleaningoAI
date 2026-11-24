import { ComingSoon } from '@/components/ui/ComingSoon';
export default function SpaceSustainabilityPage() {
  return (
    <ComingSoon
      title="Space Sustainability"
      domain="Environmental Intelligence"
      description="Orbital debris tracking, satellite-based environmental monitoring, space resource management, and integration of Earth observation data for environmental intelligence."
      backHref="/intelligence"
      backLabel="Back to Environmental Observatory"
      plannedFeatures={[
        'Satellite imagery integration for land use change detection',
        'Remote sensing for urban waste accumulation identification',
        'Orbital debris tracking and mitigation intelligence',
        'SAR and multispectral data processing pipelines',
        'Space-based environmental monitoring programme management',
        'Open Earth observation dataset integration (Sentinel, Landsat)',
      ]}
    />
  );
}
