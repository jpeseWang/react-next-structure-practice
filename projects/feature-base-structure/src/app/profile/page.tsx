'use client';

import { updateUserProfile } from './_actions/update-user-profile';
import { useProfileForm } from './_hooks/use-profile-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
    // Use the client-side hook to manage form state
    const { isPending, error, handleSubmit } = useProfileForm();

    return (
        <div>
            <h1>Edit Your Profile</h1>

            {/* The form calls the server action directly */}
            {/* The handleSubmit wrapper handles the pending/error state */}
            <form action={handleSubmit(updateUserProfile)} className="space-y-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <Input id="name" name="name" defaultValue="John Doe" required />
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <Input id="bio" name="bio" defaultValue="Next.js developer" />
                </div>

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Profile'}
                </Button>

                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}