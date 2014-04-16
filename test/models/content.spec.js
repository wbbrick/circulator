/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('Content Model', function () {

    beforeEach(function () {
        this.ContentModel = new D3Interpolator.Models.Content();
        this.dateGenerator = this.ContentModel.dateGenerator;
        this.noteGenerator = this.ContentModel.noteGenerator;
    });

    describe('check initialized values', function() {
        it('should have noteGenerator and dateGenerator function', function()
           {
               this.ContentModel.noteGenerator
                   .should.be.an.instanceOf(Object);
               this.ContentModel.dateGenerator
                   .should.be.an.instanceOf(Object);
           });
        it('should have the textGenerator set', function()
           {
               this.ContentModel.get('textGenerator')
                   .should.be.an.instanceOf(Object);
           });
        it('should have an attributes hash and a divHeight', function()
           {
               this.ContentModel.get('attributes')
                   .should.be.an.instanceOf(Object);
               this.ContentModel.get('divHeight')
                   .should.exist;
           });
    });
    describe('check the text generator outputs', function() {
        it('should output dates given the right object', function() {
            this.dateGenerator(5, 'orangeaverage',
                               {
                                   cleanDate :'Thu Feb 11 2005'
                               } )
                .should.equal('Thu Feb 11 2005');
        });
        it('should output nothing given an empty or incorrect object', function() {
            this.dateGenerator(5, 'orangeaverage', {})
                .should.equal('');
            this.dateGenerator({})
                .should.equal('');
            this.dateGenerator()
                .should.equal('');
        });
    });

});
