export function formatPhoneNumber(phone: string | number) {
  phone = String(phone);
  const formated = phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
  return formated;
}