import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';
_chai.should();
@suite class HelloWorldServiceUnitTests {
    
    private number: string;

    before() {
        this.number = "hello"
    }

    @test 'should do something when call a method'() {
        console.assert(this.number == "hello")
    }

}