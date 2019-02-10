import * as React from 'react';
import { Progress } from 'antd';

export type badgeProps = {
    target: number;
    current: number;
    title?: string;
    unit?: string;
}

export type badgeState = {

}

export class HeaderBadge extends React.Component<badgeProps, badgeState> {
    render() {
        const {title, target, current, unit} = this.props;
        return (
            <div className="text-centered header-badge">
                <Progress type="circle" percent={Math.round(current/target * 100)} />
                <h3 className="no-margin" style={{marginTop: '10px'}}>{title}</h3>
                <p className="text-muted no-margin">{current}/{target} {unit}</p>
            </div>
        )
    }
}