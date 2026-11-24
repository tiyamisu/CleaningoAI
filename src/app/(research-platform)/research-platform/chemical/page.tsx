import { ComingSoon } from '@/components/ui/ComingSoon';
export default function ChemicalResearchPage() {
  return (
    <ComingSoon
      title="Chemical Research"
      domain="Research Platform"
      description="Chemical substance profiling, reaction pathway analysis, toxicological assessment, and environmental fate modelling for research and remediation design."
      backHref="/research-platform"
      backLabel="Back to Research Explorer"
      plannedFeatures={[
        'Chemical substance database with environmental fate data',
        'Degradation pathway prediction and modelling',
        'Ecotoxicological risk assessment tools',
        'Green chemistry alternative discovery',
        'Contamination source apportionment analysis',
        'Regulatory chemical screening (REACH, TSCA)',
      ]}
    />
  );
}
