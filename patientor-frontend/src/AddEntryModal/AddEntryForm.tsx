import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, DiagnosisSelection, HealtcheckRatingOption } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export type HealthCheckEntryValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckEntryValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealtcheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      type: "HealthCheck",
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={ values =>{
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (values.type != "HealthCheck") {
        errors.type = requiredError;
      }
      if (!Object.values(HealthCheckRating).includes(values.healthCheckRating)){
        errors.healthCheckRating = requiredError;
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
        <Field
          label="Description"
          placeholder="..."
          name="description"
          component={TextField}
        />
        <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      /><Field
      label="Specialst"
      placeholder="Specialist"
      name="specialist"
      component={TextField}
    />
    <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          /> <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Form>
      );
    }}
  </Formik>
  );
};

export default AddHealthCheckEntryForm;