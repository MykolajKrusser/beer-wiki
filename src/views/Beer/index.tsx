import {useEffect, useState} from 'react';
import type {Beer as IBeer} from '../../types';
import {fetchData} from './utils';
import {useParams} from 'react-router-dom';
import {Paper, Skeleton} from '@mui/material';
import {getStringForTitle} from '../../utils';
import ListItem from '../../components/Beer/ListItem'

import styles from './Beer.module.css';
const Beer = () => {
  const {id} = useParams();
  const [beer, setBeer] = useState<any | IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);
  const googleMapUrl: string = `https://maps.google.com/maps?q=${beer?.latitude},${beer?.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  const list = []
  for (const property in beer) {
    list.push({key: property, value: beer[property], title: getStringForTitle(property)})
  }

  return (
    <article>
      <Paper>
        {beer ?
          <section className={styles.container}>
            {
              beer?.name &&
              <header>
                <h1>{beer?.name}</h1>
              </header>
            }
            <main>
              {
                list.map((item, index) => (
                  item.title && item.value &&
                  <ListItem
                    title={item.title}
                    value={item.value}
                    propertyName={item.key}
                    key={index.toString()}/>
                ))
              }
              {
                beer?.longitude && beer?.latitude &&
                <div>
                  <p>
                    <b>Geolocation: </b>
                  </p>
                  <iframe
                    title={'googlemap'}
                    width="400" height="300"
                    src={googleMapUrl}
                  />
                </div>
              }
            </main>

          </section> :

          <section className={styles.container}>
            <header>
              <h1><Skeleton variant="text" width={200} sx={{fontSize: '16px'}}/></h1>
            </header>
            <main>
              {[...Array(9)].map((e, i) => <p key={i}>
                <Skeleton variant="text" width={300} sx={{fontSize: '16px'}}/>
              </p>)}
              <p>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={300}
                />
              </p>
            </main>
          </section>
        }
      </Paper>
    </article>
  );
};

export default Beer;
