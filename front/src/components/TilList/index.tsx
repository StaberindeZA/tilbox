import React from "react";
import { useQuery } from "react-query";
import { TilListItem } from "../../App";
import Card from "../Card";
import TilItem from "../TilItem";

const headerTitle = "Here is the latest...";
const serverUrl = "https://tilbox.info/api" || "http://localhost:3001";

async function getTils(): Promise<TilListItem[] | undefined> {
  const response = await fetch(`${serverUrl}/tils`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function TilList() {
  // Queries
  const { isLoading, isError, data, error } = useQuery(["tils"], getTils);

  if (isLoading) {
    return (
      <Card title={headerTitle}>
        <span>Loading...</span>
      </Card>
    );
  }

  if (isError) {
    if (error instanceof Error)
      return (
        <Card title={headerTitle}>
          <span>Error: {error.message}</span>
        </Card>
      );

    return (
      <Card title={headerTitle}>
        <span>Oh no, unknown error ocurred</span>
      </Card>
    );
  }

  return (
    <Card title={headerTitle}>
      <>
        {data?.length && (
          <dl className="">
            {data
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 3)
              .map((d) => {
                return (
                  <dt
                    key={d.id}
                    className="border-b-2 last:border-b-0 border-blue-logo/50"
                  >
                    <TilItem {...d} />
                  </dt>
                );
              })}
          </dl>
        )}
      </>
    </Card>
  );
}

export default TilList;
