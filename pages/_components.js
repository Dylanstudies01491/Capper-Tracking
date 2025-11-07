
import Link from 'next/link';
export const Shell = ({ children }) => (
  <>
    <div className="bg-bolts"></div>
    <div className="watermark"></div>
    <div className="container">
      <header className="header">
        <div className="brand"><img src="/logo.png" alt="logo"/><div className="title">CappersTruth</div></div>
        <div className="right">
          <Link className="link" href="/">Dashboard</Link>
          <Link className="link" href="/leaderboards">Leaderboards</Link>
          <Link className="link" href="/cappers">All Cappers</Link>
          <Link className="link" href="/profit-calculator">Profit Calculator</Link>
          <a className="discord" href="https://discord.gg/trustdaslip" target="_blank" rel="noreferrer">Discord</a>
          <Link className="link" href="/admin">Admin</Link>
        </div>
      </header>
      {children}
    </div>
    <small className="footer">Made by <strong>TrustDaslip</strong> · <a href="https://discord.gg/trustdaslip" target="_blank" rel="noreferrer">discord.gg/trustdaslip</a></small>
  </>
);
