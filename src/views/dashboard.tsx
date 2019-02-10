import * as React from 'react';

import { Layout, Button, Icon, Row, Col, Card, List } from 'antd';
import { UserHeader } from '../components/header';
import { Meal } from '../components/meal';

export class Dashboard extends React.Component {
  render () {
    let data = [];
    for(let i = 0; i < 5; i++) {
      data.push( {
        id: `${i}+t`,
        item: {
          title: 'A Quick Saturday Night Meal.',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          image: 'https://picsum.photos/800/1200?image=835',
          time: '12:40 AM',
          nutrition: {
            calories: 867
          }
        }
      })
    }

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
                      dataSource={data}
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
