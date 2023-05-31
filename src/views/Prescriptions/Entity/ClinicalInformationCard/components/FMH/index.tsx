import { CodeListEntity, FamilyMemberHistoryEntity } from 'api/fhir/models';
import { useCodeSystem, useFamilyHistoryEntity } from 'graphql/prescriptions/actions';
import { find } from 'lodash';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import { useLang } from 'store/global';
import { LANG } from 'utils/constants';

type IDOwnProps = {
  ids: string[];
};

const getFamilyHistoryInfo = (
  fmh: FamilyMemberHistoryEntity,
  codeList: CodeListEntity,
  lang: LANG,
) => {
  const relationShipCode = find(
    codeList?.concept,
    (o) => o.code === fmh?.relationship?.coding[0]?.code,
  );
  const valueDisplay = find(relationShipCode?.designation, (o) => o.language === lang);

  const fmhValue = `${fmh.note.text} (${
    valueDisplay ? valueDisplay.value : fmh?.relationship?.coding[0]?.code
  })`;

  return fmhValue;
};

export const FamilyHistory = ({ ids }: IDOwnProps) => {
  const { codeInfo } = useCodeSystem('fmh-relationship-plus');
  const { familyHistory } = useFamilyHistoryEntity(ids);
  const lang = useLang();

  if (familyHistory) {
    if (Array.isArray(familyHistory)) {
      const fmhList: string[] = [];
      familyHistory.forEach((f) => {
        fmhList.push(getFamilyHistoryInfo(f, codeInfo, lang));
      });
      return <>{fmhList.join(', ')}</>;
    } else {
      return <>{getFamilyHistoryInfo(familyHistory, codeInfo, lang)}</>;
    }
  }
  return <>{EMPTY_FIELD}</>;
};
