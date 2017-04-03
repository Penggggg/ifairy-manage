import * as React from 'react';
import http from '../../services/http.service';
import notification from '../../services/notification.service';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb, Form, Input, Icon, Button } from 'antd';


import * as DForm from 'antd/lib/form/Form.d';
import { IClassifyNew } from '../../interface/form.interface';
import { _IPostClassifyNew, IPostClassifyNew_ } from '../../interface/api.interface';

const FormItem = Form.Item;

class ClassifyNewPage extends React.PureComponent< IProps, { }> {

    uuid = 0;
    classifyMetaData: Array< keyof IClassifyNew > = ['classifyName', 'classifyInfo', 'imgURL'];

    constructor( ) {
        super( );
    }

    handleSubmit = ( e ) => {

        const { form } = this.props;
        e.preventDefault( );

        form.validateFields((err, values ) => {
            if (!err) {
                let reqBody: _IPostClassifyNew = { 
                    classifyTitle: '',
                    children: [ ]
                };
                reqBody.classifyTitle = values.classifyTitle;

                for( let i = 0; i < this.uuid; i++ ) {

                    /**内部初始化 */
                    let child = { 
                        key: String( i ),
                        classifyName: "",
                        classifyInfo: "",
                        imgURL: ""
                    };

                    /**内部赋值 */
                    this.classifyMetaData.map(( k ) => {
                        child[ k ] = form.getFieldValue(`${i}-${k}`);
                    })

                    /**外部推入 */
                    reqBody.children.push( child )
                }

                console.log( reqBody )

                http.post<IPostClassifyNew_>(`/mapi/v1/classify-new`, reqBody )
                    .do( r => {
                        notification.open({
                            title:  '消息',
                            msg: r.status === '200' ? '新增类别成功！' : `错误！${r.msg}`,
                            type: r.status === '200' ? 'ok' : 'error'
                        })
                    })
                    .do( r => {
                        if ( r.status === '200' ) {
                            setTimeout(( ) => {
                                this.props.form.resetFields( );
                                location.reload();
                            }, 2000 )
                        }
                    })
                    .subscribe( );
            }
        })
    }

    add = ( ) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat( this.uuid++ );
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render( ) {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map(( outerkey, index ) => {
            return <div key={ outerkey }>
                {
                    this.classifyMetaData.map(( innerKey ) => {
                        return  <FormItem  label={`${outerkey}-${innerKey}`} key={`outerkey-${innerKey}`}>
                            {getFieldDecorator(`${outerkey}-${innerKey}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    { required: true, message: 'Please input Classify' }
                                ]
                            })(
                                <Input placeholder="Classify" style={{ width: '60%' }} /> 
                            )}
                        </FormItem>
                    })
                }
            </div>
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