import { JwtPayload, jwtDecode } from 'jwt-decode';

// Define a custom interface that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
  username: string; // Add any other properties you expect from the token
}

class AuthService {
  getProfile(): CustomJwtPayload | null{
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<CustomJwtPayload>(token) : null; // Decode the token and return the profile or null if no token is present
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decodedToken: { exp: number } = jwtDecode(token); // Decode the token to get the expiration time
    return decodedToken.exp < Date.now() / 1000; // Check if the token is expired
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
  
}

export default new AuthService();
