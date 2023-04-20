import { describe, expect, test } from '@jest/globals';
import {findVersionLine} from "."


describe("test parsing of versionstring", ()=>{


    test("find version", () =>{
        const exampleversion = '# This is a version file it is very complicated \n somethimes I like to make it many lines and forget to comment them out \n __version__="1.2.3"'
        expect(findVersionLine(exampleversion, '__version__=')).toBe("1.2.3")
    })
    test("find version a lot of blanksteps", () =>{
        const exampleversion = '# This is a version file it is very complicated \n somethimes I like to make it many lines and forget to comment them out \n __version__ = " 1.2.3 "'
        expect(findVersionLine(exampleversion, '__version__=')).toBe("1.2.3")
    })
    test("find version single quotes", () =>{
        const exampleversion = "# This is a version file it is very complicated \n somethimes I like to make it many lines and forget to comment them out \n __version__=' 1.2.3'"
        expect(findVersionLine(exampleversion, '__version__=')).toBe("1.2.3")
    })

    test("find version single quotes", () =>{
        const exampleversion = "__version__ = ' 1.2.3'\n"
        expect(findVersionLine(exampleversion, '__version__= ')).toBe("1.2.3")
    })
    test("find version", () =>{
        const exampleversion = '# This is a version file it is very complicated \n somethimes I like to make it many lines and forget to comment them out \n __version__=" 1.2.3 "\n'
        expect(findVersionLine(exampleversion, '__version__ =')).toBe("1.2.3")
    })
    test("find version", () =>{
        const exampleversion = '# This is a version file it is very complicated \n somethimes I like to make it many lines and forget to comment them out \n     __version__ = "   1.2.3   "'
        expect(findVersionLine(exampleversion, '__version__=')).toBe("1.2.3")
    })
})