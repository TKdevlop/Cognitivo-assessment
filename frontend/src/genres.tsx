import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const Genres: React.FC = () => {
  const [trendingGenres, setTrendingGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchTrendingGenres = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/trending/genres');
    const { data } = await res.json();
    setTrendingGenres(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchTrendingGenres();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Genre</TableCell>
              <TableCell align='right'>Energy</TableCell>
              <TableCell align='right'>Liveness</TableCell>
              <TableCell align='right'>Loudness</TableCell>
              <TableCell align='right'>Popularity</TableCell>
              <TableCell align='right'>Speechiness</TableCell>
              <TableCell align='right'>Tempo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trendingGenres.map((row) => (
              <TableRow key={row.genres}>
                <TableCell component='th' scope='row'>
                  {row.genres}
                </TableCell>
                <TableCell align='right'>{row.energy}</TableCell>
                <TableCell align='right'>{row.liveness}</TableCell>
                <TableCell align='right'>{row.loudness}</TableCell>
                <TableCell align='right'>{row.popularity}</TableCell>
                <TableCell align='right'>{row.speechiness}</TableCell>
                <TableCell align='right'>{row.tempo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <CircularProgress style={{ margin: '10px 0px 0px 5px' }} />}
      </TableContainer>
    </div>
  );
};

export default Genres;
