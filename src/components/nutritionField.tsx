import * as React from 'react';
import { Form, InputNumber } from 'antd'

type nutritionProps = {
    id: string;
    label: string;
    getFieldDecorator: (id: any, options: any) => any;
    required: boolean
    style?: any
}

export const NutritionField = (props: nutritionProps) => 
    <Form.Item
        label={props.label}
        style={props.style}
        >
        {props.getFieldDecorator(props.id, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{
            required: props.required,
            whitespace: true,
            message: `Please provide the ${props.label} info.`,
        }],
        })(
        <div>
            <div>
            <InputNumber placeholder={props.label} style={{ width: '20em', marginRight: 8 }} />
            </div>
        </div>
        )}
    </Form.Item>;
