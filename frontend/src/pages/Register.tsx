function Register() {
    return (
      <>
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </>
    );
  }
  
  export default Register;
  