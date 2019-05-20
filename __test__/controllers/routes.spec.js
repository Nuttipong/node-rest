import Router from '../../src/controllers/routes';

describe('AppRouter', () => {

    it('should create Router properly', () => {
        // given
        const router = new Router();

        // then
        expect(router.routes).toBeDefined();
        // and 
        expect(router.storeController).toBeDefined();
        // and
        expect(router.routes.stack).toHaveLength(1);
    });

});