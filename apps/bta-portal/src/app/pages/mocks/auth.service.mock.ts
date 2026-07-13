import { of } from 'rxjs';
import { SecurityAnswersRequest } from '../../core/services/auth.service';
export const MOCK_SECURITY_ANSWERS = ['chennai', 'mary', 'anna university'];
export const mockSubmitSecurityAnswers = (_payload: SecurityAnswersRequest) => {
  return of({ success: true, message: 'Mocked: Password reset successful' });
};