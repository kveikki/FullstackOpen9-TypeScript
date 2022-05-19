export const assertNever = (value: never): never => {
    throw new Error(
        `Exhaustive type check failed: ${JSON.stringify(value)}`
    );
};