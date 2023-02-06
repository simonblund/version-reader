import { describe, expect, test } from '@jest/globals';
import {findVersionLine} from "."


const exampleversion = '# This is a version file it is very complicated \n somethimes I like to make it many lines and forget to comment them out \n __version__="1.2.3"'
describe("test parsing of versionstring", ()=>{

    test("find version", () =>{
        expect(findVersionLine(exampleversion, '__version__="', '"')).toBe("1.2.3")
    })
})