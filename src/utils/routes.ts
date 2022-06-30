export enum STATIC_ROUTES {
  HOME = '/',
  ERROR = '/error',
  PRESCRIPTION_SEARCH = '/prescription/search',
  ARCHIVE_EXPLORATION = '/archive-exploration',
  VARIANT_EXPLORATION_RQDM = '/variant-exploration',
}

export enum DYNAMIC_ROUTES {
  ERROR = '/error/:status?',
  VARIANT_ENTITY = '/variant/entity/:locus/:tabid?',
  PRESCRIPTION_ENTITY = '/prescription/entity/:id',
  BIOINFO_ANALYSIS = '/bioinformatics-analysis/:id',
  VARIANT_EXPLORATION_PATIENT = '/variant-exploration/patient/:patientid?/:prescriptionid?',
  CNV_EXPLORATION_PATIENT = '/cnv-exploration/patient/:patientid?/:prescriptionid?',
}
