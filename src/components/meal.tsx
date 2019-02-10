import * as React from 'react';
import { List, Icon } from 'antd';

export type mealProps = {
  key: string;
  date: Date;
  item: {
    content: string;
    image?: string;
    nutrition?: {
      calories: number;
    }
  }
}

export type mealState = {

}

export class Meal extends React.Component<mealProps> {

  dateBuilder (date: Date) {
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

  render () {
    return (
      <List.Item
        key={this.props.key}
        actions={[<Icon type="star-o" />, <Icon type="edit-o" />, <Icon type="ellipsis" />]}
      >
        <List.Item.Meta
          title={<a href="http://todo.ca">{this.dateBuilder(this.props.date)}</a>}
          description={`${this.props.date.getHours()}:${this.props.date.getMinutes()} ${this.props.item.nutrition ? `| There was ${this.props.item.nutrition.calories} calories in this meal.` : ''}`}
        />
        {this.props.item.content}
      </List.Item>
    )
  }
}