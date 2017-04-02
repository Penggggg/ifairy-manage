import { RouterState } from 'react-router';


export default {
    path: '/',
    getComponent: ( nextstate: RouterState , cb: Function ) => {
         System.import('./app.page').then( module => { 
             cb( null, module.default )}
         ).catch(( err: Error ) => showMessage( err, 'app.page' ))
    },
    childRoutes: [
        {
            path: 'classify-list',
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./classify/classify-list.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, 'classify-list.page' ))
            }
        },
        {
            path: 'classify-new',
            getComponent: ( nextstate: RouterState , cb: Function ) => {
                System.import('./classify/classify-new.page').then( module => { 
                    cb( null, module.default )}
                ).catch(( err: Error ) => showMessage( err, 'classify-new.page' ))
            }
        },
    ]
}


function showMessage( err: Error, pageName: string ): void {
    return console.error(`Error in download ${pageName}: ${err}`)
}