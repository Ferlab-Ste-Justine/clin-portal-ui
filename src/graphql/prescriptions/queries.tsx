import { gql } from '@apollo/client';

import { analysisFields } from './models/Prescription';

export const PRESCRIPTIONS_QUERY = gql`
  query PrescriptionsInformation ($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Analyses {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        edges {
          node {
            id
            patient_id
            patient_mrn
            prescription_id
            ep
            created_on
            timestamp
            requester
            prenatal
            ldm
            analysis_code
            status
          }
        }
        total
      }
      aggregations (filters: $sqon){
        ${analysisFields.map(
          (f) =>
            f +
            ' {\n          buckets {\n            key\n            doc_count\n          }\n        }',
        )}
      }
    }
  }
`;

export const PRESCRIPTIONS_SEARCH_QUERY = gql`
  query AnalysisSearch($sqon: JSON, $first: Int, $offset: Int) {
    Analyses {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            id
            patient_id
            patient_mrn
            prescription_id
            ep
            timestamp
            requester
            ldm
            analysis_code
          }
        }
        total
      }
    }
  }
`;

const ANALYSIS_PATIENT_FRAGMENT = (requestId: string) => gql`
  fragment PatientFields on Patient {
    id
    gender
    identifier(fhirpath: "type.coding.code = 'MR'") @flatten @first {
      mrn: value
    }
    person: PersonList(_reference: patient) {
      id
      name {
        family
        given @first
      }
      birthdate: birthDate
      identifier(fhirpath: "type.coding.code = 'JHN'") @flatten @first {
        ramq: value
      }
    }
    requests: ServiceRequestList(_reference: patient, based_on: "${requestId}") {
      id
      authoredOn
      specimen {
        reference
        resource {
          parent {
            reference
          }
          accessionIdentifier {
            system
            value
          }
        }
      }
      requester @flatten {
        requester: resource(type: PractitionerRole) {
          practitioner @flatten {
            practitioner: resource(type: Practitioner){
              id
              name @first{
                family
                given
              }
            }
          
          }
        }
      }
      status
    }
    clinicalImpressions: ClinicalImpressionList(_reference: patient) {
      id
      resourceType
      investigation {
        item {
          reference
          item: resource(type: Observation) {
            id
            resourceType
            code {
              coding @first {
                code
              }
            }
            interpretation @first {
              coding @first {
                code
              }
            }
          }
        }
      }
    }
  }
`;

export const ANALYSIS_ENTITY_QUERY = (requestId: string) => gql`
  ${ANALYSIS_PATIENT_FRAGMENT(requestId)}
  query GetAnalysisEntity($requestId: String = "${requestId}") {
    ServiceRequest(id: $requestId) {
      id
      authoredOn
      status
      note @first{
        text
      }
      code @flatten {
        coding(system: "http://fhir.cqgc.ferlab.bio/CodeSystem/analysis-request-code")
          @flatten
          @first {
          code
        }
      }
      performer @first {
        resource {
          alias @first
          name
        }
      }
      requester @flatten {
        requester: resource(type: PractitionerRole) {
          id
          organization {
            reference
          }
          practitioner @flatten {
            practitioner: resource(type: Practitioner){
              id
              name @first{
                family
                given
              }
              identifier @first {
                value
              }
            }
          
          }
        }
      }
      supportingInfo @first @flatten {
        observation: resource {
          id
          status
          investigation @first {
            item  @flatten{
              item: resource(type: Observation) {
                id
                resourceType
                code @first @flatten{
                  coding @first{
                    code
                  }
                }
                category{
                  coding{
                    code
                  }
                }
              }
              item: resource(type: "FamilyMemberHistory") {
                id
                resourceType
              }
              
            }
          }
        }
  
      }
      orderDetail @first{
        text
      }
      basedOn @first {
        reference
      }
      subject {
        reference
        resource {
          ...PatientFields
        }
      }
      extensions: extension(url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/family-member") {
        extension(url: "parent-relationship") {
          valueCoding {
            coding {
              code
            }
          }
        }
        extension(url: "parent") {
          valueReference {
            reference
            resource {
              ...PatientFields
            }
          }
        }
      }
    }
  }
`;

