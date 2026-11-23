export const ZONES = {
  'ZONE_02-KK': 'Kanakapura / Konanakunte',
  'ZONE_03-N_C_G': 'Nagarbhavi / Chandralayout',
  'ZONE_04_HC': 'Hesaraghatta / Chikkabanavara',
  'ZONE_08-FWP': 'Fruit Market / Waste Processing',
  'ZONE_10-TF': 'T.Dasarahalli / Banashankari 6th Stage',
  'ZONE_11_NLG-P': 'Nalaghatta / Peenya',
  'ZONE_12_AG_MAINROAD': 'Arekere / Gottigere Main Road',
  'ZONE_14_KN': 'Kothnur / Nyanappanahalli',
  'ZONE_15_K-M_MR': 'Krishnarajapura / Mahadevapura',
  'ZONE_16_KSF': 'Kengeri / Someshwarapura',
  'ZONE_17_M': 'Majestic Area',
  'ZONE_18_BSKR': 'Banashankari Road',
  'ZONE_19_N-M-V': 'Nagasandra / Mallathahalli / Vijinapura',
  'ZONE_20_KA': 'Kammanahalli / Agara',
};

export const WASTE_TYPES = {
  'MIXED': 'Mixed Waste',
  'PLASTIC': 'Plastic-Dominant Waste',
  'CONSTRUCTION': 'Construction Debris',
};

export const SITE_TYPES = [
  'Roadside', 'River_Bank', 'Open_Unprotected_Land', 'Under_Bridge',
  'Market_Area', 'Electric_Pole', 'Tree_Base', 'Factory_Adjacent',
  'Roadside, Drain', 'PRIVATE_AREA',
];

export const MANAGEMENT_STATUSES = {
  'NOT_MANAGED': 'Not Managed',
  'MANAGED': 'Managed',
  'PARTIALLY_MANAGED': 'Partially Managed',
  'OFFICIAL_COLLECTON_SITE': 'Official Collection Site',
  'NON_GOVERNMENT_PARTIAL_MANAGEMENT': 'NGO Partial Management',
};

export const INCIDENT_STATUSES = {
  'submitted': 'Submitted',
  'under_review': 'Under Review',
  'assigned': 'Assigned',
  'inspected': 'Inspected',
  'resolved': 'Resolved',
};

export const SEVERITY_LABELS = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
  'not_assessable': 'Not Assessable',
};

export const ROLES = {
  'admin': 'Administrator',
  'officer': 'Municipal Officer',
  'inspector': 'Field Inspector',
  'researcher': 'Researcher',
  'citizen': 'Citizen / Reporter',
};

// Bengaluru approximate center
export const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];
export const BENGALURU_BOUNDS = {
  north: 13.14,
  south: 12.78,
  east: 77.78,
  west: 77.42,
};

export const DEMO_DRAINAGE_DISCLAIMER = 
  "⚠️ SYNTHETIC DEMO NETWORK: Drainage connectivity shown is illustrative only. " +
  "No hydraulic connectivity has been verified. Do not use for engineering or regulatory decisions.";
