import { STEPS_ID } from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import { IAnalysisConfig } from 'store/prescription/types';

export const DevelopmentDelayConfig: IAnalysisConfig = {
  analysisTitle: 'Retard global de développement / Déficience intellectuelle',
  steps: [
    {
      id: STEPS_ID.PATIENT_IDENTIFICATION,
      title: 'Identification du patient',
    },
    {
      id: STEPS_ID.CLINICAL_SIGNS,
      title: 'Signes cliniques',
    },
    {
      id: STEPS_ID.PARACLINICAL_EXAMS,
      title: 'Examens paracliniques',
    },
    {
      id: STEPS_ID.HISTORY_AND_DIAGNOSIS,
      title: 'Histoire et hypothèse diagnostique',
    },
    {
      id: STEPS_ID.MOTHER_IDENTIFICATION,
      title: 'Informations de la mère',
    },
    {
      id: STEPS_ID.FATHER_IDENTIFICATION,
      title: 'Informations du père',
    },
    {
      id: STEPS_ID.SUBMISSION,
      title: 'Soumission',
    },
  ],
};
