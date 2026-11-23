import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(parseUtcDate(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  }).format(parseUtcDate(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  }).format(parseUtcDate(date));
}

function parseUtcDate(date: string | Date): Date {
  if (date instanceof Date) return date;
  const normalized = date.includes('T') ? date : date.replace(' ', 'T');
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized);
  return new Date(hasTimezone ? normalized : `${normalized}Z`);
}

export function getRiskColor(level: string): string {
  switch (level?.toUpperCase()) {
    case 'HIGH': return 'text-red-600 bg-red-50';
    case 'MEDIUM': return 'text-amber-600 bg-amber-50';
    case 'LOW': return 'text-emerald-600 bg-emerald-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getRiskBadgeColor(level: string): string {
  switch (level?.toUpperCase()) {
    case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
    case 'MEDIUM': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'LOW': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity?.toLowerCase()) {
    case 'high': return '#b91c1c';
    case 'medium': return '#d97706';
    case 'low': return '#16a34a';
    default: return '#6b7280';
  }
}

export function getWasteTypeLabel(type: string): string {
  const map: Record<string, string> = {
    'MIXED': 'Mixed Waste',
    'PLASTIC': 'Plastic-Dominant',
    'CONSTRUCTION': 'Construction Debris',
    'ORGANIC': 'Organic Waste',
    'ELECTRONIC': 'Electronic Waste',
  };
  return map[type?.toUpperCase()] || type;
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}
