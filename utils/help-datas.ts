export const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function getInicioEFimDoMes(mes: string, ano = new Date().getFullYear()) {
    const mesIndex = Number(mes)
    const inicio = new Date(ano, mesIndex - 1, 1);
    const fim = new Date(ano, mesIndex, 0);
    return { inicio, fim };
}