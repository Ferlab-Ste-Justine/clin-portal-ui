import axios from 'axios';
import capitalize from 'lodash/capitalize';

import { IAnnotationTrack, IIGVTrack } from '../components/Igv/type';
import { FhirDoc, FhirDocContent, PatientFileResults } from '../graphql/patients/models/Patient';

import { GENDER, PARENT_TYPE, PATIENT_POSITION } from './constants';
import { appendBearerIfToken, getPatientPosition } from './helper';

interface ITrackFiles {
  indexFile: string | undefined;
  mainFile: string | undefined;
}
const FHIR_CRAM_CRAI_DOC_TYPE = 'ALIR';
const FHIR_CRAM_TYPE = 'CRAM';
const FHIR_CRAI_TYPE = 'CRAI';

const FHIR_VCF_TBI_DOC_TYPE = 'GCNV';
const FHIR_VCF_TYPE = 'VCF';
const FHIR_TBI_TYPE = 'TBI';

const FHIR_IGV_DOC_TYPE = 'IGV';
const FHIR_BED_TYPE = 'BED';
const FHIR_BW_TYPE = 'BW';
const HYPER_EXOME_FILE_NAME = 'KAPA_HyperExome_hg38_combined_targets';
const HYPER_EXOME_TRACK_NAME = 'HyperExome_hg38';

const getPresignedUrl = (file: string, rpt: string) =>
  axios
    .get(`${file}?format=json`, {
      headers: { Authorization: appendBearerIfToken(rpt) },
    })
    .then((response) => response.data.url);

const findDoc = (files: PatientFileResults, docType: string): FhirDoc | undefined =>
  files.docs.find((doc) => doc.type === docType);

const findFiles = (doc: FhirDoc, mainType: string, indexType: string): ITrackFiles => ({
  mainFile: doc?.content!.find((content) => content.format === mainType)?.attachment.url,
  indexFile: doc?.content!.find((content) => content.format === indexType)?.attachment.url,
});

const trackName = (
  doc: FhirDoc | undefined,
  patientId: string,
  gender: GENDER,
  position: PATIENT_POSITION | PARENT_TYPE,
  attachmentTitle?: string,
): string => {
  const trackName = `${doc?.sample.value!} ${getPatientPosition(gender, position)}`;
  if (!attachmentTitle) return trackName;

  const splittedTitle = attachmentTitle.split('.');

  const namePrefix = splittedTitle[splittedTitle.length - 2];

  return `${capitalize(namePrefix)} ${trackName}`;
};

export const generateTracks = (
  files: PatientFileResults,
  patientId: string,
  gender: GENDER,
  position: PATIENT_POSITION | PARENT_TYPE,
  rpt: string,
): IIGVTrack[] => {
  const cramDoc = findDoc(files, FHIR_CRAM_CRAI_DOC_TYPE);
  const cramFiles = findFiles(cramDoc!, FHIR_CRAM_TYPE, FHIR_CRAI_TYPE);

  const vcfDoc = findDoc(files, FHIR_VCF_TBI_DOC_TYPE);
  const vcfFiles = findFiles(vcfDoc!, FHIR_VCF_TYPE, FHIR_TBI_TYPE);

  const segDoc = findDoc(files, FHIR_IGV_DOC_TYPE);

  const newTracks: any = [];
  segDoc?.content.forEach(({ format, attachment }) => {
    if (!attachment.title.includes(HYPER_EXOME_FILE_NAME)) {
      let type = (format = '');
      if (format === FHIR_BED_TYPE) {
        type = 'annotation';
        format = 'bed';
      } else if (format === FHIR_BW_TYPE) {
        type = 'wig';
        format = 'bigWig';
      }

      newTracks.push({
        type,
        format,
        url: getPresignedUrl(attachment.url!, rpt),
        name: trackName(segDoc, patientId, gender, position, attachment.title),
        autoHeight: true,
        maxHeight: 500,
        colorBy: 'strand',
      });
    }
  });

  return [
    {
      type: 'variant',
      format: 'vcf',
      url: getPresignedUrl(vcfFiles.mainFile!, rpt),
      indexURL: getPresignedUrl(vcfFiles.indexFile!, rpt),
      name: 'CNVs: ' + trackName(vcfDoc, patientId, gender, position),
      autoHeight: true,
      colorBy: 'SVTYPE',
    },
    {
      type: 'alignment',
      format: 'cram',
      url: getPresignedUrl(cramFiles.mainFile!, rpt),
      indexURL: getPresignedUrl(cramFiles.indexFile!, rpt),
      name: 'Reads: ' + trackName(cramDoc, patientId, gender, position),
      autoHeight: true,
      maxHeight: 500,
      colorBy: 'strand',
      sort: {
        chr: 'chr8',
        option: 'BASE',
        position: 128750986,
        direction: 'ASC',
      },
    },
    ...newTracks,
  ];
};

export const getHyperXenomeTrack = (
  files: PatientFileResults,
  patientId: string,
  gender: GENDER,
  position: PATIENT_POSITION | PARENT_TYPE,
  rpt: string,
): IAnnotationTrack | null => {
  const doc = findDoc(files, FHIR_IGV_DOC_TYPE);
  if (!doc) return null;

  const { attachment } = doc?.content.find(({ attachment }) =>
    attachment.title.includes(HYPER_EXOME_FILE_NAME),
  ) as FhirDocContent;

  return {
    type: 'annotation',
    format: 'bed',
    url: getPresignedUrl(attachment.url!, rpt),
    indexURL: null,
    name: trackName(
      doc,
      patientId,
      gender,
      position,
      attachment.title.replace(HYPER_EXOME_FILE_NAME, HYPER_EXOME_TRACK_NAME),
    ),
    autoHeight: true,
    maxHeight: 500,
  };
};
