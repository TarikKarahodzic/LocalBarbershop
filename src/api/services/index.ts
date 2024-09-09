import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ---------------------------- */
/* --------- Services --------- */
/* ---------------------------- */

export const useServiceList = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useService = (id: number) => {
    return useQuery({
        queryKey: ['services', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

// Insert a Service
export const useInsertService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newService } = await supabase
                .from('services')
                .insert({
                    name: data.name,
                    price: data.price,
                    image: data.image,
                })
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newService;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['services']);
        },
    });
};

// Update a Service
export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedService } = await supabase
                .from('services')
                .update({
                    name: data.name,
                    price: data.price,
                    image: data.image,
                })
                .eq('id', data.id)
                .select();

            if (error) {
                throw new Error(error.message);
            }
            return updatedService;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['services']);
            await queryClient.invalidateQueries(['services', id]);
        },
    });
};

// Delete a Service
export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['services']);
        }
    });
};

/* ---------------------------- */
/* --------- Barbers ---------- */
/* ---------------------------- */
// Printing barbers
export const useBarberList = () => {
    return useQuery({
        queryKey: ['barbers'],
        queryFn: async () => {
            const { data, error } = await supabase.from('barbers').select('*')
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

// Selecting barbers by id
export const useBarber = (id: number) => {
    return useQuery({
        queryKey: ['barbers', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('barbers')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

// Insert a barber
export const useInsertBarber = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newBarber } = await supabase
                .from('barbers')
                .insert({
                    name: data.name,
                    image: data.image,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                })
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newBarber;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['barbers']);
        },
    });
};

// Update a barber
export const useUpdateBarber = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedBarber } = await supabase
                .from('barbers')
                .update({
                    name: data.name,
                    image: data.image,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                })
                .eq('id', data.id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedBarber;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['barbers']);
            await queryClient.invalidateQueries(['barbers', id]);
        },
    });
};

// Delete a barber
export const useDeleteBarber = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase.from('barbers').delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['barbers']);
        }
    });
};

/* ----------------------------- */
/* ----------- News ------------ */
/* ----------------------------- */
export const useNewsList = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('news')
                .select('*')
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useNews = (id: number) => {
    return useQuery({
        queryKey: ['news', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

// Create news
export const useInsertNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newNews } = await supabase
                .from('news')
                .insert({
                    title: data.title,
                    desc: data.desc,
                    timestamp: data.timestamp,
                })
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newNews;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['news']);
        },
    });
};

// Update news
export const useUpdateNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedNews } = await supabase
                .from('news')
                .update({
                    title: data.title,
                    desc: data.desc,
                    created_at: data.created_at,
                })
                .eq('id', data.id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedNews;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['news']);
            await queryClient.invalidateQueries(['news', id]);
        },
    });
};

// Delete news
export const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase.from('news').delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['news']);
        }
    });
};

/* ----------------------------- */
/* --------- Products ---------- */
/* ----------------------------- */
export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};
// Adding a new product
export const useInsertProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newProduct } = await supabase
                .from('products')
                .insert({
                    name: data.name,
                    image: data.image,
                    price: data.price,
                })
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newProduct;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['products']);
        },
    });
};

// Update a product
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedProduct } = await supabase
                .from('products')
                .update({
                    name: data.name,
                    image: data.image,
                    price: data.price,
                })
                .eq('id', data.id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['products']);
            await queryClient.invalidateQueries(['products', id]);
        },
    });
};

// Delete a product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['products']);
        }
    });
};

/* ---------------------------- */
/* ------- Appointments ------- */
/* ---------------------------- */

export const useAppointmentList = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const { data, error } = await supabase.from('appointments').select('*')
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useAppointment = (id: number) => {
    return useQuery({
        queryKey: ['appointments', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useInsertAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            barberId: number;
            serviceIds: number[];
            profileId: string;
            time: string;
        }) {
            const { error, data: newAppointment } = await supabase
                .from('appointments')
                .insert({
                    barber_id: data.barberId,
                    service_ids: data.serviceIds,
                    profiles_id: data.profileId,
                    time: data.time,
                })
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newAppointment;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['appointments']);
        },
    });
}