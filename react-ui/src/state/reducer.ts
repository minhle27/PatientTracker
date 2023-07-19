import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
    default:
      return state;
  }
};

export const setPatientList = (list: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST" as "SET_PATIENT_LIST",
    payload: list
  }
} 

export const addPatient = (patient: Patient) => {
  return {
    type: "ADD_PATIENT" as "ADD_PATIENT",
    payload: patient
  }
}