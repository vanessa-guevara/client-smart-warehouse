import { Button } from '@mui/material';

function ButtonCustomize({type,text,variant,onClick}){
return(
    <Button
    type={type}
    variant={variant}
    color="primary"
    sx={{ position: 'unset', height:'56px' }}
    onClick={onClick}
>{text}</Button>
)
}
export default ButtonCustomize