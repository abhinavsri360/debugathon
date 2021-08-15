import React from 'react'
import Box from '@material-ui/core/Box'
import { Formik, Field, Form, ErrorMessage } from 'formik'
//import TextField from '@material-ui/core/TextField'

import './login.css'
import { Button } from '@material-ui/core'
import { error } from '../../utilities/toast'

function Login(props) {
    const [loading, setLoading] = React.useState(false)

    if (loading)
        return <p>Loading...</p>

    return (
        <Box display='flex' justifyContent='center'>
            <Formik
                initialValues={{ userId: '' }}
                onSubmit= {(values, { setSubmitting }) => {
                    if (values.userId === '') {
                        error('Enter a valid User Id')
                    }
                    setLoading(true)
                    setSubmitting(true)
                    props.loginUser(values)
                    setLoading(false)
                }}
            >
            {({
                isSubmitting
            }) => (
                <Form className='centered'>
                    <h2>debug</h2>
                    <Field placeholder='Enter your hash' className='field' type="userId" name="userId" /><br />
                    <ErrorMessage name='userId' component='div' /><br />
                    <Button variant='contained' type="submit" disabled={isSubmitting} style={{ marginLeft: '220px' }}> Enter </Button>
                </Form>
            )}
            </Formik>
        </Box>
    )
}

export default Login
