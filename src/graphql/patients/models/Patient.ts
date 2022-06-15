import { ArrangerNodeData, ArrangerResultsTree } from 'graphql/models';

export interface Requests extends ArrangerNodeData {
  status: string;
  submitted: string;
  analysis: {
    code: string;
    display: string;
  };
}

export interface Organization extends ArrangerNodeData {
  cid: string;
  name: string;
}

export interface HealthProfessional extends ArrangerNodeData {
  cid: string;
  firstName: string;
  lastName: string;
  lastNameFirstName?: string;
}

export interface PatientResult extends ArrangerNodeData {
  score: string;
  birthDate: string;
  bloodRelationship: string;
  ethnicity: string;
  familyId: string;
  familyType: string;
  fetus: string;
  firstName: string;
  gender: string;
  lastName: string;
  mrn: string[];
  position: string;
  ramq: string;
  timestamp: string;
  cidText: string;
  lastNameFirstName: string;
  organization: Organization;
  requests: ArrangerResultsTree<Requests>;
  practitioner: ArrangerResultsTree<HealthProfessional>;
}

export interface FhirDocAttachment {
  hash: string;
  title: string;
  url: string;
  size: string;
}

export interface FhirDocContent {
  format: string;
  attachment: FhirDocAttachment;
}

export interface FhirDoc {
  id: string;
  type: string;
  sample: {
    value: string;
  };
  content: FhirDocContent[];
  patientReference: string;
}

export interface FhirTask {
  id: string;
  docs: FhirDoc[];
  focus: {
    reference: string;
  };
  owner: FhirOwner;
  runDate: string;
  authoredOn: string;
  runAlias: string;
}

export interface FhirOwner {
  alias: string;
  email: string;
  id: string;
}

export interface PatientFileResults {
  id: string;
  docs: FhirDoc[];
}

export type PatientTaskResults = FhirTask[];
