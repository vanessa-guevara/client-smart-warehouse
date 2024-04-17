import { TextField } from '@mui/material';

function Input ({name,value,onChange,label,onKeyDown, helperText, type,disabled}){
return (
    <TextField id="outlined-basic"
    disabled={disabled}
    type={type}
     label={label}
      variant="outlined" 
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      sx={{width:'100%'}}
      helperText={helperText}
      FormHelperTextProps={{ style: { color: 'red' } }} />
)
}
export default Input