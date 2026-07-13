export interface LoungeCard {
  cardNumber: string;
  cardType:   string;          
  variant:    string;                
  enrolled:   boolean;
  entitlements: string[];
  selected?:  boolean;
}

export interface LoungeCustomer {
  clientCode:  string;
  name:        string;
  mobile:      string;
  email:       string;
  cards:       LoungeCard[];
}

export interface PriorityPassEnrollRequest {
  clientCode:   string;
  selectedCards: LoungeCard[];
  termsAccepted: boolean;
}

export interface PriorityPassEnrollResult {
  success:  boolean;
  message:  string;
  referenceId?: string;
}
