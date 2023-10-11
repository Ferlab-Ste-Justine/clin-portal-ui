import intl from 'react-intl-universal';
import { IAssignmentsDictionary } from '@ferlab/ui/core/components/Assignments/types';
import { IDictionary as FiltersDict } from '@ferlab/ui/core/components/filters/types';
import { IProTableDictionary } from '@ferlab/ui/core/components/ProTable/types';
import { IDictionary as QueryBuilderDict } from '@ferlab/ui/core/components/QueryBuilder/types';

import { GetAnalysisNameByCode } from 'store/global/types';

import { dictionaries } from '../graphql/utils/dictionaries';

import { formatNumber } from './formatNumber';

export const getFiltersDictionary = (): FiltersDict => ({
  actions: {
    all: intl.get('querybuilder.filters.actions.all'),
    apply: intl.get('querybuilder.filters.actions.apply'),
    clear: intl.get('querybuilder.filters.actions.clear'),
    less: intl.get('querybuilder.filters.actions.less'),
    more: intl.get('querybuilder.filters.actions.more'),
    none: intl.get('querybuilder.filters.actions.none'),
    dictionary: intl.get('querybuilder.filters.actions.dictionary'),
  },
  // @ts-ignore
  checkBox: {
    searchPlaceholder: intl.get('querybuilder.filters.checkbox.placeholder'),
  },
  messages: {
    errorNoData: intl.get('querybuilder.filters.messages.empty'),
  },
  range: {
    max: intl.get('querybuilder.filters.range.max'),
    min: intl.get('querybuilder.filters.range.min'),
    noData: intl.get('querybuilder.filters.range.noData'),
    from: intl.get('querybuilder.filters.range.from'),
    to: intl.get('querybuilder.filters.range.to'),
    actualInterval: intl.get('querybuilder.filters.range.actualInterval'),
  },
  operators: {
    lessThan: intl.get('querybuilder.filters.operators.lessthan'),
    lessThanOfEqual: intl.get('querybuilder.filters.operators.lessthanorequal'),
    greaterThan: intl.get('querybuilder.filters.operators.greaterthan'),
    greaterThanOrEqual: intl.get('querybuilder.filters.operators.greaterthanorequal'),
    between: intl.get('querybuilder.filters.operators.between'),
    anyOf: intl.get('querybuilder.filters.operators.anyOf'),
    allOf: intl.get('querybuilder.filters.operators.allOf'),
    noneOf: intl.get('querybuilder.filters.operators.noneOf'),
  },
});

export const getProTableDictionary = (): IProTableDictionary => ({
  tooltips: {
    tableExport: intl.get('protable.tooltips.export'),
  },
  itemCount: {
    results: intl.get('protable.results'),
    noResults: intl.get('protable.noResults'),
    of: intl.get('protable.of'),
    selected: intl.get('protable.selected'),
    selectedPlural: intl.get('protable.selectedPlural'),
    selectAllResults: intl.get('protable.selectAllResults'),
    clear: intl.get('protable.clear'),
  },
  columnSelector: {
    reset: intl.get('protable.reset'),
    tooltips: {
      columns: intl.get('protable.columns'),
    },
  },
  numberFormat: formatNumber,
  pagination: {
    first: intl.get('global.proTable.pagination.first'),
    previous: intl.get('previous'),
    next: intl.get('next'),
    view: intl.get('view'),
  },
  table: {
    emptyText: intl.get('no.results.found'),
  },
});

export const getAssignmentDictionary = (): IAssignmentsDictionary => ({
  select: {
    actions: {
      clear: intl.get('assignment.dropdown.actions.clear'),
    },
    textInfo: {
      searchPlaceholder: intl.get('assignment.dropdown.select.searchPlaceholder'),
      notAssigned: intl.get('assignment.dropdown.select.notAssign'),
    },
  },
  filter: {
    actions: {
      reset: intl.get('assignment.filter.actions.reset'),
      filter: intl.get('assignment.filter.actions.ok'),
    },
    textInfo: {
      searchPlaceholder: intl.get('assignment.dropdown.select.searchPlaceholder'),
    },
  },
});

