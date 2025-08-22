export const date = (date: string) => {
  const data = new Date(date);

  const dia = String(data.getDate()).padStart(2, "0");
  
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");

  const labelHorario = `às ${hora}:${minuto}`;

  return `${dia}/${mes}/${ano} ${hora > '00' ? labelHorario : ''}`;
}