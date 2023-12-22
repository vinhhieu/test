import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { TextField, Button, FormLabel, Link, Box } from '@mui/material'
import * as yup from 'yup'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { AuthService, useAuthState } from 'utils'
import { Dict } from 'interfaces'
import { useNavigate } from 'react-router-dom'

const LoginSection = () => {
  const navigate = useNavigate()
  const { getCurrentUser } = useAuthState()
  const schema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required'),
  })
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods

  const handleFormSubmit = async (formData: Dict) => {
    try {
      await AuthService.login(formData)
      getCurrentUser()
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      if (error) {
        toast.error('Email/Password is incorrect')
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box component='div'>
          <FormLabel>Email</FormLabel>
          <TextField
            sx={{ width: '100%' }}
            placeholder='Email'
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email && `${errors.email.message}`}
          />
        </Box>
        <Box component='div' sx={{ marginTop: '16px' }}>
          <FormLabel>Password</FormLabel>
          <TextField
            sx={{ width: '100%' }}
            {...register('password')}
            name='password'
            type='password'
            placeholder='Password'
            error={errors.password ? true : false}
            helperText={errors.password && `${errors.password.message}`}
          />
        </Box>
        <Box component='div' sx={{ marginTop: '24px', marginBottom: '16px', textAlign: 'center' }}>
          <Button type='submit' variant='contained'>
            Login
          </Button>
        </Box>
        <Box component='div' sx={{ marginTop: '24px', marginBottom: '16px', textAlign: 'center' }}>
          <Link href='/register'>Register</Link>
        </Box>
      </form>
    </FormProvider>
  )
}

export default LoginSection
