import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router, hashHistory } from 'react-router';
// import routes from './pages';

class App extends React.PureComponent<{ }, { }> {

    constructor( ) {super( );}

    render( ) {
        return <div>
            123123
        </div>
    }
}

ReactDom.render(
    <App />,
    document.querySelector('#app')
)

