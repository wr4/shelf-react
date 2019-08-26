import React from 'react'
import { Radio, Form, Input, Button, } from 'antd';

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    state = {
        loading: false,
    }

    enterLoading = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 2000);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values)
            }
        });
        if (typeof (this.props.aftersubmit) != 'undefined') {
            this.props.aftersubmit()
        }

    };

    genRegisterForm() {
        const { loading } = this.state
        const { getFieldDecorator } = this.props.form;



        return (
            <Form layout={'inline'} onSubmit={this.handleSubmit}>
                <Form.Item label="商品类型"></Form.Item>
                <Form.Item >
                    {getFieldDecorator('related_type', {
                        rules: [],
                    })(
                        <Radio.Group>
                            <Radio value="2">渠道商品</Radio>
                            <Radio value="3">班级商品</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item><br />
                <Form.Item label="关联编号"></Form.Item><Form.Item >
                    {getFieldDecorator('related_id', {
                        rules: [], initialValue: this.props.field.related_id
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="商品名称"></Form.Item>
                <Form.Item >
                    {getFieldDecorator('subject', {
                        rules: [], initialValue: this.props.field.subject
                    })(
                        <Input

                        />,
                    )}
                </Form.Item>
                <br />
                <Form.Item label="商品描述"></Form.Item><Form.Item >
                    {getFieldDecorator('body', {
                        rules: [], initialValue: this.props.field.body
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="原始价格"></Form.Item><Form.Item >
                    {getFieldDecorator('origin_price', {
                        rules: [], initialValue: this.props.field.origin_price
                    })(
                        <Input
                            disabled={true}
                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="当前价格"></Form.Item><Form.Item >
                    {getFieldDecorator('current_price', {
                        rules: [], initialValue: this.props.field.current_price
                    })(
                        <Input
                            disabled={true}
                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="服务周期"></Form.Item><Form.Item >
                    {getFieldDecorator('duration', {
                        rules: [], initialValue: this.props.field.duration
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="赠送时长"></Form.Item><Form.Item >
                    {getFieldDecorator('extra_duration', {
                        rules: [], initialValue: this.props.field.extra_duration
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />

                <Form.Item label="开通模块"></Form.Item><Form.Item >
                    {getFieldDecorator('module_ids', {
                        rules: [], initialValue: this.props.field.module_ids
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />


                <Form.Item label="服务学段"></Form.Item><Form.Item >
                    {getFieldDecorator('stage', {
                        rules: [], initialValue: this.props.field.stage
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="显示标签"></Form.Item><Form.Item >
                    {getFieldDecorator('flag', {
                        rules: [], initialValue: this.props.field.flag
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="是否直接上架"></Form.Item>
                <Form.Item >
                    {getFieldDecorator('available', {
                        rules: [],
                    })(
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item><br />
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={this.enterLoading}>
                        确认
                    </Button>
                </Form.Item>
            </Form>

        )
    }

    genEditForm() {
        const { loading } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout='inline' onSubmit={this.handleSubmit}>
                <Form.Item label="商品编号"></Form.Item>
                <Form.Item >
                    {getFieldDecorator('id', {
                        rules: [], initialValue: this.props.field.id
                    })(
                        <Input
                            disabled={true}
                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="商品名称"></Form.Item>
                <Form.Item >
                    {getFieldDecorator('subject', {
                        rules: [], initialValue: this.props.field.subject
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="商品描述"></Form.Item><Form.Item >
                    {getFieldDecorator('body', {
                        rules: [], initialValue: this.props.field.body
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="原始价格"></Form.Item><Form.Item >
                    {getFieldDecorator('origin_price', {
                        rules: [], initialValue: this.props.field.origin_price
                    })(
                        <Input
                            disabled={true}
                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="当前价格"></Form.Item><Form.Item >
                    {getFieldDecorator('current_price', {
                        rules: [], initialValue: this.props.field.current_price
                    })(
                        <Input
                            disabled={true}
                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="开通模块"></Form.Item><Form.Item >
                    {getFieldDecorator('module_ids', {
                        rules: [], initialValue: this.props.field.module_ids
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="服务周期"></Form.Item><Form.Item >
                    {getFieldDecorator('duration', {
                        rules: [], initialValue: this.props.field.duration
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="赠送时长"></Form.Item><Form.Item >
                    {getFieldDecorator('extra_duration', {
                        rules: [], initialValue: this.props.field.extra_duration
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="服务学段"></Form.Item><Form.Item >
                    {getFieldDecorator('stage', {
                        rules: [], initialValue: this.props.field.stage
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />
                <Form.Item label="显示标签"></Form.Item><Form.Item >
                    {getFieldDecorator('flag', {
                        rules: [], initialValue: this.props.field.flag
                    })(
                        <Input

                        />,
                    )}
                </Form.Item><br />

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={this.enterLoading}>
                        确认
                </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.props.handleCancel} >
                        取消
                </Button>
                </Form.Item>
            </Form>
        )
    }
    render() {
        if (this.props.reg === true) {
            return this.genRegisterForm()
        } else {
            return this.genEditForm()
        }
    }
}

const EditForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default EditForm;
