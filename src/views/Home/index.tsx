import {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {fetchData, searchData} from './utils';
import type {Beer} from '../../types';
import {Button, Paper, TextField} from '@mui/material';
import {LocalStorageEnum} from '../../enums/localStorage'
import ListItem from "../../components/Home/ListItem";
import {debounce} from 'lodash';

import styles from './Home.module.css'

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([])
  const [savedList, setSavedList] = useState<Array<Beer>>([])

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  useEffect(() => {
    const savedBeersCompaniesString = localStorage.getItem(LocalStorageEnum.SAVED_BEER) || '[]'
    const savedBeersCompanies: Beer[] = JSON.parse(savedBeersCompaniesString)
    if (savedBeersCompanies.length) {
      setSavedList(savedBeersCompanies)
    }
  }, [])

  const addBeerItem = (beer: Beer, event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>, checked: boolean) => {
    if (checked) {
      const updatedList = [{...beer, checked: true}, ...savedList]
      setSavedList(updatedList)
      setBeerList(beerList.map((item) => {
        if (item.id === beer.id) item.checked = true
        return item
      }))
      localStorage.setItem(LocalStorageEnum.SAVED_BEER, JSON.stringify(updatedList))
    } else {
      const filteredList = savedList.filter(item => item.id !== beer.id)
      setSavedList(filteredList);
      setBeerList(beerList.map((item) => {
        if (item.id === beer.id) item.checked = false
        return item
      }))
      localStorage.setItem(LocalStorageEnum.SAVED_BEER, JSON.stringify(filteredList))
    }
  }

  const removeSavedBeers = () => {
    setSavedList([]);
    setBeerList(beerList.map((item) => {
      item.checked = false
      return item
    }))
    localStorage.setItem(LocalStorageEnum.SAVED_BEER, '[]')
  }

  const reloadList = () => {
    fetchData.bind(this, setBeerList)()
  }

  const searchQuery = debounce((event: string) => {
    if (event.length) {
      searchData(event, setBeerList)
    }
  }, 500)

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label='Filter...'
                  variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => searchQuery(event.target.value)}
                />
                <Button onClick={reloadList} variant='contained'>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <ListItem key={index.toString()} action={'add'} beer={beer} addFn={addBeerItem}/>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={removeSavedBeers}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <ListItem key={index.toString()} action={'remove'} beer={beer} addFn={addBeerItem}/>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
