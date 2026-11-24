import { ComingSoon } from '@/components/ui/ComingSoon';
export default function SimulationWorkspacePage() {
  return (
    <ComingSoon
      title="Simulation Workspace"
      domain="Research Platform"
      description="Environmental system simulation for drainage network modelling, contaminant transport, waste accumulation dynamics, and ecosystem response to interventions."
      backHref="/research-platform"
      backLabel="Back to Research Explorer"
      plannedFeatures={[
        'Drainage network hydraulic simulation (SWMM integration)',
        'Contaminant transport and dispersion modelling',
        'Waste accumulation hotspot prediction models',
        'Ecosystem dynamic system simulation',
        'Climate scenario impact assessment',
        'Digital twin framework for environmental sites',
      ]}
    />
  );
}
