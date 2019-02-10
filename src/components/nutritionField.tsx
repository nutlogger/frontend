import * as React from 'react';
import { Form, InputNumber } from 'antd'

type nutritionProps = {
    id: string;
    label: string;
    getFieldDecorator: (id: any, options: any) => any;
    required: boolean
    value?: number;
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
            <InputNumber placeholder={props.label} value={props.value} style={{ width: '10em', marginRight: 8 }} disabled />
            </div>
        </div>
        )}
    </Form.Item>;
