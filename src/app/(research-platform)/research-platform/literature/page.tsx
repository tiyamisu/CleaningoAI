import { ComingSoon } from '@/components/ui/ComingSoon';
export default function LiteraturePage() {
  return (
    <ComingSoon
      title="Scientific Literature & Patent Intelligence"
      domain="Research Platform"
      description="Search, synthesise, and track environmental science literature, patents, and grey literature. Covers waste management, water quality, chemical remediation, and ecosystem restoration domains."
      backHref="/research-platform"
      backLabel="Back to Research Explorer"
      plannedFeatures={[
        'Semantic search across PubMed, Scopus, Web of Science',
        'Patent landscape analysis for environmental technologies',
        'Automated citation network and knowledge graph',
        'Research gap identification and hypothesis generation',
        'Grey literature and report integration',
        'Researcher alert system for new publications',
      ]}
    />
  );
}