export const ANALYSIS_TASK_QUERY = (taskId: string) => gql`
  query GetAnalysisEntity($taskId: String = "${taskId}") {
    Task(id: $taskId){
      id
      authoredOn
      code {
        coding @first @flatten{
          system
          code
        }
      }
      focus @flatten {
        serviceRequestReference: reference
      }
      for @flatten{
        patientReference: reference  
      }
      owner @flatten {
        ownerReference: reference
      }
      requester @flatten {
        requester: resource(type: Organization) {
          id
          alias @first @singleton
          contact @flatten @first @singleton {
            telecom(fhirpath: "system='email'") @flatten @first @singleton {
              email: value
            }
          }
        }
      }
      workflow: extension(url:"http://fhir.cqgc.ferlab.bio/StructureDefinition/workflow") @first{
        extension(url:"workflowName") @first @flatten{
            name: value
        }
        extension(url:"workflowVersion") @first @flatten{
            version: value
        }        
        extension(url:"genomeBuild") @first @flatten{
            valueCoding @flatten{ genomeBuild:code}
        }                
    }
    experiment: extension(url:"http://fhir.cqgc.ferlab.bio/StructureDefinition/sequencing-experiment") @first{
        extension(url:"runName") @first @flatten{
            name: value
        }
        extension(url:"runAlias") @first @flatten{
            alias: value
        }       
        extension(url:"experimentalStrategy") @first @flatten{
            valueCoding @flatten{ experimentalStrategy:code}
        }    
        extension(url:"platform") @first @flatten{
            platform: value
        }   
        extension(url:"captureKit") @first @flatten{
            captureKit: value
        }   
        extension(url:"sequencerId") @first @flatten{
            sequencerId: value
        }   
        extension(url:"runDate") @first @flatten{
            runDate: value
        }         
        extension(url:"labAliquotId") @first @flatten{
            aliquotId: value
        }                 
                                                   
    }  
     input @flatten {
	    valueReference @flatten {
		    sample: resource(type: Specimen) {
          id
          accessionIdentifier@flatten {
              value
          }
          type @flatten {
              coding @first @flatten{
                  display
                  code
              }
          }
          parent {
            resource{
              id
              accessionIdentifier@flatten {
                value
            }
              type @flatten {
                coding @first @flatten{
                  display
                  code
                }
              }   
              collection @flatten @first{
                bodySite @flatten{
                  value
                }
              }                     
            }
          }
        }
      }
    }        
    output @flatten {
	    valueReference @flatten {
		    docs: resource(type: DocumentReference) {
          context @flatten
          {
            related@first @flatten {
              sample:resource @flatten {
                accessionIdentifier @flatten{value}
              }
            }
          }
          content {
					  attachment {
						  url
              hash
              title
              size: extension(url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/full-size") @flatten @first{ 
                size:value
              } 
		  		   }
             format @flatten {
              format: code
             }
				  }

          type @flatten {
            coding @flatten {
              type: code @first @singleton
            }
          }
				}
      }
    }
  }
}
`;

export const ANALYSE_CODESYSTEME = (id: string) => gql`
  query GetCodeSystemEntity($id: String = "${id}") {
    CodeSystem(id: $id) {
      concept {
        code
        display
        designation {
          value
          language
        }
      }
    }
  }
`;

export const ANALYSE_ETH_OBSERVATION = (id: string) => gql`
  query GetETHNObservation($id: String = "${id}") {
    Observation(id: $id) {
      id
      valueCodeableConcept{
        coding @first{
          code
          display
          system
        }
      }
    }
  }
`;

export const ANALYSE_CON_OBSERVATION = (id: string) => gql`
  query GetConsanguinityObservation($id: String = "${id}") {
    Observation(id: $id) {
      id
      valueBoolean
    }
  }
`;

export const ANALYSE_PHENOTYPE_OBSERVATION = (ids: string[]) => gql`
    query getPhenotypeObservation {
        ${ids.map(
          (id) => `
            Observation(id: "${id}") {
              id
              extension: extension(url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/age-at-onset") @first {
                valueCoding {
                  code
                }
              }
              valueCodeableConcept{
                coding @first{
                  code
                }
              }
              interpretation @first{
                coding @first{
                  code
                }
              }
            }
        `,
        )}
    }
`;

export const ANALYSE_GENERALOBS_INDICATION_OBSERVATION = (id: string) => gql`
  query GetGeneralObservationObservation($id: String = "${id}") {
    Observation(id: $id) {
      id
      valueString
    }
  }
`;

export const ANALYSE_PARACLINIQUE_OBSERVATION = (ids: string[] | null) => gql`
    query getParacliniqueObservation {
        ${
          ids
            ? ids.map(
                (id) => `
            Observation(id: "${id}")
              {
              id
              code @flatten{
                coding @first @flatten{
                  code
                } 
              }
              category @first @flatten{
                  coding @first @flatten{
                    category: code 
                  }
                }
              interpretation @first{
                coding @first{
                  code
                }
              }
              valueString
            }
        `,
              )
            : null
        }
    }
`;

export const ANALYSE_COMPLEX_PARACLINIQUE_OBSERVATION = (ids: string[] | null) => gql`
    query getParacliniqueObservation {
        ${
          ids
            ? ids.map(
                (id) => `
            Observation(id: "${id}")
              {
              id
              code @flatten{
                coding @first @flatten{
                  code
                } 
              }
              interpretation @first{
                coding @first{
                  code
                }
              }
              valueCodeableConcept{
                coding{
                  code
                }
              }
            }
        `,
              )
            : null
        }
    }
`;

export const ANALYSE_FMH = (ids: string[]) => gql`
    query getParacliniqueObservation {
        ${ids.map(
          (id) => `
            FamilyMemberHistory(id: "${id}") {
              id
              relationship{
                  coding{
                    code
                  }
                }
                note @first{
                  text
                }
            }
        `,
        )}
    }
`;
