import { routes } from "./products-routing.module";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { ListProductComponent } from "./list-product/list-product.component";

describe('product-routing-module', ()=> {
    it('should have routs with /add', ()=> {
        expect(routes).toContain({ path: 'add', component: AddProductComponent})
    })

    it('should have routs with /edit', ()=> {
        expect(routes).toContain({ path: 'edit', component: EditProductComponent})
    })

    it('should have routs with /list', ()=> {
        expect(routes).toContain({ path: 'list', component: ListProductComponent})
    })
})