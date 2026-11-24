import { ComingSoon } from '@/components/ui/ComingSoon';
export default function EquipmentPage() {
  return (
    <ComingSoon
      title="Equipment & Prototype Management"
      domain="Engineering & Operations"
      description="Field equipment registry, prototype tracking, maintenance scheduling, and performance monitoring for environmental monitoring and remediation tools."
      backHref="/operations"
      backLabel="Back to Operations Command"
      plannedFeatures={[
        'Equipment registry with specifications and location',
        'Prototype development tracking and versioning',
        'Maintenance schedule management',
        'Deployment history and site assignment',
        'Equipment calibration records',
        'Failure reporting and root cause analysis',
      ]}
    />
  );
}
