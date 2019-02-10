import * as React from 'react';
import { List, Icon } from 'antd';

export type mealProps = {
  key: string;
  item: {
    title: string;
    content: string;
    time: string;
    image?: string;
    nutrition?: {
      calories: number;
    }
  }
}

export type mealState = {

}

export class Meal extends React.Component<mealProps> {
  render () {
    return (
      <List.Item
        key={this.props.key}
        actions={[<Icon type="star-o" />, <Icon type="edit-o" />, <Icon type="ellipsis" />]}
      >
        <List.Item.Meta
          title={<a href="http://todo.ca">{this.props.item.title}</a>}
          description={`${this.props.item.time} ${this.props.item.nutrition ? `| There was ${this.props.item.nutrition.calories} calories in this meal.` : ''}`}
        />
        {this.props.item.content}
      </List.Item>
    )
  }
}