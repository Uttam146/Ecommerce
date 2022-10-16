const {Product} = require('../../../models');
const ProductController = require('../../../controllers/product.controller');
const {mockRequest,mockResponse} = require('../interceptor');
const newProduct = require('../../mock-data/new-product.json');

let req,res;
beforeEach(()=>{
    req=mockRequest();
    res=mockResponse();
})

describe('Product controller create test suite',()=>{
    beforeEach(()=>{
        req.body = newProduct;
        req.allPermission=true;
    })
    afterEach(()=>{
        jest.clearAllMocks();
        //jest.restoreAllMocks();
    })

    it("happy case for create product call",async()=>{
        let spy = jest.spyOn(Product,'create')
        .mockImplementation((newProduct)=>{
            return Promise.resolve(newProduct);
        })

        await ProductController.create(req,res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    })

    it("create call with normal user",async()=>{
        req.allPermission=false;
        let spy = jest.spyOn(Product,'create')
        .mockImplementation((newProduct)=>{
            return Promise.resolve(newProduct);
        })

        await ProductController.create(req,res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
    })
});
