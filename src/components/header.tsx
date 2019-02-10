import * as React from 'react'
import { Row, Col, Avatar, Button, Icon } from 'antd';
import { HeaderBadge } from './headerbadge';

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
}

export class UserHeader extends React.Component<userHeaderProps, userHeaderState> {
  state: userHeaderState = {
    profile_pic: 'https://randomuser.me/api/portraits/women/17.jpg',
    username: 'Shwan Patel',
    email: 'shwan.patel@nutlogger.com'
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
            <HeaderBadge target={2500} current={1000} title="Calories" unit="cals" />
          </Col>
          <Col span={14}>
            <p>Your Goal Towards KETO Diet</p>
            <div className="v-center space-around">
              <HeaderBadge target={44} current={32} title="Fat" unit="g" />
              <HeaderBadge target={30} current={12} title="Sodium" unit="mg" />
              <HeaderBadge target={50} current={42} title="Carbohydrate" unit="g" />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
