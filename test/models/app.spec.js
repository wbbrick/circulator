/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('App Model', function () {

    beforeEach(function () {
        this.AppModel = new D3Interpolator.Models.App();
        this.scale =this.AppModel.get('majorMusicTransformArray')
    });
    describe('Scale Checks', function() {
        it('should have notes and corresponding numbers', function() {
            _.keys(this.scale).should.contain('1');
            _.values(this.scale).should.contain("C1");
            this.scale[1].should.equal('D1')
        })
    })

});
