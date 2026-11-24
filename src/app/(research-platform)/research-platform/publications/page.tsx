import { ComingSoon } from '@/components/ui/ComingSoon';
export default function PublicationCentrePage() {
  return (
    <ComingSoon
      title="Research Publication Centre"
      domain="Research Platform"
      description="Manage, review, and publish research findings from CleaningoAI field studies, AI experiments, and environmental intelligence analyses."
      backHref="/research-platform"
      backLabel="Back to Research Explorer"
      plannedFeatures={[
        'Research paper drafting and version management',
        'Internal peer review workflow',
        'Data availability statement and DOI management',
        'Preprint submission integration (arXiv, ESSOAr)',
        'Journal submission tracking',
        'Open data publication and citation tracking',
      ]}
    />
  );
}
