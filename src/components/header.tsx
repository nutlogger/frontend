import * as React from 'react'
import { Row, Col, Avatar} from 'antd';
import { HeaderBadge } from './headerbadge';
import Axios from 'axios';

const BACKEND_URL='https://f9e15757.ngrok.io';

export type userHeaderProps = {
  calorie_count: number;
  calorie_target: number;
  custom_title?: string;
  other_goals?: [
    {
      title: string;
      currently: number;
      target: number;
    }
  ]
}

type userHeaderState = {
  profile_pic: string;
  username: string;
  email: string;
  total: any
}

export class UserHeader extends React.Component<userHeaderProps, userHeaderState> {
  state: userHeaderState = {
    profile_pic: 'https://randomuser.me/api/portraits/women/17.jpg',
    username: 'Emma Chen',
    email: 'emma.chen@nutlogger.com',
    total: {
      calories: 0
    }
  }

  componentDidMount() {
    Axios.get(`${BACKEND_URL}/meals`).then((res) => {
      console.log(res.data);
      this.setState({
        total: res.data.total
      })
    })
  }

  render () {
    const { username, email, profile_pic } = this.state;
    return (
      <div className="user-header">
        <Row gutter={48} className="v-center">
          <Col span={6} className="user-info-container">
            <Avatar icon="user" shape="circle" size={120} src={profile_pic} />
            <div>
              <h2 className="no-margin">{username}</h2>
              <p className="text-muted mb-10">{email}</p>
              <a href="https://yonglinwang.ca">Account Details</a>
            </div>
          </Col>
          <Col span={4}>
            <p className="opacity-hidden">Your Calories</p>
            <HeaderBadge target={2500} current={this.state.total.calories} title="Calories" unit="cals" />
          </Col>
          <Col span={14}>
            <p>Your Goals</p>
            <div className="v-center space-around">
              <HeaderBadge target={64} current={this.state.total.fat} title="Fat" unit="g" />
              <HeaderBadge target={2378} current={this.state.total.sodium} title="Sodium" unit="mg" />
              <HeaderBadge target={290} current={this.state.total.carbohydrate} title="Carbohydrate" unit="g" />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