const buildMap = (key: string): { string: string } =>
  dictionaries[key].reduce(
    (a: any, v: string) => ({
      ...a,
      [v]: v
        .replace('_variant', '')
        .replace('_', ' ')
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        .trim(),
    }),
    {},
  );
export const getQueryBuilderDictionary = (
  facetResolver: (key: string) => React.ReactNode,
  getAnalysisNameByCode: GetAnalysisNameByCode,
): QueryBuilderDict => {
  const analysisMap = {
    MITN: getAnalysisNameByCode('MITN'),
    DYSTM: getAnalysisNameByCode('DYSTM'),
    MYOPC: getAnalysisNameByCode('MYOPC'),
    DI: getAnalysisNameByCode('DI'),
    RHAB: getAnalysisNameByCode('RHAB'),
    MYASC: getAnalysisNameByCode('MYASC'),
    MMG: getAnalysisNameByCode('MMG'),
    HYPM: getAnalysisNameByCode('HYPM'),
  };

  return {
    queryBuilderHeader: {
      manageFilters: {
        modalTitle: intl.get('querybuilder.header.myFiltersDropdown.manageMyFilter'),
        okText: intl.get('close'),
        lastSavedAt: intl.get('querybuilder.header.manageFilters.lastSaved'),
      },
      modal: {
        edit: {
          title: intl.get('querybuilder.header.modal.edit.title'),
          okText: intl.get('querybuilder.header.modal.edit.okText'),
          cancelText: intl.get('querybuilder.header.modal.edit.cancelText'),
          content: '',
          input: {
            label: intl.get('querybuilder.header.modal.edit.input.label'),
            placeholder: intl.get('querybuilder.header.modal.edit.input.placeholder'),
            maximumLength: intl.get('querybuilder.header.modal.edit.input.maximumLength'),
          },
        },
        saveThisFilter: intl.get('querybuilder.header.modal.saveThisFilter'),
        confirmUnsaved: {
          title: intl.get('querybuilder.header.modal.confirmUnsaved.title'),
          openSavedFilter: {
            okText: intl.get('querybuilder.header.modal.confirmUnsaved.openSavedFilter.okText'),
            cancelText: intl.get(
              'querybuilder.header.modal.confirmUnsaved.openSavedFilter.cancelText',
            ),
            content: intl.get('querybuilder.header.modal.confirmUnsaved.openSavedFilter.content'),
          },
          createNewFilter: {
            okText: intl.get('querybuilder.header.modal.confirmUnsaved.createNewFilter.okText'),
            cancelText: intl.get(
              'querybuilder.header.modal.confirmUnsaved.createNewFilter.cancelText',
            ),
            content: intl.get('querybuilder.header.modal.confirmUnsaved.createNewFilter.content'),
          },
        },
      },
      popupConfirm: {
        delete: {
          title: intl.get('querybuilder.header.popupConfirm.delete.title'),
          okText: intl.get('querybuilder.header.popupConfirm.delete.okText'),
          cancelText: intl.get('querybuilder.header.popupConfirm.delete.cancelText'),
          content: intl.get('querybuilder.header.popupConfirm.delete.content'),
        },
      },
      tooltips: {
        newQueryBuilder: intl.get('querybuilder.header.tooltips.newQueryBuilder'),
        save: intl.get('querybuilder.header.tooltips.save'),
        saveChanges: intl.get('querybuilder.header.tooltips.saveChanges'),
        delete: intl.get('querybuilder.header.tooltips.delete'),
        duplicateQueryBuilder: intl.get('querybuilder.header.tooltips.duplicateQueryBuilder'),
        share: intl.get('querybuilder.header.tooltips.share'),
        setAsDefaultFilter: intl.get('querybuilder.header.tooltips.setAsDefaultFilter'),
        unsetDefaultFilter: intl.get('querybuilder.header.tooltips.unsetDefaultFilter'),
        undoChanges: intl.get('querybuilder.header.tooltips.undoChanges'),
        noSavedFilters: intl.get('querybuilder.header.tooltips.noSavedFilters'),
      },
      myFiltersDropdown: {
        title: intl.get('querybuilder.header.myFiltersDropdown.title'),
        manageMyFilter: intl.get('querybuilder.header.myFiltersDropdown.manageMyFilter'),
      },
      duplicateFilterTitleSuffix: intl.get('querybuilder.header.duplicateFilterTitleSuffix'),
    },
    query: {
      combine: {
        and: intl.get('querybuilder.query.combine.and'),
        or: intl.get('querybuilder.query.combine.or'),
      },
      noQuery: intl.get('querybuilder.query.noQuery'),
      facet: facetResolver,
      facetValueMapping: {
        'donors.analysis_code': analysisMap,
        panels: analysisMap,
        'consequences.predictions.fathmm_pred': {
          T: intl.get('filters.options.consequences.predictions.fathmm_pred.T'),
          D: intl.get('filters.options.consequences.predictions.fathmm_pred.D'),
        },
        'consequences.predictions.polyphen2_hvar_pred': {
          B: intl.get('filters.options.consequences.predictions.polyphen2_hvar_pred.B'),
          D: intl.get('filters.options.consequences.predictions.polyphen2_hvar_pred.D'),
          P: intl.get('filters.options.consequences.predictions.polyphen2_hvar_pred.P'),
        },
        'consequences.predictions.sift_pred': {
          T: intl.get('filters.options.consequences.predictions.sift_pred.T'),
          D: intl.get('filters.options.consequences.predictions.sift_pred.D'),
        },
        'consequences.predictions.lrt_pred': {
          N: intl.get('filters.options.consequences.predictions.lrt_pred.N'),
          U: intl.get('filters.options.consequences.predictions.lrt_pred.U'),
          D: intl.get('filters.options.consequences.predictions.lrt_pred.D'),
        },
        chromosome: {
          true: '1',
        },
        'donors.parental_origin': {
          both: intl.get('filters.options.donors.parental_origin.both'),
          possible_denovo: intl.get('filters.options.donors.parental_origin.possible_denovo'),
          denovo: intl.get('filters.options.donors.parental_origin.denovo'),
        },
        'consequences.consequences': buildMap('consequences.consequences'),
        'donors.gender': {
          Male: intl.get(`sex.male`),
          Female: intl.get(`sex.female`),
          unknown: intl.get(`sex.unknown`),
          Other: intl.get(`sex.other`),
        },
        'donors.affected_status_code': {
          affected: intl.get('donors.status.affected'),
          not_affected: intl.get('donors.status.not_affected'),
          unknown: intl.get('unknown'),
        },
        'donors.bioinfo_analysis_code': {
          TEBA: intl.get('filters.options.donors.bioinfo_analysis_code.TEBA'),
          TNBA: intl.get('filters.options.donors.bioinfo_analysis_code.TNBA'),
        },
        'donors.exomiser.acmg_classification': {
          PATHOGENIC: intl.get('filters.options.donors.exomiser.acmg_classification.PATHOGENIC'),
          LIKELY_PATHOGENIC: intl.get(
            'filters.options.donors.exomiser.acmg_classification.LIKELY_PATHOGENIC',
          ),
          UNCERTAIN_SIGNIFICANCE: intl.get(
            'filters.options.donors.exomiser.acmg_classification.UNCERTAIN_SIGNIFICANCE',
          ),
          LIKELY_BENIGN: intl.get(
            'filters.options.donors.exomiser.acmg_classification.LIKELY_BENIGN',
          ),
          BENIGN: intl.get('filters.options.donors.exomiser.acmg_classification.BENIGN'),
        },
        'cmc.tier': {
          1: intl.get('filters.options.cmc.tier.1'),
          2: intl.get('filters.options.cmc.tier.2'),
          3: intl.get('filters.options.cmc.tier.3'),
          Other: intl.get('filters.options.cmc.tier.Other'),
        },
      },
    },
    actions: {
      new: intl.get('querybuilder.actions.new'),
      addQuery: intl.get('querybuilder.actions.addQuery'),
      combine: intl.get('querybuilder.actions.combine'),
      labels: intl.get('querybuilder.actions.labels'),
      changeOperatorTo: intl.get('querybuilder.actions.changeOperatorTo'),
      delete: {
        title: intl.get('querybuilder.actions.delete.title'),
        cancel: intl.get('querybuilder.actions.delete.cancel'),
        confirm: intl.get('querybuilder.actions.delete.confirm'),
      },
      clear: {
        title: intl.get('querybuilder.actions.clear.title'),
        cancel: intl.get('querybuilder.actions.clear.cancel'),
        confirm: intl.get('querybuilder.actions.clear.confirm'),
        buttonTitle: intl.get('querybuilder.actions.clear.buttonTitle'),
        description: intl.get('querybuilder.actions.clear.description'),
      },
      saveCustomPill: {
        form: {
          error: {
            fieldRequired: intl.get('querybuilder.actions.saveCustomPill.form.error.required'),
            nameAlreadyExists: intl.get(
              'querybuilder.actions.saveCustomPill.error.nameAlreadyExist',
            ),
            invalidFormat: intl.get('querybuilder.actions.saveCustomPill.error.invalidFormat'),
          },
        },
        input: {
          label: intl.get('querybuilder.actions.saveCustomPill.input.label'),
          placeholder: intl.get('querybuilder.actions.saveCustomPill.input.placeholder'),
          maximumLength: intl.get('querybuilder.actions.saveCustomPill.input.maximumLength'),
        },
        modal: {
          title: intl.get('querybuilder.actions.saveCustomPill.modal.title'),
          okText: intl.get('querybuilder.actions.saveCustomPill.modal.save'),
          cancelText: intl.get('querybuilder.actions.saveCustomPill.modal.cancel'),
          message: intl.get('querybuilder.actions.saveCustomPill.modal.message'),
        },
        tooltip: {
          enabled: intl.get('querybuilder.actions.saveCustomPill.tooltip.enabled'),
          disabled: intl.get('querybuilder.actions.saveCustomPill.tooltip.disabled'),
        },
      },
    },
  };
};

