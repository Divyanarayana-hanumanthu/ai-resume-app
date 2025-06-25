import React, { useState } from "react";

export default function ResumeForm() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile || !jobTitle || !company) {
      alert("Please fill all fields and upload your resume.");
      return;
    }

    setLoading(true);
    setResult(null);

    // Create form data to send to backend
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobTitle", jobTitle);
    formData.append("company", company);

    try {
      // Replace with your backend API URL
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data); // Assume data contains generated resume & cover letter
    } catch (error) {
      alert("Error generating documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>AI-Powered Resume & Cover Letter Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Upload Resume (PDF or DOCX):<br />
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Job Title:<br />
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Software Engineer"
              required
            />
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Company:<br />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 20, padding: "10px 20px" }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Generated Resume & Cover Letter:</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#f0f0f0",
              padding: 15,
              borderRadius: 5,
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
