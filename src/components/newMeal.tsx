import * as React from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import { Button, Form, Input, Icon, InputNumber, Upload, message} from 'antd';
import { UserHeader } from './header';
import { NutritionField } from './nutritionField';

const BACKEND_URL='https://f9e15757.ngrok.io';

type newMealFormState = {
  counter: number;
  meal_id: string;
  has_ingredients: boolean;
  input_tracker?: any
}

class NewMeal extends React.Component<any, newMealFormState> {
  state: newMealFormState = {
    counter: 0,
    meal_id: '',
    has_ingredients: false,
    input_tracker: []
  }

  constructor(props: any) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewIngredientInput = this.handleNewIngredientInput.bind(this);
    this.recieveImageFeedback = this.recieveImageFeedback.bind(this);
    this.makeNutritionDetails = this.makeNutritionDetails.bind(this);
  }

  componentDidMount() {
    axios.post(`${BACKEND_URL}/meals`).then((res) => {
      if (res.data.isSuccess) {
        console.log('created a new meal')
        this.setState({
          meal_id: res.data.id
        });
      } else {
        // TODO DISPLAY ERROR REDIRECT
        console.log('New meal failed')
      }
    });
  }

  handleDelete(k: any) {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k),
    });
  }

  handleAdd() {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    this.setState({
      counter: this.state.counter + 1,
    });

    this.state.input_tracker.push({
      id: this.state.counter,
      created: false,
      loading: false,
      name: ''
    });

    const nextKeys = keys.concat(this.state.counter);

    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleNewIngredientInput(e: any) {
    const { getFieldValue } = this.props.form;
    const { id } = e.target;
    const val = getFieldValue(`ingredient_${id}`);
    const quantity = getFieldValue(`quantity_${id}`)
    const temp = this.state.input_tracker;
    temp[id].loading = true;
    this.setState({
      input_tracker: temp
    })
    if (val && quantity && val.length > 0 && quantity.length > 0) {
      const temp = this.state.input_tracker;
      temp[id].loading = false;
      temp[id].created = true;
      temp[id].name = val;
      temp[id].quantity = quantity;
      this.setState({
        input_tracker: temp
      });
      message.success('Item created!');
    } else {
      const temp = this.state.input_tracker;
      temp[id].loading = false;
      temp[id].created = false;
      this.setState({
        input_tracker: temp
      });
      message.error("Your input is bad yo.")
    }
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  recieveImageFeedback(info: any) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
      const id = info.file.response.id;
      const temp = this.state.input_tracker;
      temp[id].response = info.file.response;
      temp[id].completed = true;
      this.setState({
        input_tracker: temp,
        has_ingredients: true
      });
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }

  makeNutritionDetails(info: any, gfd: any) {
    let fields: any = [];
    _.forEach(info, (value: number, key: string) => {
      if (!((key == 'name') || (key == 'quantity'))) {
        fields.push(<NutritionField key={key} label={key.toLocaleUpperCase()} value={value} id={key} getFieldDecorator={gfd} required={false} />)
      }
    })
    return fields;
  }

  render () {
    const { Dragger } = Upload;
    const draggerProps = {
      multiple: true,
      customRequest: (info: any) => {
        const id = parseInt(info.filename.substring(7));
        const input = this.state.input_tracker[id];
        this.getBase64(info.file)
        .then(
          (data: any) => {
            const content = data.substring(data.indexOf(',')+1);
            console.log(info);
            axios.put(`${BACKEND_URL}/meals`, {
              name: input.name,
              id: this.state.meal_id,
              quantity: input.quantity,
              content
            }).then(function (response) {
              console.log(response.data);
              let buffer = response.data;
              buffer.id = id;
              info.onSuccess(response.data);
            })
            .catch(function (error) {
              message.error('Failed to collect info.')
              console.log(error);
              info.onError();
            });
          }
        );
      },
    }

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
        md: { span: 24 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k: any) => (
      <div
        key={k}
      >
        <div className="v-center">
          <Form.Item
            {...(formItemLayoutWithOutLabel)}
            required={false}
          >
            {getFieldDecorator(`ingredient_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input a food item.",
              }],
            })(
              <div>
                <Input placeholder="Food Name" style={{ width: '30em', marginRight: 8 }} disabled={this.state.input_tracker[k].loading || this.state.input_tracker[k].created} />
                {(keys.length > 1 && !this.state.input_tracker[k].loading && !this.state.input_tracker[k].created) ? (<Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.handleDelete(k)}/>) : null}
              </div>
            )}
          </Form.Item>
          <Form.Item
            {...(formItemLayoutWithOutLabel)}
          >
            {getFieldDecorator(`quantity_${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input a quantity.",
                }],
              })(
                <div>
                  <div>
                    <InputNumber id={`quanity_${k}`} placeholder="Quantity" disabled={this.state.input_tracker[k].loading || this.state.input_tracker[k].created} />
                  </div>
                </div>
              )}
          </Form.Item>
          <Form.Item
          {...(formItemLayoutWithOutLabel)}
        >
          <Button type="primary" id={`${k}`} onClick={this.handleNewIngredientInput} loading={this.state.input_tracker[k].loading} disabled={this.state.input_tracker[k].created} >Create</Button>
        </Form.Item>
        </div>
        <div style={{ width: '60%', marginRight: 8 }} hidden={!this.state.input_tracker[k].created || this.state.input_tracker[k].completed }>
          <h4>Upload Nutrition Label for {this.state.input_tracker[k].name}</h4>
          <Dragger {...draggerProps} name={`upload_${k}`} onChange={this.recieveImageFeedback}>
            <p className="ant-upload-drag-icon" >
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Please upload the nutrition label of this ingredient. Max 8 mb.</p>
          </Dragger>
          {this.state.input_tracker[k].response ? 
            <div>
              <h3 className="mt-30">Nutrition Info for {this.state.input_tracker[k].response.log.meals[k].name}.</h3>
              {this.makeNutritionDetails(this.state.input_tracker[k].response.log.meals[k], getFieldDecorator)}
            </div> 
          : null}
          <div>
            
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <div style={{ padding: '30px 50px' }}>
          <h2>Create a new Meal</h2>
          <Form>
            <h3>Ingredients</h3>
            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel} className="mt-60">
              <Button type="dashed" onClick={this.handleAdd} style={{ width: '60%' }}>
                <Icon type="plus" /> Add Ingredient
              </Button>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="primary" htmlType="submit" size="large" style={{ width: '60%' }} disabled={!this.state.has_ingredients}>Done</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export const WrappedNewMealForm = Form.create({ name: 'dynamic_form_item' })(NewMeal);
