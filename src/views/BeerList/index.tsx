import {ChangeEvent, Fragment, useEffect, useState} from 'react';
import type {Beer} from '../../types';
import {SortEnum} from '../../enums/sort'
import {fetchData, fetchMetaData} from './utils';
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Skeleton
} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import {useNavigate} from 'react-router-dom';
import {debounce} from "lodash";

import styles from './BeerList.module.css'

const BeerList = () => {
  const countries = [
    'Austria',
    'England',
    'France',
    'Isle of Man',
    'Ireland',
    'Poland',
    'Portugal',
    'Scotland',
    'South Korea',
    'United States'
  ]
  const perPageValues = [5, 10, 20, 50, 100, 200]
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 5,
    by_name: '',
    by_country: '',
    sort: SortEnum.SORT_BY_NAME_ASC
  });

  // eslint-disable-next-line
  useEffect(() => {
    fetchMetaData(setTotalPages, pagination)
    fetchData(setBeerList, pagination)
  }, [pagination])

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const perPageHandler = (event: SelectChangeEvent<unknown>) => {
    setPagination({
      ...pagination,
      page: 1,
      per_page: Number(event.target.value)
    })
  }

  const pageHandler = (event: ChangeEvent<unknown>, value: number) => {
    setPagination({
      ...pagination,
      page: value
    })
  }

  const filterHandler = debounce((event: string) => {
    setPagination({
      ...pagination,
      by_name: event
    })
  }, 500)

  const sortBytName = () => {
    setPagination({
      ...pagination,
      sort: pagination.sort === SortEnum.SORT_BY_NAME_ASC ? SortEnum.SORT_BY_NAME_DESC : SortEnum.SORT_BY_NAME_ASC
    })
  }

  const sortBytCountry = (event: SelectChangeEvent<string>) => {
    setPagination({
      ...pagination,
      page: 1,
      by_country: event.target.value,
    })
  }

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <div className={styles.container}>
            <TextField
              sx={{m: 1}}
              label='Filter By Name'
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => filterHandler(event.target.value)}
              size={'small'}
            />
            <FormControl sx={{m: 1, minWidth: 170}} size="small">
              <InputLabel id="sort-country-lb">Sort By Country</InputLabel>
              <Select
                labelId="sort-country-lb"
                id="sort-country"
                label="Sort By Country"
                value={pagination.by_country}
                onChange={(event) => sortBytCountry(event)}
              >
                <MenuItem value={''}>All Countries</MenuItem>
                {
                  countries.map((country, index) => {
                    return <MenuItem key={index} value={country}>{country}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <FormControl size="small" sx={{m: 1, display: 'flex', justifyContent: 'center'}}>
              <Button
                onClick={sortBytName}
              >
                Sort: {pagination.sort === SortEnum.SORT_BY_NAME_ASC ? 'A-Z' : 'Z-A'}
              </Button>
            </FormControl>
          </div>
          {
            beerList.length > 0 ?
              <List>
                {beerList.map((beer) => (
                  <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                    <ListItemAvatar>
                      <Avatar>
                        <SportsBar/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={beer.name} secondary={beer.brewery_type}/>
                  </ListItemButton>
                ))}
              </List> :
              <List sx={{paddingX: 1}}>
                {
                  <ListItemButton sx={{width: '400px', height: '43px', py: 0}}>
                    Empty List
                  </ListItemButton>
                }
                {
                  [...Array(pagination.per_page - 1)].map((e, i) => <Skeleton key={i} variant="text" width={400} height={72}></Skeleton>)
                }
              </List>
          }
          <div className={styles.container}>
            {
              totalPages > 0 && <Fragment>
                <Pagination
                  sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', m: 1}}
                  count={totalPages}
                  page={pagination.page}
                  variant="outlined"
                  shape="rounded"
                  size={'large'}
                  onChange={(event, value) => pageHandler(event, value)}
                />
                <FormControl sx={{m: 1, minWidth: 100}} size="small">
                  <InputLabel id="pagination-per-page-lb">Per Page</InputLabel>
                  <Select
                    labelId="pagination-per-page-lb"
                    id="pagination-per-page"
                    label="Per Page"
                    value={pagination.per_page}
                    onChange={(event) => perPageHandler(event)}
                  >
                    {
                      perPageValues.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Fragment>
            }
          </div>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
