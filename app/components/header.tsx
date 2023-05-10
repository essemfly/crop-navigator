import { Layout } from "antd";

function MyHeader() {
  return (
    <Layout.Header className="Header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "white" }}>Rovers</h1>
      </div>
    </Layout.Header>
  );
}

export default MyHeader;
