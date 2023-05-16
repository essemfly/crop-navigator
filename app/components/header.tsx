import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";

function MyHeader() {
  return (
    <Layout.Header className="Header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <h1 style={{ margin: 0, color: "white" }}>Rovers: Crop Navigator</h1>
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
        <Menu.Item key="location">
          {/* By location 탭의 내용 */}
          <Link to="/map/location">by Location</Link>
        </Menu.Item>
        <Menu.Item key="crop">
          {/* By crop 탭의 내용 */}
          <Link to="/map/crop">by Crop</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default MyHeader;
