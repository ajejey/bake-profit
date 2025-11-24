'use client';

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function GoogleLoginButton() {
    const { loginWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
        if (!credentialResponse.credential) {
            toast({
                title: 'Google login failed',
                description: 'No credential received from Google',
                variant: 'destructive',
            });
            return;
        }

        try {
            const result = await loginWithGoogle(credentialResponse.credential);

            if (result.success) {
                // Send welcome email if this is a new user
                const isNewUser = (result as unknown as { isNewUser?: boolean }).isNewUser;
                if (isNewUser && result.user) {
                    fetch('/api/auth/send-welcome-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: result.user.email,
                            name: result.user.name || 'there'
                        })
                    }).catch(err => console.error('Failed to send welcome email:', err));

                    toast({
                        title: 'Account created!',
                        description: 'Welcome to BakeProfit! Check your email for a getting started guide.',
                    });
                } else {
                    toast({
                        title: 'Welcome!',
                        description: 'You have successfully logged in with Google.',
                    });
                }

                // Check for redirect parameter
                const redirectUrl = searchParams.get('redirect');
                if (redirectUrl && redirectUrl.startsWith('/')) {
                    router.push(redirectUrl);
                } else {
                    router.push('/bakery-business-tool');
                }
            } else {
                toast({
                    title: 'Google login failed',
                    description: result.error || 'Failed to authenticate with Google',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Google login error:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred during Google login',
                variant: 'destructive',
            });
        }
    };

    const handleGoogleError = () => {
        toast({
            title: 'Google login failed',
            description: 'Failed to authenticate with Google. Please try again.',
            variant: 'destructive',
        });
    };

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
        console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
        return null;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="w-full flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="filled_blue"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    width="100%"
                />
            </div>
        </GoogleOAuthProvider>
    );
}
