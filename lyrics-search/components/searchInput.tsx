import {useRef} from 'react'
import InputLabel from "@mui/material/InputLabel"
import { pink } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import Input from "@mui/material/Input"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import {GraphicEq} from "@mui/icons-material"
import styled from "styled-components";

interface SearchInputType {
  handleSearch: (search: string) => void
}

const SearchInput = ({handleSearch}: SearchInputType) => {

  const StyledInput= styled(Input)`
  border-color: #fafafa;
  `

  const refSearch = useRef('')
  const handleSearchInput = () => {
    handleSearch(refSearch.current?.value)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if(event.key === 'Enter'){
      handleSearchInput()
    }
  }
  return <FormControl fullWidth sx={{m: 1}} variant="standard">
    <InputLabel htmlFor="standard-adornment-amount" sx={{ color: pink[100] , fontSize: '5rem'}}>Lyrics</InputLabel>
    <StyledInput
      id="standard-adornment-amount"
      inputRef={refSearch}
      onKeyPress={(e)=>handleKeyPress(e)}
      sx={{ borderColor: 'whitesmoke', fontSize: '5rem', textTransform: 'uppercase' , color:'whitesmoke'}}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="search"
            onClick={handleSearchInput}
          >
            <GraphicEq sx={{ color: pink[100] , fontSize: '5rem'}}/>
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
}

export default SearchInput
