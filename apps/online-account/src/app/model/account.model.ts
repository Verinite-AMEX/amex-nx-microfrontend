export interface Account {
  id: number;
  userId: string;
  userStatus: string;
  email: string;
  mobileNo: string;
  powerCardId: string;
  accountStatus: string;
  registrationDate: string;
  lastLogin: string;
  siteSeal: string;
  secretQuestion1: string;
  secretAnswer1: string;
  secretQuestion2: string;
  secretAnswer2: string;
  secretQuestion3: string;
  secretAnswer3: string;
}

export interface AccessGroupModel {
  accessGroupId: string;
  cardNumber: string;
  userId: string;
  modifiedBy: string;
  userDetails: UserDetails;
  secretQuestions: SecretQuestion[];
}

export interface UserDetails {
  userStatus: string;
  email: string;
  mobileNo: string;
  registrationDate: string;
  lastLogin: string;
}

export interface SecretQuestion {
  question: string;
  answer: string;
}
