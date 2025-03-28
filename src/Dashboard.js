import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css"; // Import CSS for styling
import { auth, signOut } from "./firebase"; // Import Firebase auth for logout (optional for now)
import { FiSearch } from "react-icons/fi"; // Search icon
import { AiOutlinePlus } from "react-icons/ai"; // Plus icon
import { RiPushpinLine, RiPushpinFill } from "react-icons/ri"; // Pin icons
import { BsThreeDotsVertical } from "react-icons/bs"; // Vertical three dots
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon
import { AiOutlineDown } from "react-icons/ai"; // Down arrow icon

const Dashboard = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const workflowsPerPage = 8;
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [pinnedWorkflows, setPinnedWorkflows] = useState({});

  useEffect(() => {
    const mockData = Array.from({ length: 15 }, (_, index) => ({
      id: `#${494 + index}`,
      name: `Workflow Name here... ${index + 1}`,
      lastEditedOn: "Zubin Khanna | 22:43 IST - 28/05",
      description: "Some Description Here Regarding The Flow...",
      status:
        index % 3 === 0 ? "passed" : index % 3 === 1 ? "failed" : "pending",
    }));
    setWorkflows(mockData);
    setTotalPages(Math.ceil(mockData.length / workflowsPerPage));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCreateNewProcess = () => {
    navigate("/create-workflow");
  };

  const handleExecuteWorkflow = (workflowId) => {
    alert(`Execute workflow with ID: ${workflowId}`);
  };

  const handleEditWorkflow = (workflowId) => {
    navigate(`/edit-workflow/${workflowId}`);
  };

  const handleDeleteWorkflow = (workflowId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete workflow with ID: ${workflowId}?`
    );
    if (confirmDelete) {
      console.log(`Deleting workflow with ID: ${workflowId}`);
      setWorkflows(workflows.filter((wf) => wf.id !== workflowId));
      setOpenDropdownId(null);
    }
  };

  const toggleDropdown = (workflowId) => {
    setOpenDropdownId(openDropdownId === workflowId ? null : workflowId);
  };

  const handlePinClick = (workflowId) => {
    setPinnedWorkflows((prevPinned) => ({
      ...prevPinned,
      [workflowId]: !prevPinned[workflowId],
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * workflowsPerPage;
  const endIndex = startIndex + workflowsPerPage;
  const currentWorkflows = filteredWorkflows.slice(startIndex, endIndex);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-top">
        <div className="top-left">
          <GiHamburgerMenu className="hamburger-icon" />
          <h2 className="dashboard-title">Workflow Builder</h2>
        </div>
        <button
          className="create-button black"
          onClick={handleCreateNewProcess}
        >
          <AiOutlinePlus className="plus-icon" /> Create New Process
        </button>
      </div>
      <div className="dashboard-header-bottom">
        <div className="search-bar right-icon">
          <input
            type="text"
            placeholder="Search by Workflow Name / ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FiSearch className="search-icon" />
        </div>
      </div>

      <div className="workflow-list">
        <table className="workflow-table">
          <thead>
            <tr className="header-row">
              <th>Workflow Name</th>
              <th>ID</th>
              <th>Last Edited On</th>
              <th>Description</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWorkflows.map((workflow) => (
              <tr key={workflow.id}>
                <td>{workflow.name}</td>
                <td>{workflow.id}</td>
                <td>{workflow.lastEditedOn}</td>
                <td>{workflow.description}</td>
                <td className="actions-cell">
                  <button
                    className="pin-icon-button"
                    onClick={() => handlePinClick(workflow.id)}
                  >
                    {pinnedWorkflows[workflow.id] ? (
                      <RiPushpinFill className="pin-icon" />
                    ) : (
                      <RiPushpinLine className="pin-icon" />
                    )}
                  </button>
                  <button className="action-button">Execute</button>
                  <button
                    className="action-button"
                    onClick={() => handleEditWorkflow(workflow.id)}
                  >
                    Edit
                  </button>
                  <div className="dropdown-container">
                    <button
                      className="more-options"
                      onClick={() => toggleDropdown(workflow.id)}
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {openDropdownId === workflow.id && (
                      <div className="dropdown">
                        <button
                          className="dropdown-item delete"
                          onClick={() => handleDeleteWorkflow(workflow.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <button className="more-actions-arrow">
                    <AiOutlineDown />
                  </button>
                </td>
              </tr>
            ))}
            {currentWorkflows.length === 0 && (
              <tr>
                <td colSpan="5" className="no-data">
                  No workflows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filteredWorkflows.length > 0 && (
          <div className="pagination-container">
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </button>
                ))}
              {totalPages > 5 && <span>...</span>}
              {totalPages > 5 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={currentPage === totalPages ? "active" : ""}
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
