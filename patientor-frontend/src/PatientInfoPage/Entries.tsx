import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useStateValue } from "../state";

const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10
};

export const HealthCheckEntryListing = ({ entry }: { entry: HealthCheckEntry }) => {
    return (<div style={style}>
        <div> {entry.date} <MedicalServicesIcon /></div>
        <div><i> {entry.description} </i></div>
        <div> <FavoriteIcon htmlColor={colorDictionary[entry.healthCheckRating]} /></div>
        <div> diagnose by {entry.specialist}</div>
    </div>);
};

export const HospitalEntryListing = ({ entry }: { entry: HospitalEntry }) => {
    return (<div style={style}>
        <div> {entry.date} <LocalHospitalIcon /></div>
        <div><i> {entry.description} </i></div>
        <div>Discharged on: {entry.discharge.date} by {entry.specialist}</div>
    </div>);
};

export const OccupationalHealthcareEntryListing = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (<div style={style}>
        <div> {entry.date} <WorkIcon /> {entry.employerName}</div>
        <div><i> {entry.description} </i></div>
        {(entry.sickLeave)
            ? <div> Sickleave started on {entry.sickLeave.startDate} and ended on {entry.sickLeave.endDate}</div>
            : null
        }
        <div> diagnose by {entry.specialist}</div>
        <DiagnosisList codes={entry.diagnosisCodes} />
    </div>);
};

const DiagnosisList = ({ codes }: { codes: string[] | undefined }) => {
    const [{ diagnoses },] = useStateValue();

    if (!codes) return null;
    return (<ul>
        {codes.map(code => <li key={code}>{code}{(diagnoses[code]) ? ` ${diagnoses[code].name}` : ""}</li>)}
    </ul>);
};

const colorDictionary = {
    0: "#3DFF00",
    1: "#FFF200",
    2: "#FF8B00",
    3: "#FF0000"
};