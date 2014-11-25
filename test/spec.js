describe('game', function() {
    var urls = element.all(by.css('a'));

    beforeEach(function(){
        browser.get('http://localhost:9000/src/index.html#/');
    });

    it('should have a title', function() {
        //verifie le titre
       expect(browser.getTitle()).toEqual("Apprendre à lire l'heure en CE2");
    });
   
    it('should have a link', function() {
        expect(urls.count()).toBe(3); //passes test
        urls.get(3).click().then(function() { 
            expect(element(by.css('h2').getText())).toEqual("Choix de la pendule");
        });
    });
});