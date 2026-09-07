export default function LoginScreen({ onEnter }) {
  function handleSubmit(e) {
    e.preventDefault();
    onEnter();
  }

  return (
    <div id="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="15.5" stroke="#39C2D9" strokeWidth="1.6" />
            <path d="M17 2 L17 32 M2 17 L32 17 M6 6 L28 28 M28 6 L6 28" stroke="#39C2D9" strokeWidth="1" opacity="0.55" />
            <circle cx="17" cy="17" r="4" fill="#39C2D9" />
          </svg>
          <div className="brand-name" style={{ fontSize: 21 }}>
            ICE<b>FLUX</b>
          </div>
        </div>
        <p className="login-tagline">Predict the ice. Navigate smarter.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@organization.gov.in" />
          </div>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input id="pw" type="password" placeholder="••••••••••" />
          </div>
          <div className="row-between">
            <label className="checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <a className="link-muted" href="#" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
        <div className="login-foot">
          <a className="link-muted" href="#" onClick={(e) => e.preventDefault()}>Create account</a>
        </div>
        <div className="divider-text">or</div>
        <button className="btn btn-ghost-dark" onClick={onEnter}>Continue as demo user</button>
      </div>
    </div>
  );
}
