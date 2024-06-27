/* eslint-disable max-len */
import { gql } from '@apollo/client';

export const PATIENT_FILES_QUERY = (patientID: string) => gql`
  {
    Patient(id: "${patientID}") {
      id
      docs: DocumentReferenceList(_reference: subject) {
        id
        type @flatten {
          coding @flatten {
            type: code @first @singleton
          }
        }
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
          }
          format @flatten {
            format: code
          }
        }
      }
    }
  }
`;

export const SEARCH_PATIENT_FILES_QUERY = (searchValue: string) => gql`
  {
    taskList: TaskList(
      _filter: "(patient eq ${searchValue}) or (focus eq ${searchValue})"
    ) {
      id
      focus{
        request: resource {
          id
          basedOn @first {
            reference
          }
        }
      }
      authoredOn
      experiment: extension(
          url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/sequencing-experiment"
          ) @flatten @first {
           extension(url: "runAlias")@flatten @first{
            runAlias:valueString
          }
      }
      owner @flatten {
        owner: resource(type: Organization) {
          id
          alias @first @singleton
          contact @flatten @first @singleton {
            telecom @flatten @first @singleton {
              email: value
            }
          }
        }
      }
      output @flatten {
        valueReference @flatten {
          docs: resource(type: DocumentReference) {
            id
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
            context @flatten {
              related @first @flatten {
                sample: resource @flatten {
                  accessionIdentifier @flatten {
                   value
                  }
                }
              }
            }
            subject @flatten {
              patientReference: reference
            }
            type @flatten {
              coding @first @flatten {
                type: code
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_REQUEST_TASK_QUERY = (searchValue: string) => gql`
  {
    taskList: TaskList(
      _filter: "(focus eq ${searchValue})"
    ) {
      id
      authoredOn
      code @flatten {
              coding @first @flatten {
                type: code
              }
            }
      input {
        type{
          text
        }
        valueReference @flatten {
          sepicmen: resource(type: Specimen) {
            accessionIdentifier{
              value
            }
          }
        }
      }
      focus @flatten{
        request: resource {
          id
        }
      }
    }
  }
`;

export const SEARCH_PRESCRIPTION_FILES_QUERY = (searchValue: string) => gql`
  {
    taskList: TaskList(
      _filter: "(focus eq ${searchValue})"
    ) {
      id
      focus{
        request: resource {
          id
          basedOn @first {
            reference
          }
        }
      }
      authoredOn
      experiment: extension(
          url: "http://fhir.cqgc.ferlab.bio/StructureDefinition/sequencing-experiment"
          ) @flatten @first {
           extension(url: "runAlias")@flatten @first{
            runAlias:valueString
          }
      }
      owner @flatten {
        owner: resource(type: Organization) {
          id
          alias @first @singleton
          contact @flatten @first @singleton {
            telecom @flatten @first @singleton {
              email: value
            }
          }
        }
      }
      output @flatten {
        valueReference @flatten {
          docs: resource(type: DocumentReference) {
            id
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
            context @flatten {
              related @first @flatten {
                sample: resource @flatten {
                  accessionIdentifier @flatten {
                   value
                  }
                }
              }
            }
            subject @flatten {
              patientReference: reference
            }
            type @flatten {
              coding @first @flatten {
                type: code
              }
            }
          }
        }
      }
    }
  }
`;
