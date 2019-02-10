import * as React from 'react';
import axios from 'axios';
import { Button, Form, Input, Icon, InputNumber, Upload, message, Row, Col} from 'antd';
import { UserHeader } from './header';

const BACKEND_URL='https://f9e15757.ngrok.io';

type newMealFormState = {
  counter: number;
  meal_id: string;
  input_tracker?: any
}

class NewMeal extends React.Component<any, newMealFormState> {
  state: newMealFormState = {
    counter: 0,
    meal_id: '',
    input_tracker: []
  }

  constructor(props: any) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewIngredientInput = this.handleNewIngredientInput.bind(this);
  }

  componentDidMount() {
    axios.post(`${BACKEND_URL}/meals`).then((res) => {
      if (res.data.isSuccessful) {
        this.setState({
          meal_id: res.data.id
        });
      } else {
        // TODO DISPLAY ERROR REDIRECT
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
      // axios.put(`${BACKEND_URL}/meals`, {
      //   id: this.state.meal_id,
      //   name: val,
      //   quantity
      // })
      const temp = this.state.input_tracker;
      temp[id].loading = false;
      temp[id].completed = true;
      temp[id].name = val;
      this.setState({
        input_tracker: temp
      });
      message.success('Item created!');
    } else {
      const temp = this.state.input_tracker;
      temp[id].loading = false;
      temp[id].completed = false;
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

  render () {
    const { Dragger } = Upload;
    const draggerProps = {
      name: 'file',
      multiple: true,
      customRequest: (info: any) => {
        this.getBase64(info.file)
        .then(
          (data: any) => {
            // axios.post(`${BACKEND_URL}/`)
          }
        );
      },
      onChange(info: any) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          console.log(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          console.log(`${info.file.name} file upload failed.`);
        }
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
    const nutritionForm = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
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
                <Input placeholder="Food Name" style={{ width: '30em', marginRight: 8 }} disabled={this.state.input_tracker[k].loading || this.state.input_tracker[k].completed} />
                {(keys.length > 1 && !this.state.input_tracker[k].loading && !this.state.input_tracker[k].completed) ? (<Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.handleDelete(k)}/>) : null}
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
                    <InputNumber id={`quanity_${k}`} placeholder="Quantity" disabled={this.state.input_tracker[k].loading || this.state.input_tracker[k].completed} />
                  </div>
                </div>
              )}
          </Form.Item>
          <Form.Item
          {...(formItemLayoutWithOutLabel)}
        >
          <Button type="primary" id={`${k}`} onClick={this.handleNewIngredientInput} loading={this.state.input_tracker[k].loading} disabled={this.state.input_tracker[k].completed} >Create</Button>
        </Form.Item>
        </div>
        <div style={{ width: '60%', marginRight: 8 }} hidden={!this.state.input_tracker[k].completed}>
          <h4>Upload Nutrition Label for {this.state.input_tracker[k].name}, or <a>Enter Nutrition Info Manually</a></h4>
          <Dragger {...draggerProps} >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Please upload the nutrition label of this ingredient. Max 8 mb.</p>
          </Dragger>
          <div>
            <h3 className="mt-30">Modify Nutrition Info Manually.</h3>
            <Form.Item
              label="Calories"
            >
              {getFieldDecorator('calories', {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please provide the calorie count.",
                }],
              })(
                <div>
                  <div>
                    <InputNumber placeholder="Calories" style={{ width: '20em', marginRight: 8 }} />
                  </div>
                </div>
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  {...(nutritionForm)}
                  label="Saturated Fat"
                >
                  {getFieldDecorator('fat', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: false,
                      whitespace: true,
                      message: "Please provide the Saturated Fat info.",
                    }],
                  })(
                    <div>
                      <div>
                        <InputNumber placeholder="Fat" style={{ width: '20em', marginRight: 8 }} />
                      </div>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
              
                {...(nutritionForm)}
                label="Trans. Fat"
              >
                {getFieldDecorator('t_fat', {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: false,
                    whitespace: true,
                    message: "Please provide the trans. fat info.",
                  }],
                })(
                  <div>
                    <div>
                      <InputNumber id={`quanity_${k}`} placeholder="Calories" style={{ width: '20em', marginRight: 8 }} />
                    </div>
                  </div>
                )}
              </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Sodium"
            >
              {getFieldDecorator('sodium', {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: false,
                  whitespace: true,
                  message: "Please provide the sodium info.",
                }],
              })(
                <div>
                  <div>
                    <InputNumber placeholder="Sodium" style={{ width: '20em', marginRight: 8 }} />
                  </div>
                </div>
              )}
            </Form.Item>
            <Form.Item
              label="Carbohydrate"
            >
              {getFieldDecorator('carb', {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: false,
                  whitespace: true,
                  message: "Please provide the carbohydrate info.",
                }],
              })(
                <div>
                  <div>
                    <InputNumber placeholder="Carbohydrate" style={{ width: '20em', marginRight: 8 }} />
                  </div>
                </div>
              )}
            </Form.Item>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <UserHeader calorie_count={2000} calorie_target={4000} />
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
              <Button type="primary" htmlType="submit" disabled>Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export const WrappedNewMealForm = Form.create({ name: 'dynamic_form_item' })(NewMeal);
