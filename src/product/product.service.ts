import { Injectable, HttpException } from '@nestjs/common';
import { PRODUCTS } from './product.mock';
@Injectable()
export class ProductService {
    private products = PRODUCTS;

    public getProducts() {
        return this.products;
    }

    public postProduct(product) {
        return this.products.push(product);
    }

    public getProductById(id: number): Promise<any> {
        const productId = Number(id);
        return new Promise((resolve) => {
            const product = this.products.find((product) => product.id === productId);
            if (!product) {
                throw new HttpException('Product does not exist', 404);
            }
            return resolve(product);
        });
    }

    public deleteProductById(id: number): Promise<any> {
        const productId = Number(id);
        return new Promise((resolve) => {
            const index = this.products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new HttpException('Not Found', 404);
            }
            this.products.splice(index, 1);
            return resolve(this.products);
        });
    }

    public putProductById(id: number, propertyName: string, propertyValue: string): Promise<any> {
        const productId = Number(id);
        return new Promise((resolve) => {
            const index = this.products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new HttpException('Not Found', 404);
            }
            this.products[index][propertyName] = propertyValue;
            return resolve(this.products[index]);
        });
    }
}
