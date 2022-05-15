import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service'



const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));




export default function SpeedDialMenu({ setUser }) {
	const navigate = useNavigate()
    
	const actions = [
        { icon: <HomeRoundedIcon />, name: 'Home', cb: () => navigate('/') },
        { icon: <AddAPhotoRoundedIcon />, name: 'New', cb: ()=> navigate('/webcam')  },
        { icon: <LogoutRoundedIcon />, name: 'Logout', cb: ()=> {
			userService.logOut()
			setUser(null)
		} },
    ];
	

	return (
		<Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, zIndex:10, position: 'sticky', top: 3, left: 3 }}>
			<Box sx={{ position: 'relative', height: 'fit-content' }}>
				<StyledSpeedDial
				ariaLabel="SpeedDial minimal menu"
				icon={<MenuOpenRoundedIcon />}
				direction={'right'}
				>
				{actions.map((action) => (
					<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					onClick={() => action.cb()}
					/>
				))}
				</StyledSpeedDial>
			</Box>
		</Box>
	);
}
