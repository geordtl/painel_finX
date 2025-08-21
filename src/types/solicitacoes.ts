export interface ResponseSolicitacoes {
    data: {
        id: number;
        medico: Medico,
        paciente: Paciente
        dataCriacao: string;
    }[],
    paginacao?: Paginacao;
}

export interface Medico {
    nome: string;
}

export interface Paciente {
    nome: string;
    dataNascimento: string;
}

export interface Paginacao {
    paginaAtual: number,
    itensPorPagina: number,
    totalDePaginas: number,
    totalDeItens: number,
    next_page_url: string,
    prev_page_url: null
}