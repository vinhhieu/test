import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthService, useAuthState } from 'utils'

const Header = () => {
  const { user, isLoggedIn } = useAuthState()
  const navigate = useNavigate()

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        padding: '8px',
        borderBottom: '1px solid',
        flexDirection: { xs: 'column', md: 'inherit' },
      }}
    >
      <Box component='div' sx={{ textAlign: { xs: 'center', md: 'inherit' } }}>
        <Button
          variant='contained'
          sx={{
            margin: { xs: '16px 0', md: 'auto' },
            marginLeft: '16px',
          }}
          onClick={() => navigate('/')}
        >
          Homepage
        </Button>
      </Box>
      <Box
        component='div'
        sx={{
          display: 'flex',
          width: '100%',
          marginBottom: '16px',
          justifyContent: { xs: 'center', md: 'flex-end' },
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            fontSize: '18px',
            lineHeight: '28px',
          }}
        >
          <Box component='div'>
            {isLoggedIn ? (
              <Box
                component='div'
                sx={{
                  display: { xs: 'flex', md: 'block' },
                  flexDirection: { xs: 'column', md: 'inherit' },
                }}
              >
                <Box component='span' sx={{ marginRight: '20px' }}>
                  Welcome {user.email}
                </Box>
                <Button variant='contained' onClick={() => AuthService.logout()}>
                  Logout
                </Button>
              </Box>
            ) : (
              <>
                <Button variant='contained' sx={{ marginRight: '20px' }} onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant='contained' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
