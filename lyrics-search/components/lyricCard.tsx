import * as React from 'react'
import {useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone'
import Lyric from '../pages/index'

interface LyricCardType {
  lyric: Lyric,
  onHandleOpenDetail: (songId: number) => void
}

const LyricCard = ({lyric, onHandleOpenDetail}: LyricCardType) => {
  const {
    id,
    apiPath,
    title,
    artistNames,
    album,
    thumbnailUrl
  } = lyric
  const handleOpenDetail = () => {
    onHandleOpenDetail(id)
  }
  return <Card sx={{display: 'flex', margin: '2rem', justifyContent: 'space-between'}} key={id}>
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <CardContent sx={{flex: '1 0 auto'}}>
        <Typography component="div" variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {artistNames}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {album}
        </Typography>
      </CardContent>
      <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
        <IconButton aria-label="song detail" onClick={handleOpenDetail}>
          <ControlPointTwoToneIcon sx={{height: 38, width: 38}}/>
        </IconButton>
      </Box>
    </Box>
    <CardMedia
      component="img"
      sx={{width: 151}}
      image={thumbnailUrl}
      alt={title}
    />
  </Card>

}
export default LyricCard
