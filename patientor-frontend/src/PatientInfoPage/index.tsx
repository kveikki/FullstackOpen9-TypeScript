import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Gender, Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryList from "./EntryList";

const PatientInfoPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient = (id) ? patients[id] : null;

    React.useEffect(() => {
        if (!id) return;
        const fetchPatient = async () => {
            try {
                const { data: updatedPatientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(updatedPatientFromApi));
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                } else {
                    console.error("Unknown error", e);
                }
            }
        };

        if (!patient || !patient.ssn) void fetchPatient();
    }, [dispatch]);

    if (!patient) return <div className="App"> Patient not found.</div>;

    return (
        <div className="App">
            <Typography variant="h4" style={{
                marginBottom: "0.5em",
                fontFamily: 'Helvetica Neue'
            }}>
                <b> <br />{patient.name} </b>
                {(() => {
                    if (patient.gender === Gender.Male) return (<MaleIcon />);
                    if (patient.gender === Gender.Female) return (<FemaleIcon />);
                })()}
            </Typography>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation} </div>
            <EntryList entries={patient.entries}/>
        </div>
    );
};

export default PatientInfoPage;