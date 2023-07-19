import { useRef } from "react";
import { Diagnosis, EntryFormValues, NewEntry } from "../../../types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ResetRef } from "../../AddPatientModal/FormField";
import {
  FormikSelect,
  TextField,
  DiagnosisSelection,
  FormikInputDate,
} from "../../AddPatientModal/FormField";

import { Button, Grid, InputLabel, MenuItem } from "@mui/material";

type Props = {
  diagnoses: Diagnosis[];
  submitEntry: (values: NewEntry) => void;
};

const AddEntryForm = ({ diagnoses, submitEntry }: Props) => {
  const codesFieldRef = useRef<ResetRef>(null);

  const onSubmit = (
    values: EntryFormValues,
    actions: FormikHelpers<EntryFormValues>
  ) => {

    const common = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes,
    };

    if (values.type === "HealthCheck") {
      const object: NewEntry = {
        ...common,
        type: values.type,
        healthCheckRating: Number(values.rating),
      };
      console.log(object);
      submitEntry(object);
    } else if (values.type === "OccupationalHealthcare") {
      const sickLeave =
        values.sickLeaveStart.length > 0 && values.sickLeaveEnd.length > 0
          ? {
              startDate: values.sickLeaveStart,
              endDate: values.sickLeaveEnd,
            }
          : undefined;
      const object: NewEntry = {
        ...common,
        type: values.type,
        employerName: values.employerName,
        sickLeave: sickLeave,
      };
      console.log(object);
      submitEntry(object);
    } else if (values.type === "Hospital") {
      const discharge =
        values.dischargeDate.length > 0 && values.dischargeCriteria.length > 0
          ? {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria,
            }
          : undefined;

      const object: NewEntry = {
        ...common,
        type: values.type,
        discharge,
      };
      
      console.log(object);
      submitEntry(object);
    }
    actions.resetForm();
    codesFieldRef.current?.reset();
  };

  const style = {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderStyle: "solid",
  };

  const typeOptions = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  const healthCheckOptions = ["0", "1", "2", "3"];

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        rating: "",
        diagnosisCodes: [],
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickLeaveStart: "",
        sickLeaveEnd: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui" style={style}>
            <InputLabel>Entry type</InputLabel>
            <Field
              fullWidth
              style={{ marginBottom: "0.5em" }}
              label="Type"
              component={FormikSelect}
              name="type"
            >
              {typeOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>
            <div style={{ marginBottom: 10 }} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <div style={{ marginBottom: 10 }} />
            <InputLabel>Date</InputLabel>
            <Field name="date" component={FormikInputDate} />
            <div style={{ marginBottom: 15 }} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <div style={{ marginBottom: 15 }} />
            <InputLabel>Diagnosis codes</InputLabel>
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              ref={codesFieldRef}
            />
            <div style={{ marginBottom: 15 }} />
            {values.type === "HealthCheck" && (
              <div>
                <InputLabel style={{ marginTop: 20 }}>
                  Health check rating
                </InputLabel>
                <Field
                  fullWidth
                  style={{ marginBottom: "0.5em" }}
                  label="Rating"
                  component={FormikSelect}
                  name="rating"
                >
                  {healthCheckOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Field>
              </div>
            )}
            {values.type === "Hospital" && (
              <div>
                <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
                <div style={{ marginLeft: 10 }}>
                  <InputLabel>Date</InputLabel>
                  <Field name="dischargeDate" component={FormikInputDate} />
                  <div style={{ marginBottom: 15 }} />
                  <Field
                    label="Condition"
                    placeholder="Condition"
                    name="dischargeCriteria"
                    component={TextField}
                  />
                </div>
              </div>
            )}
            {values.type === "OccupationalHealthcare" && (
              <div>
                <Field
                  label="Employer"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
                <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
                <div style={{ marginLeft: 10 }}>
                  <InputLabel style={{ marginTop: 20 }}>start</InputLabel>
                  <Field name="sickLeaveStart" component={FormikInputDate} />
                  <InputLabel style={{ marginTop: 20 }}>end</InputLabel>
                  <Field name="sickLeaveEnd" component={FormikInputDate} />
                </div>
              </div>
            )}
            <div style={{ margin: 20 }} />

            <Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <div style={{ margin: 60 }} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
