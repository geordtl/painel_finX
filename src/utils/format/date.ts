export const date = (date: string) => {
  const data = new Date(date);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  if(date.includes('T')){
    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
  }else {
    return `${dia}/${mes}/${ano}`
  }
}