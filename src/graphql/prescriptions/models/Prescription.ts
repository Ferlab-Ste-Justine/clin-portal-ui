import { ArrangerNodeData, ArrangerResultsTree } from 'graphql/models';
import { HealthProfessional, Organization, PatientResult } from 'graphql/patients/models/Patient';

export type DataCategory = {
  data_category: string;
  count: number;
};

// Modal V2

export interface IAnalysisResultTree {
  Analyses: ArrangerResultsTree<AnalysisResult>;
}

export type ITableAnalysisResult = AnalysisResult & {
  key: string;
};

export interface AnalysisResult extends ArrangerNodeData {
  id: string;
  score: number;
  analysis_code: string;
  created_on: string;
  ep: string;
  ldm: string;
  patient_id: string;
  patient_mrn: string;
  prenatal: boolean;
  prescription_id: string;
  priority: string;
  requester: string;
  security_tags: string;
  status: string;
  timestamp: string;
  sequencing_requests: ArrangerResultsTree<AnalysisSequencingRequest>;
  assignments: string[];
}

export interface GeneCoverage {
  gene: string;
  size: number;
  average_coverage: number;
  coverage5: number;
  coverage15: number;
  coverage30: number;
  coverage50: number;
  coverage100: number;
  coverage200: number;
  coverage300: number;
  coverage400: number;
  coverage500: number;
  coverage1000: number;
  aliquot_id: string;
  service_request_id: string;
  batch_id: string;
  start: number;
  end: number;
  omim_gene_id: string;
  ensembl_gene_id: string;
  hash: string;
  chromosome: string;
}

export interface AnalysisSequencingRequest {
  id: string;
  score: number;
  request_id: string;
  status: string;
}

export const analysisFields = [
  'status',
  'sequencing_requests__status',
  'analysis_code',
  'ldm',
  'ep',
  'prenatal',
];

// Model V1

export interface IPrescriptionResultTree {
  Prescriptions: ArrangerResultsTree<PrescriptionResult>;
}

export type ITablePrescriptionResult = PrescriptionResult & {
  key: string;
};

export interface PrescriptionResult extends ArrangerNodeData {
  mrn: string;
  ethnicity: string;
  bloodRelationship: string;
  status: string;
  state: string;
  timestamp: string;
  analysis: {
    code: string;
    display: string;
  };
  submitted: string;
  authoredOn: string;
  approver: ArrangerResultsTree<HealthProfessional>;
  prescriber: HealthProfessional;
  organization: Organization;
  familyInfo: {
    cid: string;
    type: string;
  };
  patientInfo: PatientResult;
  laboratory: string;
}

export const fields = [
  'status',
  'laboratory',
  'analysis__code',
  'prescriber__lastNameFirstName',
  'organization__name',
];
