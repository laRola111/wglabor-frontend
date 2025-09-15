// RUTA: src/components/organisms/CompanyInfoForm.js (NUEVO ARCHIVO)
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/useToast';
import { updateSiteSettingsAction } from '@/actions/settings';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Changes'}</Button>;
}

export default function CompanyInfoForm({ settings }) {
    const toast = useToast();
    const [state, formAction] = useActionState(updateSiteSettingsAction, null);

    useEffect(() => {
        if (state?.message) {
            state.success ? toast.success(state.message) : toast.error(state.message);
        }
    }, [state, toast]);

    return (
        <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={settings.email} />
                </div>
                <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" name="phone" type="tel" defaultValue={settings.phone} />
                </div>
                <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" type="text" defaultValue={settings.address} />
                </div>
                <div>
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input id="facebook" name="facebook" type="url" defaultValue={settings.social_media?.facebook} />
                </div>
                <div>
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input id="instagram" name="instagram" type="url" defaultValue={settings.social_media?.instagram} />
                </div>
                 <div>
                    <Label htmlFor="tiktok">TikTok URL</Label>
                    <Input id="tiktok" name="tiktok" type="url" defaultValue={settings.social_media?.tiktok} />
                </div>
            </div>
            <div className="text-right border-t border-dark-border pt-6 mt-6">
                <SubmitButton />
            </div>
        </form>
    );
}