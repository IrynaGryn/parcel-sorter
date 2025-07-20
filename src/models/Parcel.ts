import type { Recipient } from './Recipient'

export interface Parcel {
  recipient: Recipient;
  weight: number;
  value: number;
  department?: string; 
  requiresInsurance?: boolean; // Indicates if insurance is required
}
