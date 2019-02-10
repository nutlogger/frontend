import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Dashboard } from './dashboard';
import { UserHeader } from '../components/header';
import { WrappedNewMealForm } from '../components/newMeal';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const { Header, Content, Footer } = Layout;


export class Root extends React.Component {
    render () {
        return (
            <Router>
                <Layout className="layout">
                    <Header>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/meal">Create New</Link></Menu.Item>
                            <Menu.Item key="3">About Us</Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        <UserHeader calorie_count={2000} calorie_target={4000} />
                        {/* <Dashboard /> */}
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/meal" component={WrappedNewMealForm} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Nutlogger (Nutritioniary) © 2019 Created by Yong Lin Wang, Daniel Wu, Andrew Pratheepan, Anthony Lai
                    </Footer>
                </Layout>
            </Router>
        )
    }
}