<h2>Login</h2>
<form class="login-form" method="POST" action="?">
  <div class="row">
    <label for="username">Username</label>
    <input type="text" class="credentials" id="username" name="username" required />
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input type="password" name="password" class="credentials" required />
  </div>
  <button type="submit" class="submit">Login</button>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    border: 1px solid var(--color-1);
    padding: 10px 0;
  }

  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 50%;
  }

  .row label {
    margin-bottom: 5px;
  }

  .credentials {
    padding: 5px;
    border: 1px solid var(--color-1);
    border-radius: 5px;
  }

  /* .submit {
    padding: 5px;
    border: 1px solid var(--color-1);
    border-radius: 5px;
    background-color: var(--color-1);
  } */
</style>
