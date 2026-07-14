export interface CenCustomer {
  clientId:    string;
  name:        string;
  cardNumber:  string;
  currency:    string;
}

export interface CenExcApplicationRequest {
  clientId:      string;
  termsAccepted: boolean;
}

export interface CenExcApplicationResult {
  success:       boolean;
  applicationNo: string;
  message:       string;
}
