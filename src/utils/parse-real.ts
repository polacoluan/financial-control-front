export const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/\D/g, "")) / 100; // Convert to raw number
};