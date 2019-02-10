import * as React from 'react';

import { Button, Icon, Row, Col, Card, List } from 'antd';
import { UserHeader } from '../components/header';
import { Meal } from '../components/meal';
import Axios from 'axios';

const BACKEND_URL='https://f9e15757.ngrok.io';

type dashboardState = {
  meals: any
}

export class Dashboard extends React.Component<any, dashboardState> {
  state: dashboardState = {
    meals: []
  }

  componentDidMount() {
    Axios.get(`${BACKEND_URL}/meals`).then((res) => {
      console.log(res.data);
    })
  }

  render () {
    return (
          <div>
            <UserHeader calorie_count={2000} calorie_target={4000} />
            <div style={{ padding: '30px 50px' }}>
              <div className="mb-30">
                <Button type="primary" shape="round" size="default"><Icon type="calendar" /> Feb. 9th (Today)</Button>
              </div>
              <Row gutter={16}>
                <Col span={16}>
                  <Card title="Meals From Today" bordered>
                    <List
                      itemLayout="vertical"
                      size="large"
                      dataSource={null}
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 3,
                      }}
                      renderItem={
                        (item: any) => (
                          <Meal key={item.id} item={item.item}/>
                        )
                      }
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Discussion" bordered>
                    Discussion
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
    )
  }
}
