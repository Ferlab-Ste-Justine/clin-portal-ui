import React from 'react';
import intl from 'react-intl-universal';
import { Result } from 'antd';

interface OwnProps {
  title?: string;
  description?: string;
}

const ServerError = ({ title, description }: OwnProps) => (
  <Result
    status="500"
    title={title ? title : intl.get('result.server.error.title')}
    subTitle={description ? description : intl.get('result.server.error.description')}
  />
);

export default ServerError;
