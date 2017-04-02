import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Breadcrumb } from 'antd';

export default class ClassifyListPage extends React.PureComponent< IProps, { }> {

    constructor( ) {
        super( );
    }

    render( ) {
        return <div className="classify-list-page">
            <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item>分类</Breadcrumb.Item>
                <Breadcrumb.Item>分类列表</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    }
}

interface IProps extends RouteComponentProps<{},{}> {

}