import React from "react";
import { useParams } from "react-router-dom";
import postFullPage from "../component/PostFullPage";

export default function Post(props) {
  return (
    <div className="row" style={{ flexDirection: "column" }}>
      <Page />
    </div>
  );
}

function Page() {
  let { id } = useParams();
  return <postFullPage id={id} />;
}
