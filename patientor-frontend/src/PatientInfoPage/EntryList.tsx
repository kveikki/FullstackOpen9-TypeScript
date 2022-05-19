import { Typography } from "@material-ui/core";
import { Entry } from "../types";
import { assertNever } from "../utils";
import {HealthCheckEntryListing, HospitalEntryListing, OccupationalHealthcareEntryListing } from "./Entries";

const EntryList = ({ entries }: { entries: Entry[] }) => {
    if (!entries || entries.length === 0) return null;

    const getEntrySpecifics = ( entry: Entry ) => {
        switch (entry.type) {
            case "HealthCheck":
                return <HealthCheckEntryListing entry={entry}/>;
            case "Hospital":
                return <HospitalEntryListing entry={entry}/>;
            case "OccupationalHealthCare":
                return <OccupationalHealthcareEntryListing entry={entry}/>;
            default:
                assertNever(entry);
        }
        return null;
    };

    return <div>
        <Typography variant="h6" style={{
            marginBottom: "0.5em",
            fontFamily: 'Helvetica Neue'
        }}>
            <b><br />entries</b>
        </Typography>
        {entries.map(entry => getEntrySpecifics(entry))}
    </div>;
};

export default EntryList;