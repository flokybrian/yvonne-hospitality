import { Helmet } from "react-helmet-async";

export default function Videos() {
    return (
        <>
            <Helmet>
                <title>Videos | Yvonne Hospitality & Management</title>
            </Helmet>
            
            <div style={{ padding: "120px 0 80px", textAlign: "center" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
                    <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Videos Page</h1>
                    <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "40px" }}>
                        This page is under construction. Check back soon!
                    </p>
                    <a 
                        href="/" 
                        style={{
                            display: "inline-block",
                            padding: "14px 32px",
                            background: "#B68A52",
                            color: "white",
                            borderRadius: "999px",
                            fontWeight: "700",
                            textDecoration: "none",
                            transition: "transform 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </>
    );
}
