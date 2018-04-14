export interface SellTicketsCutoff {
    hours: number;
}

export interface Normal {
    display_name: string;
    wifi: boolean;
    toilet: boolean;
    ac: boolean;
    refreshment: boolean;
    food: boolean;
    hot_meal: boolean;
    power_outlets: boolean;
    tv: boolean;
    bus_attendant: boolean;
    leg_room: boolean;
    small_seat: boolean;
    average_seat: boolean;
    xl_seat: boolean;
    full_recline_seat: boolean;
}

export interface Economy {
    display_name: string;
    wifi: boolean;
    toilet: boolean;
    ac: boolean;
    refreshment: boolean;
    food: boolean;
    hot_meal: boolean;
    power_outlets: boolean;
    tv: boolean;
    bus_attendant: boolean;
    leg_room: boolean;
    small_seat: boolean;
    average_seat: boolean;
    xl_seat: boolean;
    full_recline_seat: boolean;
}

export interface Classes {
    Normal: Normal;
    Economy: Economy;
}

export interface Amenities {
    classes: Classes;
}

export interface Operators {
    id: string;
    source_id: number;
    profile_id: number;
    name: string;
    url?: any;
    logo_url: string;
    display_name: string;
    review_state: string;
    sellable: boolean;
    fuzzy_prices: boolean;
    sell_tickets_cutoff: SellTicketsCutoff;
    amenities: Amenities;
    source: string;
    referral_deal: boolean;
    display_url?: any;
    fraud_check: string;
}
