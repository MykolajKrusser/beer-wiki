const getStringForApi = (data: string) => data.toLowerCase().replaceAll(' ', '_');
const getStringForTitle = (data: string) => {
  let title = '';

  //removed unused data
  if(data === 'id' ||
    data === 'name' ||
    data === 'longitude' ||
    data === 'latitude'
  ) return

  title = data.charAt(0).toUpperCase() + data.slice(1).replaceAll('_', ' ');
  return title
}

export { getStringForApi, getStringForTitle };
