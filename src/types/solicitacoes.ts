export interface ResponseSolicitacoes {
    data: {
        id: number;
        medico: Medico,
        paciente: Paciente
        dataCriacao: string;
    }[],
    paginacao: {
        paginaAtual: number,
        itensPorPagina: number,
        totalDePaginas: number,
        totalDeItens: number,
        next_page_url: string,
        prev_page_url: null
    }
}

interface Medico {
    nome: string;
}

interface Paciente {
    nome: string;
    dataNascimento: string;
}