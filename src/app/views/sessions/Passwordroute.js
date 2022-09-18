const route = {
    passwordReset: '/afrimash/users/password/reset',
    passwordChange: '/users/password/change',
    passwordConfirm:(otp)=> `/users/password/confirm/${otp}`,
}

export default route;