export const getFacetsDictionarySNV = () => ({
  chromosome: intl.get('filters.group.chromosome'),
  clinvar: {
    clin_sig: intl.get('filters.group.clinvar.clin_sig'),
  },
  consequences: {
    biotype: intl.get('filters.group.consequences.biotype'),
    consequences: intl.get('filters.group.consequences.consequences'),
    predictions: {
      cadd_phred: intl.get('filters.group.consequences.predictions.cadd_phred'),
      cadd_score: intl.get('filters.group.consequences.predictions.cadd_score'),
      dann_score: intl.get('filters.group.consequences.predictions.dann_score'),
      fathmm_pred: intl.get('filters.group.consequences.predictions.fathmm_pred'),
      lrt_pred: intl.get('filters.group.consequences.predictions.lrt_pred'),
      polyphen2_hvar_pred: intl.get('filters.group.consequences.predictions.polyphen2_hvar_pred'),
      revel_score: intl.get('filters.group.consequences.predictions.revel_score'),
      sift_pred: intl.get('filters.group.consequences.predictions.sift_pred'),
    },
    vep_impact: intl.get('filters.group.consequences.vep_impact'),
  },
  cmc: {
    sample_mutated: intl.get('filters.group.cmc.sample_mutated'),
    sample_ratio: intl.get('filters.group.cmc.sample_ratio'),
    tier: intl.get('filters.group.cmc.tier'),
  },
  donors: {
    ad_alt: intl.get('filters.group.donors.ad_alt'),
    ad_ratio: intl.get('filters.group.donors.ad_ratio'),
    ad_total: intl.get('filters.group.donors.ad_total'),
    sq: intl.get('filters.group.donors.sq'),
    affected_status_code: intl.get('filters.group.donors.affected_status_code'),
    analysis_code: intl.get('filters.group.donors.analysis_code'),
    bioinfo_analysis_code: intl.get('filters.group.donors.bioinfo_analysis_code'),
    exomiser: {
      acmg_classification: intl.get('filters.group.donors.exomiser.acmg_classification'),
      acmg_evidence: intl.get('filters.group.donors.exomiser.acmg_evidence'),
      gene_combined_score: intl.get('filters.group.donors.exomiser.gene_combined_score'),
    },
    father_zygosity: intl.get('filters.group.donors.father_zygosity'),
    filters: intl.get('filters.group.donors.filters'),
    gender: intl.get('filters.group.donors.gender'),
    gq: intl.get('filters.group.donors.gq'),
    is_hc: intl.get('filters.group.donors.is_hc'),
    is_possibly_hc: intl.get('filters.group.donors.is_possibly_hc'),
    mother_zygosity: intl.get('filters.group.donors.mother_zygosity'),
    qd: intl.get('filters.group.donors.qd'),
    parental_origin: intl.get('filters.group.donors.parental_origin'),
    transmission: intl.get('filters.group.donors.transmission'),
    zygosity: intl.get('filters.group.donors.zygosity'),
  },
  external_frequencies: {
    gnomad_genomes_2_1_1: {
      af: intl.get('filters.group.external_frequencies.gnomad_genomes_2_1_1.af'),
    },
    gnomad_genomes_3_0: {
      af: intl.get('filters.group.external_frequencies.gnomad_genomes_3_0.af'),
    },
    gnomad_genomes_3_1_1: {
      af: intl.get('filters.group.external_frequencies.gnomad_genomes_3_1_1.af'),
      ac: intl.get('filters.group.external_frequencies.gnomad_genomes_3_1_1.ac'),
    },
    gnomad_exomes_2_1_1: {
      af: intl.get('filters.group.external_frequencies.gnomad_exomes_2_1_1.af'),
    },
    topmed_bravo: {
      af: intl.get('filters.group.external_frequencies.topmed_bravo.af'),
    },
    thousand_genomes: {
      af: intl.get('filters.group.external_frequencies.thousand_genomes.af'),
    },
  },
  frequency_RQDM: {
    total: {
      af: intl.get('filters.group.frequency_RQDM.total.af'),
    },
    affected: {
      af: intl.get('filters.group.frequency_RQDM.affected.af'),
    },
    non_affected: {
      af: intl.get('filters.group.frequency_RQDM.non_affected.af'),
    },
  },
  genes: {
    cosmic: {
      tumour_types_germline: intl.get('filters.group.genes.cosmic.tumour_types_germline'),
    },
    ddd: {
      disease_name: intl.get('filters.group.genes.ddd.disease_name'),
    },
    gnomad: {
      pli: intl.get('filters.group.genes.gnomad.pli'),
      loeuf: intl.get('filters.group.genes.gnomad.loeuf'),
    },
    hpo: {
      hpo_term_label: intl.get('filters.group.genes.hpo.hpo_term_label'),
    },
    omim: {
      name: intl.get('filters.group.genes.omim.name'),
      inheritance_code: intl.get('filters.group.genes.omim.inheritance_code'),
    },
    orphanet: {
      panel: intl.get('filters.group.genes.orphanet.panel'),
    },
    panels: intl.get('filters.group.genes.panels'),
    spliceai: {
      ds: intl.get('filters.group.genes.spliceai.ds'),
    },
  },
  gene_external_reference: intl.get('filters.group.gene_external_reference'),
  hotspot: intl.get('filters.group.hotspot'),
  panels: intl.get('filters.group.panels'),
  start: intl.get('filters.group.start'),
  variant_class: intl.get('filters.group.variant_class'),
  variant_external_reference: intl.get('filters.group.variant_external_reference'),
  tooltips: {
    consequences: {
      predictions: {
        cadd_phred: intl.get('filters.group.consequences.predictions.cadd_phred.tooltip'),
        cadd_score: intl.get('filters.group.consequences.predictions.cadd_score.tooltip'),
        dann_score: intl.get('filters.group.consequences.predictions.dann_score.tooltip'),
      },
    },
    cmc: {
      sample_mutated: intl.get('filters.group.cmc.sample_mutated.tooltip'),
      sample_ratio: intl.get('filters.group.cmc.sample_ratio.tooltip'),
      tier: intl.get('filters.group.cmc.tier.tooltip'),
    },
    donors: {
      ad_alt: intl.get('filters.group.donors.ad_alt.tooltip'),
      ad_ratio: intl.get('filters.group.donors.ad_ratio.tooltip'),
      ad_total: intl.get('filters.group.donors.ad_total.tooltip'),
      exomiser: {
        gene_combined_score: intl.get('filters.group.donors.exomiser.gene_combined_score.tooltip'),
      },
      gq: intl.get('filters.group.donors.gq.tooltip'),
      qd: intl.get('filters.group.donors.qd.tooltip'),
      transmission: intl.get('filters.group.donors.transmission.tooltip'),
    },
    external_frequencies: {
      gnomad_genomes_2_1_1: {
        af: intl.get('filters.group.external_frequencies.gnomad_genomes_2_1_1.af.tooltip'),
      },
      gnomad_genomes_3_0: {
        af: intl.get('filters.group.external_frequencies.gnomad_genomes_3_0.af.tooltip'),
      },
      gnomad_genomes_3_1_1: {
        af: intl.get('filters.group.external_frequencies.gnomad_genomes_3_1_1.af.tooltip'),
      },
      topmed_bravo: {
        af: intl.get('filters.group.external_frequencies.topmed_bravo.af.tooltip'),
      },
      thousand_genomes: {
        af: intl.get('filters.group.external_frequencies.thousand_genomes.af.tooltip'),
      },
    },
    frequency_RQDM: {
      total: {
        af: intl.get('filters.group.frequency_RQDM.total.af.tooltip'),
      },
      affected: {
        af: intl.get('filters.group.frequency_RQDM.affected.af.tooltip'),
      },
      non_affected: {
        af: intl.get('filters.group.frequency_RQDM.non_affected.af.tooltip'),
      },
    },
    hotspot: intl.get('filters.group.hotspot.tooltip'),
    genes: {
      omim: {
        inheritance_code: intl.get('filters.group.genes.omim.inheritance_code.tooltip'),
      },
    },
  },
});

export const getFacetsDictionaryCNV = () => ({
  chromosome: intl.get('filters.group.chromosome'),
  end: intl.get('cnv.filters.group.end'),
  genes: {
    cosmic: {
      tumour_types_germline: intl.get('filters.group.genes.cosmic.tumour_types_germline'),
    },
    ddd: {
      disease_name: intl.get('filters.group.genes.ddd.disease_name'),
    },
    omim: {
      name: intl.get('filters.group.genes.omim.name'),
    },
    orphanet: {
      panel: intl.get('filters.group.genes.orphanet.panel'),
    },
    hpo: {
      hpo_term_label: intl.get('filters.group.genes.hpo.hpo_term_label'),
    },
    panels: intl.get('filters.group.genes.panels'),
  },
  filters: intl.get('cnv.filters.group.filters'),
  qual: intl.get('cnv.filters.group.qual'),
  reflen: intl.get('cnv.filters.group.reflen'),
  start: intl.get('cnv.filters.group.start'),
  type: intl.get('cnv.filters.group.type'),
});
