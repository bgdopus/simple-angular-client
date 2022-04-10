import { routes } from './app-routing.module'
import { HomeComponent } from './components/home/home.component'

describe('app-routing-module', ()=> {
    it('should have routs with empty path', ()=> {
        expect(routes).toContain({ path: '', component: HomeComponent})
    })
})