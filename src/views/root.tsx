import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Dashboard } from './dashboard';
import { UserHeader } from '../components/header';
import { WrappedNewMealForm } from '../components/newMeal';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from "react-transition-group";

const { Header, Content, Footer } = Layout;


export class Root extends React.Component {
    render() {
        return (
            <Router>
                <Route
                    render={({ location }) => (
                        <Layout className="layout">
                            <Header>
                                <img src="/public/img/NUTLOGGER.png" className="logo" />
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
                                <TransitionGroup>
                                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                                        <Switch location={location}>
                                            <Route exact path="/" component={Dashboard} />
                                            <Route path="/meal" component={WrappedNewMealForm} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Nutlogger (Nutritioniary) © 2019 Created by Yong Lin Wang, Daniel Wu, Andrew Pratheepan, Anthony Lai
                    </Footer>
                        </Layout>
                    )} />
            </Router>
            )
        }
}