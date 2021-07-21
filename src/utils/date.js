/**
 * Returns current time in 24-hour format
 */
export const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Converts 24-hour time in format hh:mm into minutes for comparison
 */
export const getTimeAsNumberOfMinutes = (time) => {
    const timeParts = time.split(":");
    const timeInMinutes = (timeParts[0] * 60) + timeParts[1];
    return timeInMinutes;
}

/**
 * Formats date from dd-mm-yyyy to dd/mm/yyyy
 */
export const formatDate = (date) => {
    return date.split('-').reverse().join('/');
}
