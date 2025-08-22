export const calculateAge = (dataNascimento: string) => {
    const hoje = new Date();
    const aniversario = new Date(dataNascimento);
    let idade = hoje.getFullYear() - aniversario.getFullYear();
    const m = hoje.getMonth() - aniversario.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < aniversario.getDate())) {
        idade--;
    }

    return idade;
}