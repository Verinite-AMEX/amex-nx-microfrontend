// Mirrors: Backend/auth-service/.../dto/AuthDtos.java

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  avatarInitials: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  roles: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}