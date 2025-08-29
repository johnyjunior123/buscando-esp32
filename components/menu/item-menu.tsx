'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ItemMenuProps = {
    name: string
    icon: ReactNode
    link: string
}

export function ItemMenu({ name, icon, link }: ItemMenuProps) {
    const path = usePathname()
    return (
        <a href={link}>
            <li
                key={name}
                className={`flex items-center ${path == link && "bg-gray-500"} gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200`}
            >
                {icon}
                <span className="font-medium">{name}</span>
            </li>
        </a>
    )
}