import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Dashboard } from './dashboard';
import { WrappedNewMealForm } from '../components/newMeal';

const { Header, Content, Footer } = Layout;

export class Root extends React.Component {
    render () {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">Dashboard</Menu.Item>
                            <Menu.Item key="2">Create New </Menu.Item>
                            <Menu.Item key="3">About Us</Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        <WrappedNewMealForm />
                        {/* <Dashboard /> */}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Nutlogger (Nutritioniary) © 2019 Created by Yong Lin Wang, Daniel Wu, Andrew Pratheepan, Anthony Lai
                    </Footer>
                </Layout>
            </div>
        )
    }
}