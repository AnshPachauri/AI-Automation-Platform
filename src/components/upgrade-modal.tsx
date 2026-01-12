// src/components/upgrade-modal.tsx
"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { authClient } from "@/lib/auth-client";

interface UpgradeModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

export const UpgradeModal = ({
    isOpen,
    onOpenChange
} : UpgradeModalProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                <AlertDialogDescription>
                    You need an active subscription to perform this action. 
                    Upgrade to Pro to unlock all features.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => authClient.checkout({ slug : "pro"})}>
                    Upgrade Now
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

        </AlertDialog>
    )
}