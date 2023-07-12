import { SavedFilterTypeEnum } from '@ferlab/ui/core/components/QueryBuilder/types';
import { TUserSavedFilter } from 'api/savedFilter/models';

import { VARIANT_RQDM_QB_ID_FILTER_TAG } from 'utils/queryBuilder';

const customPillOne: TUserSavedFilter = {
  favorite: false,
  id: 'eb6b7dd4-6415-42b5-a270-4c6a404c1284',
  queries: [
    {
      content: [
        {
          content: {
            field: 'consequences.vep_impact',
            index: 'Variants',
            value: ['MODIFIER'],
          },
          op: 'in',
        },
        {
          content: {
            field: 'consequences.consequences',
            index: 'Variants',
            value: ['upstream_gene_variant'],
          },
          op: 'in',
        },
      ],
      id: '2a1fb1e7-4e15-4b90-9d23-4f29a9c86e00',
      op: 'and',
    },
  ],
  title: 'Custom Pill 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  type: SavedFilterTypeEnum.Query,
  creation_date: '2023-07-11T23:02:00.490Z',
  updated_date: '2023-07-11T23:02:00.490Z',
  keycloak_id: '3999fd60-80d2-477d-819e-93f6873efdb2',
  tag: VARIANT_RQDM_QB_ID_FILTER_TAG,
};

const customPillTwo: TUserSavedFilter = {
  favorite: false,
  id: 'ad6b7dd4-6415-42b5-a270-4c6a404c1284',
  queries: [
    {
      content: [
        {
          content: {
            field: 'consequences.vep_impact',
            index: 'Variants',
            value: ['HIGH'],
          },
          op: 'in',
        },
        {
          content: {
            field: 'consequences.consequences',
            index: 'Variants',
            value: ['intron_variant', 'upstream_gene_variant'],
          },
          op: 'in',
        },
      ],
      id: '6g1fb1e7-4e15-4b90-9d23-4f29a9c86e00',
      op: 'and',
    },
  ],
  title: 'Custom Pill 2',
  type: SavedFilterTypeEnum.Query,
  creation_date: '2023-07-11T23:02:00.490Z',
  updated_date: '2023-07-11T23:02:00.490Z',
  keycloak_id: '3999fd60-80d2-477d-819e-93f6873efdb2',
  tag: VARIANT_RQDM_QB_ID_FILTER_TAG,
};

export const customPills = [customPillTwo, customPillOne];

export const filterWithPill = {
  id: '70b998bc-85db-4ae4-9bbe-bada23ec2a78',
  keycloak_id: '3999fd60-80d2-477d-819e-93f6873efdb2',
  title: 'QWERTY',
  tag: 'snv_exploration_rqdm',
  type: 'filter',
  favorite: false,
  queries: [
    {
      id: '53adc865-907a-4589-87ba-cb925de6f678',
      op: 'and',
      content: [
        {
          op: 'in',
          content: {
            field: 'consequences.biotype',
            index: 'Variants',
            value: ['protein_coding'],
          },
        },
        {
          op: 'in',
          content: {
            field: 'donors.zygosity',
            index: 'Variants',
            value: ['HET', 'HEM'],
          },
        },
        {
          op: 'in',
          content: {
            field: 'donors.affected_status_code',
            index: 'Variants',
            value: ['affected'],
          },
        },
        {
          id: '32b6117d-81e1-4335-bcad-28d2544f29fd',
          op: 'and',
          content: [
            {
              op: 'in',
              content: {
                field: 'consequences.consequences',
                index: 'Variants',
                value: ['intron_variant', 'downstream_gene_variant', 'upstream_gene_variant'],
              },
            },
            {
              op: 'in',
              content: {
                field: 'variant_class',
                index: 'Variants',
                value: ['SNV', 'deletion'],
              },
            },
            {
              op: 'in',
              content: {
                field: 'chromosome',
                index: 'Variants',
                value: ['17'],
              },
            },
            {
              op: 'in',
              content: {
                field: 'donors.zygosity',
                index: 'Variants',
                value: ['HOM'],
              },
            },
          ],
          title: 'Ceci est une pilule',
        },
      ],
    },
  ],
  creation_date: '2023-07-11T23:02:00.490Z',
  updated_date: '2023-07-11T23:02:00.490Z',
};

const xxx = {
  active: '932a8a1b-e6d3-4c25-a4c2-3f750b8fd411',
  state: [
    {
      id: '32b6117d-81e1-4335-bcad-28d2544f29fd',
      op: 'and',
      content: [
        {
          id: '32b6117d-81e1-4335-bcad-28d2544f29fd',
          op: 'and',
          content: [
            {
              op: 'in',
              content: {
                field: 'consequences.consequences',
                index: 'Variants',
                value: ['intron_variant', 'downstream_gene_variant', 'upstream_gene_variant'],
              },
            },
            {
              op: 'in',
              content: {
                field: 'variant_class',
                index: 'Variants',
                value: ['SNV', 'deletion'],
              },
            },
            {
              op: 'in',
              content: {
                field: 'chromosome',
                index: 'Variants',
                value: ['17'],
              },
            },
            {
              op: 'in',
              content: {
                field: 'donors.zygosity',
                index: 'Variants',
                value: ['HOM'],
              },
            },
          ],
          title: 'Ceci est une pilule',
        },
      ],
    },
  ],
};
