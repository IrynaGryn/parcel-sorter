// Recipient.ts - Model for recipient, contains name and address

import type { Address } from './Address'

export interface Recipient {
  name: string;
  address: Address;
}
