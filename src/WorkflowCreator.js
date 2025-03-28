import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

const CustomNode = ({ data }) => (
  <div
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "white",
    }}
  >
    {data.label}
    <button
      style={{
        float: "right",
        background: "none",
        border: "none",
        color: "red",
        cursor: "pointer",
      }}
    >
      🗑️
    </button>
  </div>
);

const nodeTypes = {
  start: ({ data }) => (
    <div
      style={{
        backgroundColor: "#d1fae5",
        color: "#10b981",
        border: "2px solid #10b981",
        padding: "10px",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {data.label}
    </div>
  ),
  end: ({ data }) => (
    <div
      style={{
        backgroundColor: "#fde2e2",
        color: "#ef4444",
        border: "2px solid #ef4444",
        padding: "10px",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {data.label}
    </div>
  ),
  apiCall: CustomNode,
  email: CustomNode,
  textBox: CustomNode,
};

const WorkflowCreator = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "start",
      type: "start",
      position: { x: 250, y: 50 },
      data: { label: "Start" },
      draggable: false,
    },
    {
      id: "end",
      type: "end",
      position: { x: 250, y: 350 },
      data: { label: "End" },
      draggable: false,
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "start-end",
      source: "start",
      target: "end",
      animated: true,
      style: { stroke: "#ccc", strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", orient: "auto", color: "#ccc" },
    },
  ]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomChange = (event) =>
    setZoomLevel(parseFloat(event.target.value));
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleAddNodeClick = (edgeId, x, y) => {
    setOpenMenu(edgeId);
    setMenuPosition({ x, y });
  };

  const handleMenuItemClick = (type) => {
    if (!openMenu) return;

    const [sourceNodeId, targetNodeId] = openMenu.split("-");
    const newId = `node-${Date.now()}-${type}`;
    const newNode = {
      id: newId,
      type: type,
      position: { x: menuPosition.x - 50, y: menuPosition.y - 25 },
      data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) =>
      eds
        .map((edge) => {
          if (edge.id === openMenu) {
            return null;
          }
          return edge;
        })
        .filter(Boolean)
    );
    setEdges((eds) => [
      ...eds,
      {
        id: `${sourceNodeId}-${newId}`,
        source: sourceNodeId,
        target: newId,
        animated: true,
        style: { stroke: "#ccc", strokeWidth: 2 },
        markerEnd: { type: "arrowclosed", orient: "auto", color: "#ccc" },
      },
      {
        id: `${newId}-${targetNodeId}`,
        source: newId,
        target: targetNodeId,
        animated: true,
        style: { stroke: "#ccc", strokeWidth: 2 },
        markerEnd: { type: "arrowclosed", orient: "auto", color: "#ccc" },
      },
    ]);

    setOpenMenu(null);
  };

  const handleCanvasClick = () => {
    setOpenMenu(null);
  };

  const getEdgeMidpoint = (edgeId) => {
    const edge = edges.find((e) => e.id === edgeId);
    if (!edge) return { x: 0, y: 0 };
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);
    if (!sourceNode || !targetNode) return { x: 0, y: 0 };

    const sx =
      sourceNode.position.x +
      (sourceNode.__rf?.width ? sourceNode.__rf.width / 2 : 40);
    const sy =
      sourceNode.position.y +
      (sourceNode.__rf?.height ? sourceNode.__rf.height / 2 : 40);
    const tx =
      targetNode.position.x +
      (targetNode.__rf?.width ? targetNode.__rf.width / 2 : 40);
    const ty =
      targetNode.position.y +
      (targetNode.__rf?.height ? targetNode.__rf.height / 2 : 40);

    return { x: (sx + tx) / 2, y: (sy + ty) / 2 };
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw", position: "relative" }}
      onClick={handleCanvasClick}
    >
      {/* Top Navigation */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => {
            /* Handle go back */
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Go Back
        </button>
        <span>Untitled</span>
        <button
          style={{
            backgroundColor: "#ffe0b2",
            border: "1px solid #ffb300",
            padding: "5px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          💾
        </button>
      </div>

      <ReactFlowProvider>
        <div
          style={{
            height: "100%",
            width: "100%",
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            style={{ backgroundColor: "#f9f9f9" }}
          >
            {edges.map((edge) => {
              const midpoint = getEdgeMidpoint(edge.id);
              return (
                <div
                  key={`add-node-${edge.id}`}
                  style={{
                    position: "absolute",
                    transform: `translate(-50%, -50%) translate(${midpoint.x}px,${midpoint.y}px)`,
                    zIndex: 5,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddNodeClick(edge.id, midpoint.x, midpoint.y);
                    }}
                  >
                    <circle cx="12" cy="12" r="10" fill="white" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
              );
            })}
            <Background
              variant={BackgroundVariant.Dots}
              gap={12}
              size={1}
              color="#d2d2d2"
            />
          </ReactFlow>
        </div>

        {openMenu && (
          <div
            style={{
              position: "absolute",
              top: menuPosition.y,
              left: menuPosition.x,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => handleMenuItemClick("apiCall")}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              API Call
            </button>
            <button
              onClick={() => handleMenuItemClick("email")}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Email
            </button>
            <button
              onClick={() => handleMenuItemClick("textBox")}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Text Box
            </button>
          </div>
        )}

        {/* Bottom Right Zoom Controls */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "white",
            padding: "5px 15px",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.1))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2em",
            }}
          >
            -
          </button>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={zoomLevel}
            onChange={handleZoomChange}
            style={{ width: "100px" }}
          />
          <button
            onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.1))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2em",
            }}
          >
            +
          </button>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowCreator;
