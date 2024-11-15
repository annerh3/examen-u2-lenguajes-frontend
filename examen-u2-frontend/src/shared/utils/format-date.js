export const formatDate = (isoDateString) => {

    const date = new Date(isoDateString); // pasar UTC

    date.setHours(date.getHours() - 6); // restar 6 horas

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Tegucigalpa'
    };

    const formatter = new Intl.DateTimeFormat('es-ES', options); 
    return formatter.format(date);
};
