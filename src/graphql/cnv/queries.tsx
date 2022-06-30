import { gql } from '@apollo/client';

export const CNV_QUERY = gql`
  query getCnv($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    cnv {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            chromosome
            start
            end
            name
            svlen
            cn
            number_genes
            filters
            sm
            bc
            pe
            patient_id
          }
        }
      }
    }
  }
`;
