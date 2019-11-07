import { Amenities } from './amenities';
import { SellTicketsCutoff } from './sell-tickets-cutoff';
import { Terms } from './terms';

export interface Operator {
    id: string;
    source_id: number;
    profile_id: number;
    name: string;
    url?: any;
    logo_url: string;
    display_name: string;
    sellable: boolean;
    fuzzy_prices: boolean;
    sell_tickets_cutoff: SellTicketsCutoff;
    amenities: Amenities;
    source: string;
    referral_deal: boolean;
    display_url?: any;
    fraud_check: string;
    terms: Terms;
}
