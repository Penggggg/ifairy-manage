import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Breadcrumb } from 'antd';

export default class ClassifyNewPage extends React.PureComponent< IProps, { }> {

    constructor( ) {
        super( );
    }

    render( ) {
        return <div className="classify-new-page">
            <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item>分类</Breadcrumb.Item>
                <Breadcrumb.Item>新增分类</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    }
}

interface IProps extends RouteComponentProps<{},{}> {

}