class AuthService {
  constructor(domain) {
    this.domain = domain || "http://localhost:3001"
  }

  loggedIn() {
    const token = this.getToken()
    return !!token
  }

  getToken() {
    return localStorage.getItem("token")
  }

  authenticated() {
    if (!this.getToken()) {
      return false
    } else {
      return true
    }
  }

  checkAuthentication(params) {
    if (!this.authenticated()) {
      const { history } = params;
      history.replace({
        pathname: "/login"
      })
    }
  }
}

export const authService = new AuthService();
