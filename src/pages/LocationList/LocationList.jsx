
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import './LocationList.scss'

const style = {
    py: 0,
    width: '100%',

    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
const locations = [
    {
        "LocationCode": "A-1-1",
        "StockLocation": 150
    },
    {
        "LocationCode": "A-1-2",
        "StockLocation": 120
    },
    {
        "LocationCode": "B-2-1",
        "StockLocation": 200
    },
    {
        "LocationCode": "B-2-2",
        "StockLocation": 180
    },
    {
        "LocationCode": "C-1-1",
        "StockLocation": 250
    },
    {
        "LocationCode": "C-1-2",
        "StockLocation": 230
    },
    {
        "LocationCode": "D-3-1",
        "StockLocation": 100
    },
    {
        "LocationCode": "D-3-2",
        "StockLocation": 90
    },
    {
        "LocationCode": "E-1-1",
        "StockLocation": 300
    },
    {
        "LocationCode": "E-1-2",
        "StockLocation": 280
    }
]


function LocationList() {
    return (
        <div>         
            <List sx={style}>
            <div className='item-wh__titles'>
            Locations
            </div>
            
                {locations.map((location) => {
                    return (
                        <div>
                        <ListItemButton sx={{position:'unset'}}>
                            <div className='item-wh__location'>

                                <ListItemText primary={location.LocationCode} />
                                <ListItemText primary={"Stock:" + location.StockLocation} />
                            </div>

                        </ListItemButton>
                        </div>
                        
                    )

                        
                })}


            </List>
        </div>
    );
}
export default LocationList