import { Layout, theme } from 'antd';
import MyHeader from "./components/MyHeader.jsx";
import {Outlet} from "react-router-dom";
import Sider from "antd/es/layout/Sider.js";
import SideBar from "./components/SideBar.jsx";
const { Content } = Layout;
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout">
            <MyHeader/>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <SideBar/>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            padding: '0 50px',
                            marginLeft: '10px',
                            marginTop: '20px',
                        }}
                    >
                        <div
                            className="site-layout-content"
                            style={{
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default App;