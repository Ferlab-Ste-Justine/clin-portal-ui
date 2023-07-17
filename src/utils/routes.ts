export enum STATIC_ROUTES {
  HOME = '/',
  ERROR = '/error',
  PRESCRIPTION_SEARCH = '/prescription/search',
  ARCHIVE_EXPLORATION = '/archive/exploration',
  SNV_EXPLORATION_RQDM = '/snv/exploration',
  CNV_EXPLORATION_RQDM = '/cnv/exploration',
  LANDING = '/landing',
}

export enum DYNAMIC_ROUTES {
  ERROR = '/error/:status?',
  VARIANT_ENTITY = '/variant/entity/:locus/:tabid?',
  PRESCRIPTION_ENTITY = '/prescription/entity/:id',
  BIOINFO_ANALYSIS = '/bioinformatics-analysis/:id',
  SNV_EXPLORATION_PATIENT = '/snv/exploration/patient/:patientid?/:prescriptionid?',
  CNV_EXPLORATION_PATIENT = '/cnv/exploration/patient/:patientid?/:prescriptionid?',
}
