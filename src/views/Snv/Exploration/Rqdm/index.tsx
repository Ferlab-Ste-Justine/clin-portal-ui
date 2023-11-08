import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { CustomPillApi } from 'api/customPill';
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping } from 'graphql/models';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import useCustomPillsActions from 'hooks/useCustomPillsActions';
import { useCustomPill } from 'store/customPill';
import { fetchCustomPills } from 'store/customPill/thunks';
import { useGlobals, useLang } from 'store/global';
import { VARIANT_RQDM_QB_ID_FILTER_TAG } from 'utils/queryBuilder';
import { getQueryBuilderDictionary } from 'utils/translation';

import VariantSearchLayout from '../components/VariantSearchLayout';

import { getMenuItems, getMenuItemsEditionPill } from './facets';
import PageContent from './PageContent';

const SnvExplorationRqdm = () => {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState<ISidebarMenuItem[]>([]);
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const { isLoading, customPills, fetchError } = useCustomPill();
  const lang = useLang();
  const { handleOnDeleteCustomPill, handleOnDuplicateCustomPill, handleOnUpdateCustomPill } =
    useCustomPillsActions(VARIANT_RQDM_QB_ID_FILTER_TAG);
  const { getAnalysisNameByCode } = useGlobals();

  const facetTransResolver = (key: string) => {
    if (key === 'locus') return 'Variant';

    const title = intl
      .get(`${INDEXES.VARIANT}.filters.group.${key}`)
      .defaultMessage(intl.get(`filters.group.${key}`));

    return title
      ? title
      : variantMappingResults?.data?.find((mapping: ExtendedMapping) => key === mapping.field)
          ?.displayName || key;
  };

  useEffect(() => {
    dispatch(fetchCustomPills(VARIANT_RQDM_QB_ID_FILTER_TAG));
  }, [dispatch]);

  useEffect(() => {
    if (!variantMappingResults.loading) {
      const items = getMenuItems({
        variantMappingResults,
        customPills: customPills[VARIANT_RQDM_QB_ID_FILTER_TAG],
        hasCustomPillError: fetchError,
        isLoading,
        menuItemsEditionPill: getMenuItemsEditionPill(variantMappingResults),
        deleteCustomPill: handleOnDeleteCustomPill,
        duplicateCustomPill: handleOnDuplicateCustomPill,
        editCustomPill: handleOnUpdateCustomPill,
        validateName: CustomPillApi.validateName,
        learnMoreLink: 'http://www.google.fr',
        queryDictionary: getQueryBuilderDictionary(facetTransResolver, getAnalysisNameByCode),
      });

      setMenuItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customPills, variantMappingResults.loading, lang]);

  return (
    <VariantSearchLayout
      contentHeaderProps={{
        title: intl.get('screen.variantsearch.rqdm.title'),
      }}
      menuItems={menuItems}
    >
      <PageContent variantMapping={variantMappingResults} />
    </VariantSearchLayout>
  );
};

const SnvExplorationRqdmWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <SnvExplorationRqdm />
  </ApolloProvider>
);

export default SnvExplorationRqdmWrapper;
