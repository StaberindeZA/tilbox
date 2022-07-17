import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Card from "../Card";

const serverUrl = "https://tilbox.info/api" || "http://localhost:3001";

async function postTil({ url, summary }: { url: string; summary: string }) {
  const response = await fetch(`${serverUrl}/til`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ url, summary }), // body data type must match "Content-Type" header
  });
  return response.json();
}

function TilAdd() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation(postTil, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tils"]);
    },
  });

  return (
    <Card title="Got a new one?">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate({ url, summary });
          setUrl("");
          setSummary("");
        }}
        className="flex flex-col gap-4"
      >
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Set URL"
          placeholder="Set URL..."
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Set Summary"
          placeholder="Set Summary..."
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </Card>
  );
}

export default TilAdd;
