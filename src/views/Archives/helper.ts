import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { FhirDoc, PatientTaskResults } from 'graphql/patients/models/Patient';

import { formatDate } from 'utils/date';
import { formatFileSize } from 'utils/formatFileSize';

import { DocsWithTaskInfo } from '.';

const INDEXES_FORMAT = ['CRAI', 'TBI'];

export const extractContentsFromDocs = (docs?: FhirDoc[]) =>
  extractDocsFromTask([
    {
      id: '',
      authoredOn: '',
      runDate: '',
      runAlias: '',
      owner: { id: '', alias: '', email: '' },
      focus: { request: { id: '', basedOn: { reference: '' } } },
      docs: [...(docs || [])],
    },
  ]);

export const extractDocsFromTask = (tasks: PatientTaskResults) => {
  const docsList: DocsWithTaskInfo[] = [];
  tasks?.forEach((task) => {
    task.docs.forEach((doc) => {
      doc.content.forEach((content) => {
        // ignore index files
        if (!INDEXES_FORMAT.includes(content.format)) {
          docsList.push({
            ...doc,
            key: content.attachment.title,
            url: content.attachment.url,
            taskRunAlias: task.runAlias,
            taskAuthoredOn: formatDate(task.authoredOn),
            taskOwner: task.owner,
            taskId: task.id,
            patientId: extractPatientId(doc.patientReference),
            hash: content.attachment.hash,
            srRef: extractServiceRequestId(task.focus.request.id),
            basedOnSrRef: extractServiceRequestId(task.focus.request.basedOn.reference),
            size: formatFileSize(Number(content.attachment.size)) as string,
            originalSize: content.attachment.size,
            title: content.attachment.title,
            format: content.format,
            action: {
              format: content.format,
              metadata: doc,
              urls: {
                file: content.attachment.url,
                // add index file if available
                index:
                  doc.content.length > 1 && INDEXES_FORMAT.includes(doc.content[1].format)
                    ? doc.content[1].attachment.url
                    : '',
              },
            },
          });
        }
      });
    });
  });
  return docsList;
};
