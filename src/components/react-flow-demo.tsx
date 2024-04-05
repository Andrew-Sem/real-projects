"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import CustomNode from "@/lib/react-flow/custom-node";

import "reactflow/dist/style.css";

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: { name: "Tyler Weary", job: "Designer", emoji: "🤓" },
    position: { x: 300, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: { name: "Kristi Price", job: "Developer", emoji: "🤩" },
    position: { x: 600, y: 50 },
  },
];

const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
];
export const ReactFlowDemo = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-full">
      <h1 className="pb-10 text-3xl font-semibold">Календарь</h1>
      <div className="h-[600px] w-full rounded-xl bg-muted overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/50"
        >
          <MiniMap />
          <Controls />
          <Background variant={BackgroundVariant.Dots} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};
