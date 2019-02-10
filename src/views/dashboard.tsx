import * as React from 'react';
import * as _ from 'lodash';

import { Button, Icon, Row, Col, Card, List, Progress, Statistic } from 'antd';
import { Meal } from '../components/meal';
import Axios from 'axios';

const BACKEND_URL='https://f9e15757.ngrok.io';

type dashboardState = {
  meals: any,
  total: any
}

export class Dashboard extends React.Component<any, dashboardState> {
  state: dashboardState = {
    meals: [],
    total: {
      calories: 0,
      fat: 0,
      trans: 0,
      
    }
  }

  componentDidMount() {
    Axios.get(`${BACKEND_URL}/meals`).then((res) => {
      this.setState({
        meals: res.data.log,
        total: res.data.total
      })
    })
  }

  getAllStatistics() {
    let buffer: any = [];
    _.forEach(this.state.total, (val, key) => {
      buffer.push(
      <List.Item key={key}>
        <Statistic title={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
      </List.Item>
      )
    })
    return buffer;
  }

  render () {
    return (
          <div>
            <div style={{ padding: '30px 50px' }}>
              <div className="mb-30">
                <Button type="primary" shape="round" size="default"><Icon type="calendar" /> Feb. 9th (Today)</Button>
              </div>
              <Row gutter={16}>
                <Col span={16}>
                  <Card title="Meals From Today" bordered className="card">
                    <List
                      itemLayout="vertical"
                      size="large"
                      dataSource={this.state.meals}
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 3,
                      }}
                      renderItem={
                        (item: any) => (
                          <Meal key={item._id} item={{content: 'Thoughts are an important part of our body’s wisdom because we have the ability to change our minds (and our thoughts) as we learn to grow. A thought held long enough and repeated enough becomes a belief. ', nutrition: {calories: (item.total ? item.total.calories : 0)}}} date={new Date(item.createdAt)} />
                        )
                      }
                    />
                  </Card>
                  <Card title="Statistics" bordered className="card">
                    <List
                      grid={{ gutter: 16, column: 4}}
                      renderItem={() => {}}
                    >
                      {this.getAllStatistics()}
                    </List>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Daily Calorie Intake" bordered>
                    <Progress percent={Math.round(this.state.total.calories/2500 * 100)} status="active" />
                  </Card>
                  <Card title="Daily Fat Intake" bordered className="mt-15">
                    <div className="nut-process">Saturated<Progress percent={Math.round(this.state.total.fat/64 * 100)} status="active" /></div>
                    <div className="nut-process">Trans-Fat<Progress percent={Math.round(this.state.total.trans/3 * 100)} status="active" /></div>
                  </Card>
                  <Card title="Other Nutrient Intake" bordered className="mt-15">
                    <div className="nut-process">Carbohydrate<Progress percent={Math.round(this.state.total.carbohydrate/290 * 100)} status="active" /></div>
                    <div className="nut-process">Sugar<Progress percent={Math.round(this.state.total.sugar/16 * 100)} status="active" /></div>
                    <div className="nut-process">Cholesterol<Progress percent={Math.round(this.state.total.cholesterol/1 * 100)} status="active" /></div>
                    <div className="nut-process">Fibre<Progress percent={Math.round(this.state.total.fibre/27 * 100)} status="active" /></div>
                    <div className="nut-process">Sodium<Progress percent={Math.round(this.state.total.sodium/2378 * 100)} status="active" /></div>
                    <div className="nut-process">Protein<Progress percent={Math.round(this.state.total.protein/60 * 100)} status="active" /></div>
                  </Card>
                  <Card title="Vitamine Intakes" bordered className="mt-15">
                    <div className="nut-process">Vitamine A<Progress percent={70} status="active" /></div>
                    <div className="nut-process">Vitamine C<Progress percent={20} status="active" /></div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
    )
  }
}
