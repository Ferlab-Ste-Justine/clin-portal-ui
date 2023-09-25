import { sendRequestWithRpt } from 'api';
import { getFhirPractitionerId } from 'auth/keycloak';
import { PatientTaskResults } from 'graphql/patients/models/Patient';
import {
  SEARCH_PATIENT_FILES_QUERY,
  SEARCH_PRESCRIPTION_FILES_QUERY,
} from 'graphql/patients/queries';
import { ANALYSIS_ENTITY_QUERY } from 'graphql/prescriptions/queries';
import { FHIR_GRAPHQL_URL } from 'providers/ApolloProvider';

import { LANG } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';
import { downloadFile } from 'utils/helper';

import {
  Bundle,
  Patient,
  Practitioner,
  PractitionerRole,
  ServiceRequestCode,
  ServiceRequestEntity,
} from './models';

const FHIR_API_URL = EnvironmentVariables.configFor('FHIR_API');
const FORM_API_URL = EnvironmentVariables.configFor('FORM_API_URL');

const searchPatient = (ramq: string) =>
  sendRequestWithRpt<Bundle<Patient>>({
    method: 'GET',
    url: `${FHIR_API_URL}/Patient`,
    params: {
      identifier: ramq,
    },
  });

const searchPractitionerRole = () =>
  sendRequestWithRpt<Bundle<PractitionerRole>>({
    method: 'GET',
    url: `${FHIR_API_URL}/PractitionerRole`,
    params: {
      practitioner: getFhirPractitionerId(),
      _include: 'PractitionerRole:practitioner',
    },
  });

const searchPractitionerRoles = () =>
  sendRequestWithRpt<Bundle<PractitionerRole | Practitioner>>({
    method: 'GET',
    // eslint-disable-next-line max-len
    url: `${FHIR_API_URL}/PractitionerRole?role=15941008&_include=PractitionerRole:organization&_include=PractitionerRole:practitioner&&_count=1000`,
  });

const searchPatientFiles = (searchValue: string) =>
  sendRequestWithRpt<{ data: { taskList: PatientTaskResults } }>({
    method: 'POST',
    url: FHIR_GRAPHQL_URL,
    data: {
      query: SEARCH_PATIENT_FILES_QUERY(searchValue).loc?.source.body,
      variables: {
        searchValue,
      },
    },
  });

const searchPrescriptionFiles = (searchValue: string) =>
  sendRequestWithRpt<{ data: { taskList: PatientTaskResults } }>({
    method: 'POST',
    url: FHIR_GRAPHQL_URL,
    data: {
      query: SEARCH_PRESCRIPTION_FILES_QUERY(searchValue).loc?.source.body,
      variables: {
        searchValue,
      },
    },
  });

const fetchServiceRequestEntity = (id: string) =>
  sendRequestWithRpt<{ data: { ServiceRequest: ServiceRequestEntity } }>({
    method: 'POST',
    url: FHIR_GRAPHQL_URL,
    data: {
      query: ANALYSIS_ENTITY_QUERY(id).loc?.source.body,
      variables: {
        requestId: id,
      },
    },
  });

const prescriptionAssignment = (analysis_id: string, assignements: string[]) =>
  sendRequestWithRpt<{ analysis_id: string; assignments: string[] }>({
    method: 'POST',
    url: `${FORM_API_URL}/assignment`,
    data: {
      analysis_id: analysis_id,
      assignments: assignements,
    },
  });

const downloadDocuments = (analysis_id: string, lang = LANG.FR) =>
  sendRequestWithRpt({
    method: 'GET',
    url: `${FORM_API_URL}/render/${analysis_id}?format=pdf&lang=${lang}`,
    responseType: 'blob',
  });

const fetchTaskMetadata = (taskId: string) =>
  sendRequestWithRpt<Bundle<any>>({
    method: 'GET',
    url: `${FHIR_API_URL}/Task?_id=${taskId}&_include=Task:input_specimen&_include=Task:output-documentreference&_pretty=true`,
  });

const downloadFileMetadata = (taskId: string, filename: string) =>
  sendRequestWithRpt<any>({
    method: 'GET',
    url: `${FHIR_API_URL}/Task?_id=${taskId}&_include=Task:input_specimen&_include=Task:output-documentreference&_pretty=true`,
    responseType: 'blob',
  }).then((response: { data: Blob }) => {
    downloadFile(response.data, filename);
  });

const fetchServiceRequestCodes = () =>
  sendRequestWithRpt<ServiceRequestCode>({
    method: 'GET',
    url: `${FHIR_API_URL}/CodeSystem/analysis-request-code`,
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

const getFileURL = async (fileUrl: string) =>
  sendRequestWithRpt<{ url: string }>({
    url: `${fileUrl}?format=json`,
  });

export const FhirApi = {
  searchPatient,
  searchPractitionerRole,
  searchPractitionerRoles,
  searchPatientFiles,
  searchPrescriptionFiles,
  downloadFileMetadata,
  fetchTaskMetadata,
  fetchServiceRequestCodes,
  fetchServiceRequestEntity,
  downloadDocuments,
  prescriptionAssignment,
  getFileURL,
};
