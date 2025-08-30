import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);
type FiltroPorDataProps = {
    onChangeInicio: (data: Date | null) => void;
    onChangeFim: (data: Date | null) => void;
    inicio: Date
    fim: Date
}

export function FiltroPorData({ onChangeInicio, onChangeFim, inicio, fim }: FiltroPorDataProps) {
    return (
        <section className="flex gap-4 flex-col md:flex-row">
            <div className="flex flex-col">
                <label className="font-semibold mb-1">Data Início</label>
                <DatePicker
                    selected={inicio}
                    onChange={onChangeInicio}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    placeholderText="Selecione a data"
                    className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold mb-1">Data Fim</label>
                <DatePicker
                    selected={fim}
                    onChange={onChangeFim}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    placeholderText="Selecione a data"
                    className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </section>
    );
}