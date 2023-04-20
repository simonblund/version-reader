import * as core from '@actions/core'
import * as fs from 'node:fs/promises';

async function run(): Promise<void> {
    try {
        const prepend: string = core.getInput('prepend')
        //const append: string = core.getInput('append')
        const filename: string = core.getInput('filename')
        const filelocation: string = core.getInput('filelocation')
        const allowFeatureBranches: boolean = core.getBooleanInput('allow_feature_branches')

        const fileContents = await readFile(filename, filelocation)

        const versionString = findVersionLine(fileContents, prepend)

        if(versionString.includes("-") && !allowFeatureBranches){
            throw Error("This version file seems to contain a feature branch, Not allowed")
        }

        core.setOutput('version', versionString)
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

export function findVersionLine(content: string, prepend:string){
    if(content.length <1){
        throw Error("No file contents: " +content)
    }
    core.info("content: " +content)
    core.info("prepend: " +prepend)
    const contentLines = content.replace(/ /g, "").split("\n")
    const prependTrimmed = prepend.replace(/ /g, "").replace(/['"]+/g, '')
    const versionline = contentLines.find(line => line.includes(prependTrimmed))

    core.info("contentlines: " +JSON.stringify(contentLines))
    core.info("prependtrimmed: " +prependTrimmed)
    core.info("versionline: " +versionline)
    if(versionline == undefined){
        const errorInput = {
            content: content,
            prepend: prepend,
            contentLines: contentLines,
            prependTrimmed: prependTrimmed,
            versionline: versionline
        }
        throw Error("Could not find line. Input: " +JSON.stringify(errorInput))
    }

    const trimmed_verionline = versionline
    .replace(" ", "")
    .replace("\t", "")
    .replace("\'", "")
    .replace(/['"]+/g, '')
    .replace("\\", "")

    const version = trimmed_verionline.split(prependTrimmed)[1]
    return version

    
}

async function readFile(filename:string, filelocation:string): Promise<string>{
    const file:string = filelocation+filename
    const content = await fs.readFile(file, { encoding: "utf8" })
    return content
    
}

run()