'use client';

import { useState, useTransition } from 'react';

// This hook manages the UI state of the form.
// It knows nothing about the database.
export function useProfileForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    // This function will be called by the form's onSubmit event.
    // It wraps the server action call in a transition.
    const handleSubmit = (action: (formData: FormData) => Promise<any>) => {
        return (formData: FormData) => {
            setError(null);
            startTransition(async () => {
                const result = await action(formData);
                if (result?.error) {
                    // Handle potential errors returned from the server action
                    setError(typeof result.error === 'string' ? result.error : 'Validation failed.');
                }
            });
        };
    };

    return { isPending, error, handleSubmit };
}