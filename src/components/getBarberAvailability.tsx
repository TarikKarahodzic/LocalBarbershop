import { supabase } from "../lib/supabase";

export type Appointment = {
    id: number;
    barber_id: number;
    appointment_time: string; // Date string
    service_duration: number; // in minutes
};

export const getBarberAvailability = async (barberId: number, date: string) => {
    // Assuming work_start_time and work_end_time are fetched separately or from another table
    const { data: barberAvailability, error: barberError } = await supabase
        .from('barber_availability')
        .select('work_start_time, work_end_time')
        .eq('barber_id', barberId)
        .single();

    if (barberError) {
        console.error(barberError);
        return null;
    }

    const { work_start_time, work_end_time } = barberAvailability;

    const { data: appointments, error: appointmentError } = await supabase
        .from('appointments')
        .select('appointment_time, service_duration')
        .eq('barber_id', barberId)
        .gte('appointment_time', `${date}T00:00:00`)
        .lt('appointment_time', `${date}T23:59:59`);

    if (appointmentError) {
        console.error(appointmentError);
        return null;
    }

    return {
        work_start_time,
        work_end_time,
        appointments,
    };
};
