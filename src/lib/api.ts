export async function fetchObservations(params?: {
  zone?: string;
  risk?: string;
  waste_type?: string;
  limit?: number;
  offset?: number;
}) {
  const url = new URL('/api/observations', window.location.origin);
  if (params?.zone) url.searchParams.set('zone', params.zone);
  if (params?.risk) url.searchParams.set('risk', params.risk);
  if (params?.waste_type) url.searchParams.set('waste_type', params.waste_type);
  if (params?.limit) url.searchParams.set('limit', String(params.limit));
  if (params?.offset) url.searchParams.set('offset', String(params.offset));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch observations');
  return res.json();
}

export async function fetchIncidents(params?: { status?: string; limit?: number }) {
  const url = new URL('/api/incidents', window.location.origin);
  if (params?.status) url.searchParams.set('status', params.status);
  if (params?.limit) url.searchParams.set('limit', String(params.limit));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch incidents');
  return res.json();
}

export async function createIncident(data: {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  area_label: string;
  waste_type: string;
  severity: string;
  reporter_name: string;
  reporter_email: string;
}) {
  const res = await fetch('/api/incidents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create incident');
  return res.json();
}

export async function updateIncidentStatus(id: string, status: string, notes?: string) {
  const res = await fetch(`/api/incidents/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes }),
  });
  if (!res.ok) throw new Error('Failed to update incident');
  return res.json();
}

export async function fetchAnalytics() {
  const res = await fetch('/api/analytics');
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function runDemoAnalysis(imageFile: File) {
  const formData = new FormData();
  formData.append('image', imageFile);
  const res = await fetch('/api/vision/analyze', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to run analysis');
  return res.json();
}
