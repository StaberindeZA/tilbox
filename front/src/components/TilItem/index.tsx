import React from "react";

function deleteItem(id: string) {
  console.log({ id });
}

function TilItem({
  id,
  summary,
  url,
}: {
  id: string;
  summary?: string;
  url?: string;
}) {
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <p>{summary}</p>
        <a href={url}>Read more here...</a>
      </div>
      <button onClick={() => deleteItem(id)}>D</button>
    </div>
  );
}

export default TilItem;
