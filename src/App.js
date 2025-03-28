import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import WorkflowCreator from "./WorkflowCreator"; // Import the WorkflowCreator component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-workflow" element={<WorkflowCreator />} />{" "}
        {/* Route for creating new workflow */}
        <Route path="/edit-workflow/:id" element={<WorkflowCreator />} />{" "}
        {/* Route for editing existing workflow */}
        <Route path="/" element={<LoginForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
