import { Box } from '@mui/material'
import RegisterSection from './RegisterSection'

const RegisterForm = () => {
  return (
    <Box component='div' sx={{ display: 'flex', flex: '1 1 auto', minHeight: '100vh' }}>
      <Box component='div' sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', width: '100%' }}>
        <Box component='div' sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component='div'
            sx={{
              position: 'relative',
              height: { xs: '100%', md: 'auto' },
              width: '100%',
              backgroundColor: '#FFF',
              padding: '20px',
              maxWidth: { xs: '512px' },
            }}
          >
            <Box component='div' sx={{ margin: '40px', fontSize: '20px', fontWeight: 'bold' }}>
              Register
            </Box>
            <RegisterSection />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterForm
