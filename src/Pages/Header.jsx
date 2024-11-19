
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { grey } from '@mui/material/colors';
import Logo from "../assets/logo.png";
export default function Header() {
    return (
        <header className="flex flex-col justify-center items-center p-8 ">
            <img src={Logo} alt="Giphy Logo" className='max-h-14 max-w-14 pb-3' />
            <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                    'aria-label': 'weight',
                }}
                sx={{
                    width: {
                        xs: '30ch',
                        sm: '40ch',
                        md: '50ch',
                        lg: '60ch',
                        xl: '70ch',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: grey[700],
                    },
                }}
            />
        </header>
    )
}