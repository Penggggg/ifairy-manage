import * as React from 'react';
import http from '../../services/http.service';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb, Form, Input, Icon, Button } from 'antd';


import * as DForm from 'antd/lib/form/Form.d';
import { _IPostClassifyNew, IPostClassifyNew_ } from '../../interface/api.interface';

const FormItem = Form.Item;

class ClassifyNewPage extends React.PureComponent< IProps, { }> {

    uuid = 0;
    constructor( ) {
        super( );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values: _IPostClassifyNew ) => {
            if (!err) {
                delete values['keys'];
                http.post<IPostClassifyNew_>(`/mapi/v1/classify-new`, values )
                    .do( r => console.log( r ))
                    .subscribe( )
            }
        })
    }

    add = ( ) => {
        this.uuid++ ;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat( this.uuid );
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render( ) {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map(( k, index ) => {
            return <FormItem key={ k-1 } label={ k-1 }>
                {getFieldDecorator(`${k-1}`, {
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
                        <Input  placeholder="classify title" />
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