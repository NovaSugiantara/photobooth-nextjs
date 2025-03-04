// src/hooks/use-toast.ts
import { useCallback } from 'react';
import { toast as hotToast } from 'react-hot-toast';

type ToastOptions = {
    title: string;
    description?: string;
    duration?: number;
    variant?: 'destructive' | 'default';
};

export const useToast = () => {
    const toast = useCallback((options: ToastOptions) => {
        // Console log seperti sebelumnya
        console.log(`Toast: ${options.title}`);
        if (options.description) {
            console.log(`Description: ${options.description}`);
        }
        if (options.duration) {
            console.log(`Duration: ${options.duration}ms`);
        }
        if (options.variant) {
            console.log(`Variant: ${options.variant}`);
        }

        // Tampilkan toast menggunakan react-hot-toast
        hotToast(options.title, {
            duration: options.duration || 3000,
            style: {
                background: options.variant === 'destructive' ? '#f87171' : '#4ade80',
                color: 'white',
            },
        });
    }, []);

    return { toast };
};
