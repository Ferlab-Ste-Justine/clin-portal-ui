import { makeRows } from '..';

describe('Entity: consequencesTable', () => {
  test('should take hgvsc and hgvsp after : value for AdnC and AA', () => {
    const consequences = [
      {
        node: {
          biotype: 'protein_coding',
          symbol: 'AARS1',
          vep_impact: 'MODERATE',
          consequences: ['missense_variant'],
          ensembl_gene_id: 'ENSG00000090861',
          coding_dna_change: 'c.1409A>T',
          aa_change: 'p.Ile470Asn',
          hgvsc: 'ENST00000261772.13:c.1409T>A',
          hgvsp: 'ENSP00000261772.8:p.Ile470Asn',
          strand: -1,
          canonical: true,
          conservations: {
            __typename: 'VariantsConsequencesConservations',
            phylo_p17way_primate_score: 0.85989,
          },
          refseq_mrna_id: ['NM_001605.3'],
          ensembl_transcript_id: 'ENST00000261772',
          predictions: {
            __typename: 'VariantsConsequencesPredictions',
            fathmm_pred: 'T',
            fathmm_score: null,
            cadd_score: 0.84751,
            cadd_phred: 29.6,
            dann_score: 0.46175,
            lrt_pred: 'D',
            lrt_score: 0.8433,
            revel_score: 0.87247,
            sift_score: 0.91255,
            sift_pred: 'D',
            polyphen2_hvar_score: 0.66095,
            polyphen2_hvar_pred: 'D',
            phyloP100way_vertebrate: 0.66095,
          },
          impact_score: 3,
        },
      },
    ];

    const row = [
      {
        key: '1',
        aa: 'p.Ile470Asn',
        consequences: ['missense_variant'],
        codingDna: 'c.1409T>A',
        strand: -1,
        vep: 'MODERATE',
        impact: [
          ['Sift', 'D', 0.91255],
          ['Polyphen2', 'D', 0.66095],
          ['Cadd (Raw)', null, 0.84751],
          ['Cadd (Phred)', null, 29.6],
          ['Dann', null, 0.46175],
          ['Lrt', 'D', 0.8433],
          ['Revel', null, 0.87247],
        ],
        conservation: {
          phylo_p17way_primate_score: 0.85989,
          phyloP100way_vertebrate: 0.66095,
        },
        transcript: {
          ids: ['NM_001605.3'],
          transcriptId: 'ENST00000261772',
          isCanonical: true,
        },
      },
    ];

    expect(makeRows(consequences)).toEqual(row);
  });

  test('should not take aa_change or coding_dna_change ', () => {
    const consequences = [
      {
        node: {
          biotype: 'protein_coding',
          symbol: 'AARS1',
          vep_impact: 'MODERATE',
          consequences: ['missense_variant'],
          ensembl_gene_id: 'ENSG00000090861',
          coding_dna_change: 'Coding_dna_Change Value',
          aa_change: 'aaChangeValue',
          hgvsc: 'ENST00000261772.13:c.1409T>A',
          hgvsp: 'ENSP00000261772.8:p.Ile470Asn',
          strand: -1,
          canonical: true,
          conservations: {
            __typename: 'VariantsConsequencesConservations',
            phylo_p17way_primate_score: 0.85989,
          },
          refseq_mrna_id: ['NM_001605.3'],
          ensembl_transcript_id: 'ENST00000261772',
          predictions: {
            __typename: 'VariantsConsequencesPredictions',
            fathmm_pred: 'T',
            fathmm_score: null,
            cadd_score: 0.84751,
            cadd_phred: 27.3,
            dann_score: 0.46175,
            lrt_pred: 'D',
            lrt_score: 0.8433,
            revel_score: 0.87247,
            sift_score: 0.91255,
            sift_pred: 'D',
            polyphen2_hvar_score: 0.66095,
            polyphen2_hvar_pred: 'D',
            phyloP100way_vertebrate: 0.66095,
          },
          impact_score: 3,
        },
      },
    ];

    const row = [
      {
        key: '1',
        aa: 'aaChangeValue',
        consequences: ['missense_variant'],
        codingDna: 'Coding_dna_Change Value',
        strand: -1,
        vep: 'MODERATE',
        impact: [
          ['Sift', 'D', 0.91255],
          ['Polyphen2', 'D', 0.66095],
          ['Cadd', null, 0.84751],
          ['Dann', null, 0.46175],
          ['Lrt', 'D', 0.8433],
          ['Revel', null, 0.87247],
        ],
        conservation: {
          phylo_p17way_primate_score: 0.85989,
          phyloP100way_vertebrate: 0.66095,
        },
        transcript: {
          ids: ['NM_001605.3'],
          transcriptId: 'ENST00000261772',
          isCanonical: true,
        },
      },
    ];

    expect(makeRows(consequences)).not.toEqual(row);
  });

  test('should return undefind if value null', () => {
    const consequences = [
      {
        node: {
          biotype: 'protein_coding',
          symbol: 'AARS1',
          vep_impact: 'HIGH',
          consequences: ['splice_acceptor_variant'],
          ensembl_gene_id: 'ENSG00000090861',
          coding_dna_change: null,
          aa_change: null,
          hgvsc: 'ENST00000261772.13:c.817-1G>A',
          hgvsp: null,
          strand: -1,
          canonical: true,
          conservations: {
            __typename: 'VariantsConsequencesConservations',
            phylo_p17way_primate_score: 0.4025,
          },
          refseq_mrna_id: ['NM_001605.3'],
          ensembl_transcript_id: 'ENST00000261772',
          predictions: {
            __typename: 'VariantsConsequencesPredictions',
            fathmm_pred: null,
            fathmm_score: null,
            cadd_score: 0.95873,
            cadd_phred: 29.6,
            dann_score: 0.68858,
            lrt_pred: null,
            lrt_score: null,
            revel_score: null,
            sift_score: null,
            sift_pred: null,
            polyphen2_hvar_score: null,
            polyphen2_hvar_pred: null,
            phyloP100way_vertebrate: null,
          },
          impact_score: 4,
        },
      },
    ];

    const row = [
      {
        key: '1',
        consequences: ['splice_acceptor_variant'],
        aa: undefined,
        codingDna: 'c.817-1G>A',
        strand: -1,
        vep: 'HIGH',
        impact: [
          ['Cadd (Raw)', null, 0.95873],
          ['Cadd (Phred)', null, 29.6],
          ['Dann', null, 0.68858],
        ],
        conservation: {
          phylo_p17way_primate_score: 0.4025,
          phyloP100way_vertebrate: null,
        },
        transcript: {
          ids: ['NM_001605.3'],
          transcriptId: 'ENST00000261772',
          isCanonical: true,
        },
      },
    ];

    expect(makeRows(consequences)).toEqual(row);
  });
});
