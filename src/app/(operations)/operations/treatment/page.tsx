import { ComingSoon } from '@/components/ui/ComingSoon';
export default function TreatmentPage() {
  return (
    <ComingSoon
      title="Treatment & Remediation"
      domain="Engineering & Operations"
      description="Site remediation project management, treatment pathway design, efficacy monitoring, and progress tracking for contaminated land and water bodies."
      backHref="/operations"
      backLabel="Back to Operations Command"
      plannedFeatures={[
        'Contaminated site register and risk classification',
        'Treatment technology selection and design',
        'Remediation project milestone tracking',
        'Treatment system performance monitoring',
        'Soil and groundwater sampling programme management',
        'Regulatory closure criteria and sign-off workflow',
      ]}
    />
  );
}
