import React from 'react';
import { Tag as AntTag, TagProps } from 'antd'; // Assuming you're using Ant Design

interface Props extends TagProps {
    icon?: React.ReactNode;
}

const Tag: React.FC<Props> = ({ icon, children, ...rest }) => {
    return (
        <AntTag icon={icon} {...rest}>
            {children}
        </AntTag>
    );
};

export default Tag;
