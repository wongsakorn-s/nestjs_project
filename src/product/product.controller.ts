import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    public async getProducts(@Query() query) {
        const { category, minPrice, maxPrice, sort } = query;
        return this.productService.getProducts(category, minPrice, maxPrice, sort);
    }

    @Post()
    public async postProduct(@Body() productDto: Omit<ProductDTO, 'id'>) {
        if (!productDto.name || productDto.price == null || !productDto.category) {
            throw new HttpException('Missing information', 400);
        }
        return this.productService.postProduct(productDto);
    }


    @Get(':id')
    public async getProductById(@Param('id') id: number) {
        return this.productService.getProductById(id);
    }

    @Delete(':id')
    public async deleteProductById(@Param('id') id: number) {
        return this.productService.deleteProductById(id);
    }

    @Put(':id')
    public async putProductById(@Param('id') id: number, @Query() query) {
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.productService.putProductById(id, propertyName, propertyValue);
    }
}
