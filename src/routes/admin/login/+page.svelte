<form class="login-form" method="POST" action="?/submit">
  <div class="row">
    <label for="username">Username</label>
    <input type="text" class="credentials" id="username" name="username" required />
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" class="credentials" required />
  </div>
  <button type="submit" class="submit">Login</button>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    margin: 0.5rem 0;
  }

  .row label {
    margin-bottom: 0.5rem;
  }

  .credentials {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-1);
  }

  .submit {
    width: 20%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    border: 1px solid var(--color-1);
    background-color: var(--color-1);
    cursor: pointer;
  }
</style>
