interface IParam {
  seconds: number;
}

export function getDate(value: IParam) {
  const date = new Date(value.seconds * 1000).toISOString().split('T')[0].split('/');
  return new Date(`${date[1]}/${date[2]}/${date[0]}`);
}