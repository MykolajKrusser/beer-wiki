import {getRandomBeerList, searchBeerList} from '../../api';
import {Beer} from '../../types';
import handle from '../../utils/error';
import {LocalStorageEnum} from "../../enums/localStorage";

const checkSavedBeer = (data: Beer[]) => {
  data.map((item: Beer) => {
    const savedBeersCompaniesString = localStorage.getItem(LocalStorageEnum.SAVED_BEER) || '[]';
    const savedBeersCompanies: Beer[] = JSON.parse(savedBeersCompaniesString);
    item.checked = false
    savedBeersCompanies.forEach(savedItem => {
      if (item.id === savedItem.id) item.checked = true
    })
    return item
  })
  return data
}

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      let {data} = await getRandomBeerList(10);
      data = checkSavedBeer(data)
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const searchData = (query: string, setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      let {data} = await searchBeerList(query);
      data = checkSavedBeer(data)
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
}

export {fetchData, searchData};
