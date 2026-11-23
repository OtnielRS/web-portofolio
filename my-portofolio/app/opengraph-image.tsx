import { ImageResponse } from "next/og";

export const alt = "Otniel Rahadiyan Sumantri — Software Developer. Curious by nature.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PortfolioPreview() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#f5f3eb", color: "#182534", display: "flex", position: "relative", padding: "66px 72px", flexDirection: "column", borderTop: "10px solid #c44a26" }}>
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#526574" }}>SOFTWARE DEVELOPER · JAKARTA</div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 54, fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
        <div style={{ display: "flex" }}>Otniel Rahadiyan</div>
        <div style={{ display: "flex" }}>Sumantri<span style={{ color: "#c44a26" }}>.</span></div>
      </div>
      <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#c44a26" }}>Curious by nature.</div>
      <div style={{ display: "flex", marginTop: 18, fontSize: 22, color: "#526574" }}>Web · Mobile · APIs</div>
      <div style={{ display: "flex", position: "absolute", left: 72, right: 72, bottom: 48, borderTop: "1px solid #c8cec8", paddingTop: 24, fontSize: 21, color: "#526574" }}>portofolio.alicemorgan.my.id</div>
      <svg width="450" height="450" viewBox="0 0 450 450" style={{ position: "absolute", right: -20, top: 62 }}>
        <ellipse cx="225" cy="225" rx="210" ry="100" transform="rotate(-32 225 225)" fill="none" stroke="#bac5c4" strokeWidth="2" />
        <ellipse cx="225" cy="225" rx="166" ry="77" transform="rotate(-32 225 225)" fill="none" stroke="#bac5c4" strokeWidth="2" />
        <ellipse cx="225" cy="225" rx="120" ry="55" transform="rotate(-32 225 225)" fill="none" stroke="#bac5c4" strokeWidth="2" />
        <circle cx="225" cy="225" r="75" fill="#182534" />
        <circle cx="225" cy="225" r="69" fill="#367caa" />
        <path d="M174 184 199 164 223 164 237 183 218 199 214 222 190 231 181 214 163 209Z" fill="#8bb078" />
        <path d="m208 231 24 3 15 18-9 24-18 16-8-17 2-22-16-13Z" fill="#8bb078" />
        <path d="m250 169 25 17 13 26-17 7-16-12-2-17-14-10Z" fill="#8bb078" />
        <path d="m267 249 22 4 1 18-24 6-12-13Z" fill="#8bb078" />
        <circle cx="75" cy="303" r="24" fill="#c44a26" />
        <circle cx="354" cy="110" r="14" fill="#c49557" />
        <circle cx="353" cy="285" r="9" fill="#75a7ac" />
        <circle cx="145" cy="77" r="4" fill="#c49557" />
      </svg>
    </div>,
    size,
  );
}
