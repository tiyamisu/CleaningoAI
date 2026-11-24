import { ComingSoon } from '@/components/ui/ComingSoon';
export default function SensorsPage() {
  return (
    <ComingSoon
      title="Sensor & IoT Monitoring"
      domain="Engineering & Operations"
      description="Environmental sensor network management, real-time telemetry ingestion, threshold alerts, and IoT device orchestration for continuous environmental monitoring."
      backHref="/operations"
      backLabel="Back to Operations Command"
      plannedFeatures={[
        'Sensor registry with location, type, and status tracking',
        'Real-time telemetry dashboard (PM, temperature, humidity, gas)',
        'Threshold alert and notification system',
        'Sensor health monitoring and predictive maintenance',
        'MQTT / HTTP telemetry ingestion pipeline',
        'Historical trend analysis and anomaly detection',
      ]}
    />
  );
}
