import { ComingSoon } from '@/components/ui/ComingSoon';
export default function ChallengesPage() {
  return (
    <ComingSoon
      title="Environmental Challenges"
      domain="Public Website"
      description="A comprehensive overview of the global and urban environmental crises that CleaningoAI is designed to address — from solid waste mismanagement to chemical contamination, water degradation, and beyond."
      backHref="/"
      backLabel="Back to Overview"
      plannedFeatures={[
        'Global waste generation trends and projections',
        'Urban waste accumulation and health impacts',
        'Drainage and waterway contamination pathways',
        'Air quality and burning waste health risks',
        'Ecosystem degradation from unmanaged waste',
        'Policy gaps and intervention opportunity analysis',
      ]}
    />
  );
}
