import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import * as yup from 'yup'
import { Formik } from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import './registerPage.css'
import { NotificationManager } from 'react-notifications'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { setAuthenticatedUser } from '../../redux/slices/auth.slice'
import { Card } from 'react-bootstrap'
import { useCreateMutation } from '../../services/auth.service'
import { setShowLoader } from '../../redux/slices/general.slice'

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
})

const RegisterPage = () => {
  const [register, { data, error, isLoading }] = useCreateMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data && !error) {
      console.log('RegisterPage:: data:', data)
      NotificationManager.success(`Welcome ${data.name}`, 'Authentication Success')
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(setAuthenticatedUser(data))
      navigate('/')
    } else if (error) {
      NotificationManager.error('Error authenticating user, please check your email and password', 'Authentication Error')
      console.log(`LoginPage:: Authentication error`, error)
    }
  }, [data, error, dispatch, navigate])

  useEffect(() => {
    dispatch(setShowLoader(isLoading))
  }, [isLoading, dispatch])

  const validatePassword = (password: string) => {
    // Minimum 8 characters, at least 1 letter, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(password)) {
        return true; // Password is valid
    } else {
        return false; // Password is invalid
    }
}

  const handleRegister = (formValue: { name: string, email: string; password: string }) => {
    const { name, email, password } = formValue
    if(validatePassword(password)){
      register({ name, email, password })
    }else{
      NotificationManager.error('Check the password strength. It should be minimum 8 characters, at least 1 letter, 1 number, and 1 special character', 'Validation Error');
    }
  }

  return (
    <div className="login-wrapper">
      <Formik
        validationSchema={schema}
        onSubmit={handleRegister}
        initialValues={{
          name: '',
          email: '',
          password: '',
          terms: false
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Title className="title">Register Page</Card.Title>
            <Form className="form" noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationFormikName">
                <Form.Label>Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    aria-describedby="inputGroupPrepend"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Your email address"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormik02">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">&#128273;</InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Register</Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  )
}

export default RegisterPage
