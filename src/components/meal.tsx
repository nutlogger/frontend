import * as React from 'react';
import * as _ from 'lodash';
import { List, Icon, Modal, Statistic, Divider } from 'antd';

export type mealProps = {
  key: string;
  date: Date;
  meal_plan: any;
  item: {
    content: string;
    nutrition?: {
      calories: number;
    }
  }
}

export type mealState = {
  modal_visible: boolean;
}

export class Meal extends React.Component<mealProps, mealState> {
  state: mealState = {
    modal_visible: false
  }

  constructor(props: mealProps) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  showModal = () => {
    this.setState({
      modal_visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      modal_visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      modal_visible: false,
    });
  }

  dateBuilder(date: Date) {
    const buffer = new Date(date);
    let day = '';
    let meal = '';
    switch (buffer.getDay()) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
    }
    if (buffer.getHours() <= 6 || buffer.getHours() > 23) {
      meal = 'Late Night Snack'
    } else if (buffer.getHours() > 6 && buffer.getHours() <= 11) {
      meal = 'Morning Breakfast'
    } else if (buffer.getHours() > 11 && buffer.getHours() <= 17) {
      meal = 'Lunch'
    } else if (buffer.getHours() > 17 && buffer.getHours() <= 23) {
      meal = 'Night Dinner'
    } else {
      meal = 'Meal';
    }

    return `A ${day} ${meal}`
  }

  getAllStatistics() {
    let buffer: any = [];
    _.forEach(this.props.meal_plan.total, (val, key) => {
      buffer.push(
      <List.Item key={key}>
        <Statistic title={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
      </List.Item>
      )
    })
    return buffer;
  }

  getAllStatisticsMeal(meal: any) {
    let buffer: any = [];
    _.forEach(meal, (val, key) => {
      buffer.push(
      <List.Item key={key}>
        <Statistic title={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
      </List.Item>
      )
    })
    return buffer;
  }

  render() {
    return (
      <List.Item
        key={this.props.key}
        actions={[<Icon type="star-o" />, <Icon type="edit-o" />, <Icon type="ellipsis" />]}
      >
        <List.Item.Meta
          title={<a onClick={this.showModal}>{this.dateBuilder(this.props.date)}</a>}
          description={`${this.props.date.getHours()}:${this.props.date.getMinutes()} ${this.props.item.nutrition ? `| There was ${this.props.item.nutrition.calories} calories in this meal.` : ''}`}
        />
        {`This meal has a total of ${this.props.meal_plan.meals.length} ingredients.`}
        <Modal
          title={this.dateBuilder(this.props.date)}
          visible={this.state.modal_visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <h3>Meal Nutrition</h3>
            <List
              grid={{ gutter: 16, column: 4}}
              renderItem={() => {}}
            >
              {this.getAllStatistics()}
            </List>
            <Divider />
            <h3>
              Ingredients
            </h3>
            <List
              itemLayout="vertical"
              size="large"
              footer={<div>See more meals by using the page finder</div>}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 1,
              }}
              dataSource={this.props.meal_plan.meals}
              renderItem={(meal: any) => (
              <List.Item
                key={meal.name}
                actions={[<Icon type="star-o"/>, <Icon type="like-o" />, <Icon type="message" />]}
              >
                <List.Item.Meta
                  title={meal.title}
                />
                <List
                  grid={{ gutter: 16, column: 4}}
                  renderItem={() => {}}
                >
                  {this.getAllStatisticsMeal(meal)}
                </List>
              </List.Item>
              )}
            >

            </List>
          </div>
          <div>
          </div>
        </Modal>
      </List.Item>

    )
  }
}