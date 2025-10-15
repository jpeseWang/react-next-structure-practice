// Server Actions specific to the dashboard'use server';

import { db } from '@/lib/db'; // Fictional database client
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Define a schema for validation
const ProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    bio: z.string().max(150, 'Bio cannot exceed 150 characters').optional(),
});

// The Server Action itself
export async function updateUserProfile(formData: FormData) {
    const data = {
        name: formData.get('name'),
        bio: formData.get('bio'),
    };

    // 1. Validate data on the server
    const validationResult = ProfileSchema.safeParse(data);
    if (!validationResult.success) {
        return { error: validationResult.error.flatten().fieldErrors };
    }

    // 2. Perform the database mutation
    try {
        // await db.user.update({ where: { ... }, data: validationResult.data });
        console.log('Server: Updating profile with', validationResult.data);
    } catch (e) {
        return { error: 'Failed to update profile.' };
    }

    // 3. Revalidate the path to show fresh data
    revalidatePath('/profile');
    return { success: 'Profile updated successfully!' };
}