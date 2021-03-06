import * as React from 'react';
import { FormInstance } from 'antd';
import { NamePath } from 'antd/lib/form/interface';

export interface AnalysisFormContextProps {
  form: FormInstance;
  getNamePath: (key: (string | number)[]) => NamePath;
}

const AnalysisFormContext = React.createContext<AnalysisFormContextProps | null>(null);

export const AnalysisFormContextProvider = AnalysisFormContext.Provider;
export const AnalysisFormContextConsumer = AnalysisFormContext.Consumer;

export default AnalysisFormContext;
