"use client";

import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    SparklesIcon,
    StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
    {
        title: "Main",
        items : [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows",
            },
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials",
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions",
            }
        ]
    }
];

import { authClient } from "@/lib/auth-client";

export const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        className="gap-x-4 h-10 px-4"
                    >
                        {/* <Link
                        href="/"
                        className="flex items-center gap-2 self-center text-4xl font-extrabold tracking-tight text-foreground"
                        >
                        <span className="text-primary text-3xl">AKP</span>
                        <span>Automate</span>
                        </Link> */}
                        <Link
                        href="/"
                        className="group flex items-center gap-3 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-gray-50"
                        >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-b color-primary from-primary to-blue-500 ">
                            <SparklesIcon className="h-4.5 w-4.5 text-white" />
                        </div>

                        <div className="flex flex-col leading-none">
                            <span className="text-lg font-semibold font-mono tracking-wide text-gray-900">
                            AKP Automate
                            </span>
                        </div>
                        </Link>

                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>   
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                >
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={
                                            item.url === "/"
                                                ? pathname === "/"
                                                : pathname.startsWith(item.url)
                                        }
                                        asChild
                                        className="gap-x-4 h-10 px-4"
                                    >
                                        <Link href={item.url} prefetch>
                                            <item.icon className="size-4"/>
                                            <span>{item.title}</span>
                                        </Link>
                                        
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Upgrade to Pro"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => {}}
                        >
                            <StarIcon className="h-4 w-4"/>
                            <span>Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Billing Portal"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => {}}
                        >
                            <CreditCardIcon className="h-4 w-4"/>
                            <span>Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                       <SidebarMenuButton
                        tooltip="Sign Out"
                        className="gap-x-4 h-10 px-4"
                        onClick={async () => {
                            await authClient.signOut();
                            router.replace("/login");
                        }}
                        >


                            <LogOutIcon className="h-4 w-4"/>
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
};
