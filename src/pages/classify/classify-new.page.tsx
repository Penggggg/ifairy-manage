import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Breadcrumb, Form, Input, Icon, Button } from 'antd';
import * as DForm from 'antd/lib/form/Form.d';

const FormItem = Form.Item;

class ClassifyNewPage extends React.PureComponent< IProps, { }> {

    uuid = 0;
    constructor( ) {
        super( );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }

    add = ( ) => {
        this.uuid++ ;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat( this.uuid );
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render( ) {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map(( k, index ) => {
            return <FormItem key={ k } label={ k }>
                {getFieldDecorator(`${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        { required: true, message: 'Please input Classify' }
                    ]
                })(
                   <Input placeholder="Classify" style={{ width: '60%' }} /> 
                )}
            </FormItem>
        })

        return <div className="classify-new-page">
            <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item>分类</Breadcrumb.Item>
                <Breadcrumb.Item>新增分类</Breadcrumb.Item>
            </Breadcrumb>
             <Form onSubmit={this.handleSubmit} style={{ padding: '50px'}}>
                <FormItem label='分类标题'>
                    {getFieldDecorator('classifyTitle', {
                        rules: [
                            { required: true, message: 'Please input ClassifyTitle' }
                        ]
                    })(
                        <Input prefix={<Icon type="logout" style={{ fontSize: 16 }} />}  placeholder="classify title" />
                    )}
                </FormItem>
                <p>分类子类别:</p>
                { formItems }
                <FormItem>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large">Submit</Button>
                </FormItem>
            </Form>
        </div>
    }
}

export default Form.create( )(ClassifyNewPage)

interface IProps extends RouteComponentProps<{},{}> {
    form: DForm.WrappedFormUtils
}