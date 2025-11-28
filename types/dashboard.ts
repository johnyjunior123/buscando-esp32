interface DashboardDataItem {
    labels: string[];
    valores: number[];
}

interface DashboardData {
    dadosDistribuicaoDias: DashboardDataItem;
    dadosTempoEntreVisitas: DashboardDataItem;
    dadosZonaDistribuicao: DashboardDataItem;
    dadosAnoAnterior: DashboardDataItem;
}