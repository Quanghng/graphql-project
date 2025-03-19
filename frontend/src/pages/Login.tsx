function Login() {
    return (
      <>
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </>
    );
  }
  
  export default Login;
  