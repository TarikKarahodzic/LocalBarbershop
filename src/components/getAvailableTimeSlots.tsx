export const getAvailableTimeSlots = (
    workStartTime: string,
    workEndTime: string,
    appointments: Array<{ appointment_time: string, service_duration: number }>,
    serviceDuration: number,
    buffer: number
) => {
    const startMinutes = timeToMinutes(workStartTime);
    const endMinutes = timeToMinutes(workEndTime);

    // Create an array of available slots (e.g., every 30 minutes within work hours)
    let availableSlots: string[] = [];
    for (let slot = startMinutes; slot + serviceDuration <= endMinutes; slot += 30) {
        availableSlots.push(minutesToTime(slot));
    }

    // Remove booked slots from available slots
    appointments.forEach(({ appointment_time, service_duration }) => {
        const bookedStart = timeToMinutes(appointment_time.split('T')[1].substring(0, 5));
        const bookedEnd = bookedStart + service_duration + buffer;

        // Remove any time slots that overlap with the booked times
        availableSlots = availableSlots.filter((slot) => {
            const slotStart = timeToMinutes(slot);
            const slotEnd = slotStart + serviceDuration;
            return slotEnd <= bookedStart || slotStart >= bookedEnd;
        });
    });

    return availableSlots;
};

// Converts "HH:MM" string to minutes since midnight
const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Converts minutes since midnight back to "HH:MM" string
const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

