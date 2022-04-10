import { routes } from './auth-routing.module'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

describe('auth-routing-module', ()=> {
    it('should have routs with /login', ()=> {
        expect(routes).toContain({ path: 'login', component: LoginComponent})
    })

    it('should have routs with /signup', ()=> {
        expect(routes).toContain({ path: 'signup', component: SignupComponent})
    })
})