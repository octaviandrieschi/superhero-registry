import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Interface defining the shape of a Superhero object
 */
interface Superhero {
  id: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

// API endpoint URL for backend communication
const API_URL = "http://localhost:3001";

/**
 * Helper function to determine the color of the humility score display
 * @param score - The humility score to evaluate
 * @returns A color code based on the score value
 */
const getHumilityScoreColor = (score: number): string => {
  if (score >= 8) return "#27ae60"; // Green for high humility
  if (score >= 5) return "#f39c12"; // Orange for medium humility
  return "#e74c3c"; // Red for low humility
};

/**
 * Main application component
 * Manages state and renders the superhero form and list
 */
function App() {
  // State management for superhero list and form inputs
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState("");
  const [error, setError] = useState("");

  // Fetch superheroes on component mount
  useEffect(() => {
    fetchSuperheroes();
  }, []);

  /**
   * Fetches the list of superheroes from the backend
   */
  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(`${API_URL}/superheroes`);
      setSuperheroes(response.data);
    } catch (err) {
      setError("Failed to fetch superheroes");
    }
  };

  /**
   * Handles the form submission to create a new superhero
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/superheroes`, {
        name,
        superpower,
        humilityScore: parseInt(humilityScore),
      });
      // Reset form and refresh superhero list on success
      setName("");
      setSuperpower("");
      setHumilityScore("");
      setError("");
      fetchSuperheroes();
    } catch (err) {
      setError("Failed to create superhero");
    }
  };

  /**
   * Renders an input field with consistent styling
   */
  const renderInput = (
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string = "text",
    min?: string,
    max?: string
  ) => (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#34495e",
          fontWeight: "bold",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        min={min}
        max={max}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "2px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          color: "#2c3e50",
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "2.5em",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Superhero Registry
      </h1>

      {/* Superhero Creation Form */}
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <form onSubmit={handleSubmit}>
          {renderInput("Name", name, (e) => setName(e.target.value))}
          {renderInput("Superpower", superpower, (e) =>
            setSuperpower(e.target.value)
          )}
          {renderInput(
            "Humility Score (1-10)",
            humilityScore,
            (e) => setHumilityScore(e.target.value),
            "number",
            "1",
            "10"
          )}
          <button
            type="submit"
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2980b9")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3498db")
            }
            onFocus={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
            onBlur={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
          >
            Add Superhero
          </button>
        </form>
      </div>

      {/* Error Message Display */}
      {error && (
        <div
          style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Superhero List Display */}
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2c3e50",
            marginBottom: "20px",
            fontSize: "1.8em",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
          }}
        >
          Superheroes (Sorted by Humility)
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "2px solid #ddd",
                    color: "#2c3e50",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "2px solid #ddd",
                    color: "#2c3e50",
                  }}
                >
                  Superpower
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "2px solid #ddd",
                    color: "#2c3e50",
                  }}
                >
                  Humility Score
                </th>
              </tr>
            </thead>
            <tbody>
              {superheroes.map((hero) => (
                <tr
                  key={hero.id}
                  style={{
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {hero.name}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {hero.superpower}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                      color: getHumilityScoreColor(hero.humilityScore),
                      fontWeight: "bold",
                    }}
                  >
                    {hero.humilityScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
