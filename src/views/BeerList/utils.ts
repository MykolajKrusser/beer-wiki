import {getBeerList, getBeerMetaData} from '../../api';
import type {ApiParams, Beer} from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, params: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetaData = (setTotalPages: (total: number) => void, params: ApiParams) => {
  (async () => {
    try {
      const meta = await getBeerMetaData(params);
      setTotalPages(Math.ceil(meta.data.total / Number(params.per_page)));
    } catch (error) {
      handle(error);
    }
  })();
};

export {fetchData, fetchMetaData};
