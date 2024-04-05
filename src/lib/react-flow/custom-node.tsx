import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode({
  data,
}: {
  data: { emoji: string; name: string; job: string };
}) {
  return (
    <div className="rounded-md border-2 bg-background px-4 py-2 shadow-md">
      <div className="flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-muted-foreground">{data.job}</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-16 bg-accent"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-16 bg-accent"
      />
    </div>
  );
}

export default memo(CustomNode);
