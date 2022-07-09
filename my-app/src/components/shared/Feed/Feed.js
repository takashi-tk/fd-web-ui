import React from 'react';
import { useState, useEffect } from 'react';
import { Skeleton, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Preview } from './Preview';

import FeedGrid from './FeedGrid';

export function Feed({ type, amount, user_id, regexp }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchFeed(type, amount, page, user_id, regexp) {
    let url = `https://api.feverdreams.app/${type}/${amount}/${page}`;

    if (type === 'random') {
      url = `https://api.feverdreams.app/${type}/${amount}`;
    } else if (user_id) {
      url = `https://api.feverdreams.app/userfeed/${user_id}/${amount}/${params.page}`;
    } else if (type === 'search') {
      url = `https://api.feverdreams.app/search/${regexp}/${amount}/${params.page}`;
    } else if (type === 'rgb') {
      url = `https://api.feverdreams.app/rgb/${params.r}/${params.g}/${params.b}/${params.range}/${amount}/${params.page}`;
    }

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  let params = useParams();

  useEffect(() => {
    let page = params ? (params.page ? params.page : 1) : 1;
    let amount = params ? (params.amount ? params.amount : 10) : 10;
    fetchFeed(
      type,
      amount,
      page,
      params.user_id ? params.user_id : null,
      params.regexp
    );
  }, [params]);

  return (
    <>
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
      <FeedGrid dreams={data} loading={loading} />
    </>
  );
}
