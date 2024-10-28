import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div>
        <div>
            <form>
                <div>
                    <label htmlFor='email'>
                        name
                    </label>
                    <input
                        type='text'
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='email'
                        className='form-control'
                    />
                </div>
                <div>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='text'
                        placeholder='Enter Email'
                        autoComplete='off'
                        name='email'
                        className='form-control'
                    />
                </div>
                <div>
                    <label htmlFor='email'>
                        Password
                    </label>
                    <input
                        type='text'
                        placeholder='Enter Password'
                        autoComplete='off'
                        name='email'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-success'>
                    Register
                </button>
            </form>
            <p>Already have an account.</p>
            <Link to="/login" className='btn btn-default'>
                Login
            </Link>
            
        </div>
    </div>
  )
}

export default SignUp