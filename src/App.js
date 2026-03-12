import { useState, useEffect } from "react";
import { toast } from "crisp-toast";
import "crisp-toast/style.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [duration, setDuration] = useState(5000);
  const [showProgress, setShowProgress] = useState(true);
  const [variant, setVariant] = useState("flat");
  const [color, setColor] = useState("primary");
  const [placement, setPlacement] = useState("bottom-right");
  const [radius, setRadius] = useState("lg");
  const [hideIcon, setHideIcon] = useState(false);

  // Custom Content Controls
  const [title, setTitle] = useState("Toast Notification");
  const [description, setDescription] = useState(
    "This is a highly customizable message.",
  );
  const [actionLabel, setActionLabel] = useState("");
  const [endContentPreset, setEndContentPreset] = useState("none");

  // Helper to render JSX to an element
  const renderJSX = (jsx) => {
    return (container) => {
      import("react-dom/client").then(({ createRoot }) => {
        createRoot(container).render(jsx);
      });
    };
  };

  const getEndContent = () => {
    switch (endContentPreset) {
      case "upgrade":
        return renderJSX(
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Upgrading...");
            }}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "7px 14px",
              fontSize: "11px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 15px rgba(37,99,235,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(37,99,235,0.3)";
            }}
          >
            UPGRADE ⚡
          </button>,
        );

      case "undo":
        return renderJSX(
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Undoing...");
            }}
            style={{
              background: "rgba(128,128,128,0.1)",
              color: "inherit",
              border: "1px solid rgba(128,128,128,0.2)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(128,128,128,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(128,128,128,0.1)")
            }
          >
            UNDO
          </button>,
        );

      case "emoji":
        return "✨";

      default:
        return undefined;
    }
  };

  useEffect(() => {
    document.documentElement.className =
      theme === "dark" ? "ct-theme-dark dark" : "ct-theme-light";
  }, [theme]);

  const currentConfig = {
    duration,
    progressBar: showProgress,
    variant,
    color,
    placement,
    radius,
    title,
    description,
    endContent: getEndContent(),
    action: actionLabel
      ? { label: actionLabel, onClick: () => alert("Action!") }
      : undefined,
    icon: hideIcon ? false : undefined,
  };

  return (
    <div className={`playground-container ${theme}`}>
      <header className="header">
        <h1>Toast</h1>
        <p style={{ opacity: 0.6, marginTop: "0.5rem", fontSize: "1.1rem" }}>
          Premium notification experience for web apps
        </p>
      </header>

      <div className="controls-card" style={{ maxWidth: "1000px" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            alignItems: "center",
            marginBottom: "1.5rem",
            borderBottom: "1px solid rgba(128,128,128,0.1)",
            paddingBottom: "1rem",
          }}
        >
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div
            style={{
              fontWeight: 700,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Ultimate Toast Builder
          </div>
        </div>

        {/* Global Settings */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            width: "100%",
            marginBottom: "1.5rem",
          }}
        >
          <div className="control-group">
            <span>Variant</span>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              <option value="solid">Solid (Saturated)</option>
              <option value="bordered">Bordered (Soft + Border)</option>
              <option value="flat">Flat (Soft + Glow)</option>
            </select>
          </div>

          <div className="control-group">
            <span>Color</span>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="default">Default</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
            </select>
          </div>

          <div className="control-group">
            <span>Radius</span>
            <select value={radius} onChange={(e) => setRadius(e.target.value)}>
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="full">Full</option>
            </select>
          </div>

          <div className="control-group">
            <span>Placement</span>
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>

          <div className="control-group">
            <span>Duration (ms)</span>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={{ width: 80 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              minWidth: "160px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={showProgress}
                onChange={(e) => setShowProgress(e.target.checked)}
              />
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                PROGRESS BAR
              </span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={hideIcon}
                onChange={(e) => setHideIcon(e.target.checked)}
              />
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                HIDE ICON
              </span>
            </label>
          </div>
        </div>

        {/* Content Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            width: "100%",
            padding: "1.5rem",
            background: "rgba(128,128,128,0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(128,128,128,0.1)",
          }}
        >
          <div className="control-group" style={{ flex: 1, minWidth: "200px" }}>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Toast Title"
            />
          </div>

          <div className="control-group" style={{ flex: 2, minWidth: "300px" }}>
            <span>Description</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed message..."
            />
          </div>

          <div className="control-group" style={{ width: "150px" }}>
            <span>Manual Action</span>
            <input
              type="text"
              value={actionLabel}
              onChange={(e) => setActionLabel(e.target.value)}
              placeholder="Undo?"
              title="Adds a standard toast action button"
            />
          </div>

          <div className="control-group" style={{ flex: 1, minWidth: "250px" }}>
            <span>End Content Buttons</span>

            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
            >
              {["none", "upgrade", "undo", "emoji"].map((p) => (
                <button
                  key={p}
                  onClick={() => setEndContentPreset(p)}
                  className={`btn-trigger ${endContentPreset === p ? "active" : ""}`}
                  style={{
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.7rem",
                    flex: 1,
                    textTransform: "uppercase",
                    background:
                      endContentPreset === p
                        ? "#2563eb"
                        : "rgba(128,128,128,0.1)",
                    color: endContentPreset === p ? "white" : "inherit",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}
        >
          <button
            className="btn-trigger"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              padding: "1.25rem 3rem",
              fontSize: "1.1rem",
              boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
            }}
            onClick={() => toast(currentConfig)}
          >
            Spawn Live Toast 🚀
          </button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "2rem 0 -1rem",
          opacity: 0.5,
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}
      >
        Quick Presets & Feature Demos
      </div>

      <div className="demo-grid">
        <button
          className="btn-trigger"
          onClick={() =>
            toast({ ...currentConfig, title: "Simple Announcement" })
          }
        >
          Current Config
        </button>

        <button
          className="btn-trigger primary"
          onClick={() =>
            toast({
              ...currentConfig,
              title: "With Description",
              description:
                "This toast includes some extra details about the event.",
            })
          }
        >
          Description Demo
        </button>

        <button
          className="btn-trigger success"
          onClick={() =>
            toast.success({
              ...currentConfig,
              title: "Changes Saved",
              endContent: '<span style="font-size: 1.25rem;">✨</span>',
            })
          }
        >
          EndContent Demo
        </button>

        <button
          className="btn-trigger warning"
          onClick={() =>
            toast.warning({
              ...currentConfig,
              title: "Custom Icon",
              icon: "🚀",
            })
          }
        >
          Custom Icon
        </button>

        <button
          className="btn-trigger secondary"
          onClick={() =>
            toast({
              ...currentConfig,
              title: "Custom Styles",
              customStyle: {
                borderLeft: "4px solid #f06",
                boxShadow: "0 0 20px rgba(255, 0, 102, 0.2)",
              },
            })
          }
        >
          Styling Demo
        </button>

        <button
          className="btn-trigger danger"
          onClick={() =>
            toast.error({
              ...currentConfig,
              title: "Hidden Icon Demo",
              icon: false,
              description: "The icon is hidden via props.",
            })
          }
        >
          Hidden Icon
        </button>

        <button
          className="btn-trigger"
          style={{ background: "linear-gradient(45deg, #f06, #4a90e2)" }}
          onClick={() => {
            Array.from({ length: 3 }).forEach((_, i) => {
              setTimeout(() => {
                toast({
                  ...currentConfig,
                  color: ["primary", "success", "danger"][i],
                  variant: ["flat", "solid", "bordered"][i],
                  title: `Waterfall ${i + 1}`,
                  description: "Testing radius and variant combinations.",
                });
              }, i * 200);
            });
          }}
        >
          Feature Mix
        </button>
      </div>

      <footer
        style={{
          marginTop: "auto",
          opacity: 0.3,
          fontSize: "0.875rem",
          padding: "2rem",
        }}
      >
        Built with Crisp Toast Library
      </footer>
    </div>
  );
}

export default App;
