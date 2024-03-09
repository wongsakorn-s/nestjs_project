import { Injectable, HttpException } from '@nestjs/common';
import { PRODUCTS } from './product.mock';
import { ProductDTO } from './dto/product.dto';
@Injectable()
export class ProductService {
    private products = PRODUCTS;

    public getProducts(category?: string, minPrice?: string, maxPrice?: string, sort?: string) {
        let filteredProducts = this.products;
        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        if (minPrice) {
            const min = parseFloat(minPrice);
            filteredProducts = filteredProducts.filter(product => product.price >= min);
        }
        if (maxPrice) {
            const max = parseFloat(maxPrice);
            filteredProducts = filteredProducts.filter(product => product.price <= max);
        }
        if (sort) {
            filteredProducts = filteredProducts.sort((a, b) => {
                switch (sort) {
                    case 'price_asc':
                        return a.price - b.price;
                    case 'price_desc':
                        return b.price - a.price;
                    case 'id_asc':
                        return a.id - b.id;
                    case 'id_desc':
                        return b.id - a.id;
                    default:
                        return 0;
                }
            });
        }
        return filteredProducts;
    }

    public postProduct(product: Omit<ProductDTO, 'id'>): any {
        const newId = this.products.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1;
        const newProduct = { id: newId, name: product.name, price: product.price, category: product.category };
        this.products.push(newProduct);
        return newProduct;
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

    public putProductById(id: number, propertyName: string, propertyValue: any): Promise<any> {
        const productId = Number(id);
        return new Promise((resolve, reject) => {
            const index = this.products.findIndex((product) => product.id === productId);
            if (index === -1) {
                reject(new HttpException('Not Found', 404));
            } else {
                if (propertyName === 'price') {
                    this.products[index][propertyName] = Number(propertyValue);
                } else {
                    this.products[index][propertyName] = propertyValue;
                }
                resolve(this.products[index]);
            }
        });
    }

}
