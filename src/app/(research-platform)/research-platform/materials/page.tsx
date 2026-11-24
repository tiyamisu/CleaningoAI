import { ComingSoon } from '@/components/ui/ComingSoon';
export default function MaterialDiscoveryPage() {
  return (
    <ComingSoon
      title="Material Discovery"
      domain="Research Platform"
      description="Discover, characterise, and evaluate novel materials for environmental remediation, circular economy applications, and sustainable manufacturing."
      backHref="/research-platform"
      backLabel="Back to Research Explorer"
      plannedFeatures={[
        'Material property database and search',
        'Novel adsorbent and remediation material discovery',
        'Biodegradable material characterisation',
        'Material substitution recommendation for hazardous substances',
        'Recycled content certification and tracking',
        'Life cycle assessment of material choices',
      ]}
    />
  );
}
