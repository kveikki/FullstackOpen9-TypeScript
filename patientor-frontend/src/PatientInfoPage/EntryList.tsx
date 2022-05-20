import { Typography } from "@material-ui/core";
import { Entry } from "../types";
import { assertNever } from "../utils";
import {HealthCheckEntryListing, HospitalEntryListing, OccupationalHealthcareEntryListing } from "./Entries";

const EntryList = ({ entries }: { entries: Entry[] }) => {
    if (!entries || entries.length === 0) return null;

    const getEntryListing = ( entry: Entry ) => {
        switch (entry.type) {
            case "HealthCheck":
                return <HealthCheckEntryListing key={entry.id} entry={entry}/>;
            case "Hospital":
                return <HospitalEntryListing key={entry.id} entry={entry}/>;
            case "OccupationalHealthCare":
                return <OccupationalHealthcareEntryListing key={entry.id} entry={entry}/>;
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
        {entries.map(entry => getEntryListing(entry))}
    </div>;
};

export default EntryList;