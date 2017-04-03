import * as React from 'react';
import { notification, Icon } from 'antd';


class NotificationService {

    public open({ title, msg, type = 'ok' }) {
        notification.open({
            message: title,
            description: msg,
            icon: <Icon type={ type === 'ok' ? "smile" : "frown" } style={{ color: '#108ee9' }} />,
        }); 
    }

}

export default new NotificationService( );