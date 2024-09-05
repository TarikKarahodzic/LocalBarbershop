import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* --- Services --- */
export const useServiceList = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const { data, error } = await supabase.from('services').select('*')
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

/* --- Barbers --- */
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

/* --- News --- */
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

/* --- Products --- */
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
// Adding a new product and refreshing the list of products after success
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