export type CNVEntity = {
  id: string;
  chromosome: string;
  start: number;
  end: number;
  cn: number;
  number_gene: number;
  filter: string[];
  sm: number;
  bc: number;
  pe: number;
};

export type ITableCnvEntity = CNVEntity & {
  key: string;
};
