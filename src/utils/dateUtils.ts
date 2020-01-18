export function copyDate(d: Date | GoogleAppsScript.Base.Date): Date {
    return new Date(d.getTime());
};