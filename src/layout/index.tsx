import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Sider } = Layout;

import { navConfig, sidebarConfig } from "../constants/config";

import "./index.less";

type configT = {
  text: string;
  link: string;
}[];

const generateNav = (config: configT, preLink?: string) => {
  const menuItems = config.map((itm: { text: string; link: string }) => {
    const { text, link } = itm;
    let key = link;
    if (preLink) {
      key = `${preLink}${key}`;
    }
    return <Menu.Item key={key}>{text}</Menu.Item>;
  });

  return menuItems;
};

const LayoutRoot = (props: any) => {
  const [menuItems, setMenuItems] = useState([]);
  const [siderMenu, setSiderMenu] = useState([]);
  const [navSelectedKeys, setNavSelectedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const inintialSidebar = (navKey: string, pathname: string) => {
    const sidebarData = sidebarConfig[navKey];
    const sidebars = generateNav(sidebarData, navKey);
    setSiderMenu(sidebars);
    setSelectedKeys([pathname]);
  };

  useEffect(() => {
    const navs = generateNav(navConfig);
    setMenuItems(navs);

    const { pathname } = props.location;
    const pathnameArr = pathname.split("/");
    if (pathnameArr.length > 1) {
      const [start, key] = pathnameArr;
      const navKey = `/${key}`;
      setNavSelectedKeys([navKey]);
      if (pathnameArr.length === 3) {
        inintialSidebar(navKey, pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (props.location.pathname === "/") {
      setSiderMenu([]);
      setSelectedKeys([]);
    }
  }, [props.location.pathname]);

  const handleNavClick = (itemData: {
    item: any;
    key: string;
    keyPath: string[];
  }) => {
    const { key } = itemData;

    const sidebarData = sidebarConfig[key];
    let pathname = key;

    if (sidebarData) {
      pathname = `${pathname}${sidebarData[0].link}`;
      inintialSidebar(key, pathname);
    } else {
      setSiderMenu([]);
      setSelectedKeys([]);
    }
    setNavSelectedKeys([key]);
    props.history.push(pathname);
  };
  const handleSidebarClick = (itemData: {
    item: any;
    key: string;
    keyPath: string[];
  }) => {
    const { key, keyPath } = itemData;
    setSelectedKeys(keyPath);
    props.history.push(key);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img src="/src/image/logo.png" alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={handleNavClick}
          selectedKeys={navSelectedKeys}
        >
          {menuItems}
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={selectedKeys.length === 0 ? 0 : 200}
          style={{
            overflow: "auto",
            height: "calc(100vh - 64px)",
            backgroundColor: "#24272F",
          }}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleSidebarClick}
          >
            {siderMenu}
          </Menu>
        </Sider>
        <Layout
          style={{ padding: "0 24px 24px", height: "calc(100vh - 64px)" }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default withRouter(LayoutRoot);
