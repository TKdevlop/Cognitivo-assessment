import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const Artist: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [trendingArtist, setTrendingArtist] = useState<any[]>([]);
  const fetchTrendingArtist = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/popularity');
    const { data } = await res.json();
    setTrendingArtist(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchTrendingArtist();
  }, []);
  const buildSecondaryText = (artist: any): string => {
    const duration = (artist.duration / artist.song / (1000 * 60)).toFixed(2); //in mins
    const popularity = (artist.popularity / artist.song).toFixed(2);
    return `Songs Average Duration/Popularity : ${duration} min / ${popularity}%`;
  };
  return (
    <div>
      {loading && <CircularProgress style={{ margin: '10px 0px 0px 5px' }} />}
      <List component='nav' aria-label='secondary mailbox folders'>
        {trendingArtist.map((artist) => (
          <>
            <ListItem>
              <ListItemText
                primary={artist.artist}
                secondary={buildSecondaryText(artist)}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
};

export default Artist;
