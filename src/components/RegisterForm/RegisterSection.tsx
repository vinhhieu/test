import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { TextField, Button, FormLabel, Link, Box } from '@mui/material'
import * as yup from 'yup'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { Dict } from 'interfaces'
import { UserAPI } from 'api'
import { useNavigate } from 'react-router-dom'

const RegisterSection = () => {
  const schema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(6, 'Passwords must be at least 6 characters'),
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

  const navigate = useNavigate()

  const handleFormSubmit = async (formData: Dict) => {
    try {
      const result = await UserAPI.createUser(formData)
      if (result?.data?.id) {
        toast.success('Registration successful!')
        navigate('/login')
      }
    } catch (error) {
      if (error) {
        toast.error((error as Error).message)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box component='div' sx={{ marginBottom: '16px' }}>
          <FormLabel>
            Email
            <Box component='span' sx={{ color: 'rgb(239 68 68)' }}>
              *
            </Box>
          </FormLabel>
          <TextField
            sx={{ width: '100%' }}
            placeholder='Email'
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email && `${errors.email.message}`}
          />
        </Box>
        <Box component='div' sx={{ marginTop: '16px' }}>
          <FormLabel>
            Password
            <Box component='span' sx={{ color: 'rgb(239 68 68)' }}>
              *
            </Box>
          </FormLabel>
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
            Register
          </Button>
        </Box>
        <Box component='div' sx={{ marginTop: '24px', marginBottom: '16px', textAlign: 'center' }}>
          <Link href='/login'>Login</Link>
        </Box>
      </form>
    </FormProvider>
  )
}

export default RegisterSection
