import {useEffect, useState} from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Spotify from "./spotifyPlayer";
import YouTube from "./youTubePlayer";
import Song from '../pages/index'
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import Typography from "@mui/material/Typography";
import SongDescription from "./songDescription";

interface DialogType {
  openDialog: boolean
  handleClose: () => void
  songId?: number
}

export interface ChildrenType {
  tag:string
  children: ChildrenType[] | string
}

interface MediaType {
  type: string
  provider: string
  url: string
  start?: number
  native_uri?: string
}

export interface Song {
  id: number
  title: string
  author: string
  album: string
  description?: ChildrenType
  albumCover?: string
  spotifyUrl?: string
  youTubeUrl?: string
}


const StyledModalBox = styled(Box)`
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  border: none;
  boxShadow: 24;
  background: rgb(4, 83, 226) linear-gradient(113deg, rgba(4, 83, 226, 1) 0%, rgba(142, 95, 80, 1) 35%, rgba(119, 5, 153, 1) 100%);
  p: 4;
`
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 2rem;

  & div {
    margin-left: 2rem;
  }
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  & iframe{
    margin-right: 2rem;
  }
`

const StyledTitle = styled(Typography)`
  color: #fafafa;
  text-transform: uppercase;
`

const StyledAuthor = styled(Typography)`
  color: #BBB;
`

const StyledAlbum = styled(Typography)`
  color: #f89ef8;
`


const SongDetail = ({openDialog, handleClose, songId}: DialogType) => {
  const [song, setSong] = useState<Song | null>();
  useEffect(() => {
    if (!songId) return
    const song = async () => {
      const url = `https://api.genius.com/songs/${songId}?access_token=pTXOfKJeRpIiIMmMlXtgEhk8yCJggWx6fhdSE4_6SE_GJMUnl5sZhFLOPcaVagUf&q=`
      const response = await fetch(url)
      const jsonResponse = await response.json();
      const {id, title, media, album, description} = jsonResponse.response.song
      const spotifyMedia = media.find((med: MediaType) => med.provider === 'spotify')
      const youTubeMedia = media.find((med: MediaType) => med.provider === 'youtube')
      setSong({
        id,
        title,
        description: description?.dom ?? null,
        author: album?.artist.name,
        album: album?.name ?? 'no album',
        albumCover: album?.cover_art_url,
        spotifyUrl: spotifyMedia?.url ?? '',
        youTubeUrl: youTubeMedia?.url ?? '',
      })
    }
    if (songId) {
      song()
    }
  }, [songId])

  const closeAndClean = () => {
    setSong(null)
    handleClose();
  }
  return <Modal
    open={openDialog}
    onClose={closeAndClean}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <StyledModalBox>
      {!!!song && <div>
          <Skeleton/>
          <Skeleton animation="wave"/>
          <Skeleton animation={false}/>
        </div>
      }
      {song && <div>
          <StyledHeader>
            {song.albumCover && <CardMedia
              component="img"
              sx={{width: 300}}
              image={song.albumCover}
              alt={song.title}
            />}
            <div style={{width: '100%'}}>
              <StyledTitle fontSize={'3vw'} fontFamily={'Dhurjati'}>{song.title}</StyledTitle>
              <StyledAuthor fontSize={'2.5vw'} fontFamily={'Dhurjati'}>{song.author}</StyledAuthor>
              <StyledAlbum fontSize={'2vw'} fontFamily={'Dhurjati'}>{song.album}</StyledAlbum>
            </div>
          </StyledHeader>
          <StyledContainer>
            {!!!song && <>
              <Box sx={{width: 300}}>
                <Skeleton/>
                <Skeleton animation="wave"/>
                <Skeleton animation={false}/>
              </Box>
              <Box sx={{width: 300}}>
                <Skeleton/>
                <Skeleton animation="wave"/>
                <Skeleton animation={false}/>
              </Box></>}
            {!!song.description && <SongDescription description={song.description}/>}
            {!!song.youTubeUrl && <YouTube link={song.youTubeUrl}/>}
            {!!song.spotifyUrl && <Spotify link={song.spotifyUrl}/>}
          </StyledContainer>
        </div>}
    </StyledModalBox>
  </Modal>
}
export default SongDetail
