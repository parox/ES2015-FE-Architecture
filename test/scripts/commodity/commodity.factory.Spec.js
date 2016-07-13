describe('commodityFactory', function(){
  beforeEach(module('app.factories'));

  describe('getName()', function(){
    it('should return the name', inject(function($factory){
      var commodityFactory = $factory('commodityFactory');

      console.log(commodityFactory);
      //commodityFactory.getName({name: 'aa'});
    }));
  });
});