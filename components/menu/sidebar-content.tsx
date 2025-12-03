import { menuDashboard, menuAnalitico } from "@/utils/constants/itens-menu";
import { Separator } from "@radix-ui/react-separator";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { ItemMenu } from "./item-menu";

export function SidebarContent({ handleLogout }: { handleLogout: () => void }) {
    return (
        <>
            <select
                name="cidade"
                id="cidade"
                defaultValue="penedo"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Selecione uma cidade</option>
                <option value="penedo">Penedo</option>
            </select>

            <section className="mb-8">
                <h2 className="text-gray-300 font-bold mb-4 uppercase tracking-wide">
                    Dashboard
                </h2>
                <ul className="space-y-2">
                    {menuDashboard.map((item, idx) => (
                        <ItemMenu key={idx} name={item.name} icon={item.icon} link={item.link} />
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-gray-300 font-bold uppercase tracking-wide">
                    Analítico
                </h2>
                <ul className="space-y-2">
                    {menuAnalitico.map((item, idx) => (
                        <ItemMenu key={idx} name={item.name} icon={item.icon} link={item.link} />
                    ))}
                </ul>
            </section>

            <Separator className="border-gray-700 my-4" />

            <Button
                variant="ghost"
                className="cursor-pointer w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={handleLogout}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Encerrar sessão
            </Button>
        </>
    );
}
