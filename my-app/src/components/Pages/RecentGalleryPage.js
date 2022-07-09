import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Text, Flex, Center } from '@chakra-ui/react';
import FeedGrid from '../shared/Feed/FeedGrid';

const PaginationNav = ({ pageNumber, prevURL, nextURL }) => (
  <Center mt={2} mb={2} fontSize="lg">
    <Link to={prevURL}>◀️</Link>
    <Text mr={1} ml={1}>
      {pageNumber}
    </Text>
    <Link to={nextURL}>▶️</Link>
  </Center>
);

export default function UserGalleryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  const apiURL = `https://api.feverdreams.app/recent/50/${params.page}`;

  const prevURL = `/recent/${parseInt(params.page) - 1}`;
  const nextURL = `/recent/${parseInt(params.page) + 1}`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
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
  }, [params.page]);

  return (
    <>
      <PaginationNav
        pageNumber={params.page}
        prevURL={prevURL}
        nextURL={nextURL}
      />
      <FeedGrid dreams={data} loading={loading} />
      <PaginationNav
        pageNumber={params.page}
        prevURL={prevURL}
        nextURL={nextURL}
      />
    </>
  );
}
