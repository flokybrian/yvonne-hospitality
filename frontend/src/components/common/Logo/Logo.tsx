/**
 * YvonneLogo – brand mark used in Navbar, Footer and CV.
 *
 * Props:
 *  - variant: "dark" (default – gold on light bg) | "light" (white on dark bg)
 *  - size: controls height in px (width scales proportionally). Default 48.
 */

interface LogoProps {
    variant?: "dark" | "light";
    size?: number;
}

export default function YvonneLogo({ variant = "dark", size = 48 }: LogoProps) {
    const primary    = "#B68A52";
    const subColor   = variant === "light" ? "rgba(255,255,255,0.7)" : "#888888";
    const h = size;
    const w = Math.round(h * 2.6);          // aspect ratio ≈ 2.6 : 1

    return (
        <svg
            width={w}
            height={h}
            viewBox="0 0 130 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Yvonne Hospitality & Management logo"
            role="img"
        >
            {/* ── Decorative leaf / Y mark ── */}
            <g transform="translate(0,4)">
                {/* Stem */}
                <line x1="10" y1="12" x2="10" y2="32"
                      stroke={primary} strokeWidth="2.2" strokeLinecap="round"/>
                {/* Left branch */}
                <path d="M10 20 Q4 14 2 7"
                      stroke={primary} strokeWidth="2.2" fill="none"
                      strokeLinecap="round"/>
                {/* Right branch */}
                <path d="M10 20 Q16 14 18 7"
                      stroke={primary} strokeWidth="2.2" fill="none"
                      strokeLinecap="round"/>
                {/* Small accent dot */}
                <circle cx="10" cy="34" r="2" fill={primary}/>
            </g>

            {/* ── Wordmark ── */}
            {/* "Yvonne" – italic serif */}
            <text
                x="26"
                y="30"
                fontFamily="'Playfair Display', Georgia, serif"
                fontStyle="italic"
                fontWeight="700"
                fontSize="22"
                fill={primary}
                letterSpacing="0.5"
            >
                Yvonne
            </text>

            {/* "HOSPITALITY & MANAGEMENT" – small caps below */}
            <text
                x="27"
                y="42"
                fontFamily="'Inter', Arial, sans-serif"
                fontWeight="600"
                fontSize="6.2"
                fill={subColor}
                letterSpacing="1.4"
                textDecoration="none"
            >
                HOSPITALITY &amp; MANAGEMENT
            </text>

            {/* Thin gold rule under the name */}
            <line x1="26" y1="33" x2="122" y2="33"
                  stroke={primary} strokeWidth="0.8" opacity="0.4"/>
        </svg>
    );
}
