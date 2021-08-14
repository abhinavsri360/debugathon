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
        return <Box>Loading...</Box>

    return (
        <Box display='flex' justifyContent='center'>
            <Formik
                initialValues={{ userId: '' }}
                onSubmit= {(values, { setSubmitting }) => {
                    if (values.userId === '') {
                        error('Enter a valid User Id')
                    }
                    setSubmitting(true)
                    setLoading(true)
                    props.loginUser(values)
                    setLoading(false)
                }}
            >
            {({
                isSubmitting
            }) => (
                <Form className='centered'>
                    <Field placeholder='User Id' className='field' type="userId" name="userId" style={{ padding: '10px', borderRadius: '15px', border: 'none', width: '500px' }} /><br />
                    <ErrorMessage name='userId' component='div' /><br />
                    <Button variant='contained' type="submit" disabled={isSubmitting} style={{ marginLeft: '210px' }}> Submit </Button>
                </Form>
            )}
            </Formik>
        </Box>
    )
}

export default Login
