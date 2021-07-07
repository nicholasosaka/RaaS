import * as fs from 'fs'
import { logger } from './logger'

const templateDir = './templates/awesome-cv'

// parsing functions
export function parse(resume: Resume): string {
    let parsedtex = load(`${templateDir}/begin-doc.tex`)
    parsedtex = parsedtex.concat(parseHeader(resume.personal, resume.socials))
    parsedtex = parsedtex.concat(load(`${templateDir}/post-personal.tex`))
    parsedtex = parsedtex.concat(parseFooter(resume.footer), '\n\n')
    parsedtex = parsedtex.concat(parseEducation(resume.education))

    parsedtex = parsedtex.concat(load(`${templateDir}/end-doc.tex`))

    // fs.writeFile('./test_output/texdoc.tex', parsedtex, (e) => { if (e !== null) logger.error(e) })

    return parsedtex
}

function parseEducation(edu: Education): string {
    const edutex = `\\cvsection{${edu.title}}\n`

    const entries = edu.contents.map((e) => {
        return `\\cveduentry
        {${e.degree}}
        {${e.institution}}
        {${e.location}}
        {${e.graduation}}
        {
            \\begin{cvitems}
            ${e.bullets.map((bullet) => { return `\\item {${bullet}}` }).join('\n')}
            \\end{cvitems}
        }\n\n`
    }).join('')

    return edutex.concat('\\begin{cvedu}\n\n', entries, '\\end{cvedu}\n')
}

function parseHeader(personal: Personal, socials: Social[]): string {
    const headertex = `\\name{${personal.firstname}}{${personal.lastname}}\n\n`

    const socialtex = socials.map((s: Social) => {
        if (s.name) return `\\${s.type}{${s.id}}{${s.name}}\n`
        return `\\${s.type}{${s.id}}\n`
    }).join('')

    return headertex.concat(socialtex)
}

function parseFooter(footer: Footer): string {
    return `\\makecvfooter{${footer.left}}{${footer.center}}{${footer.right}}`
}

function load(templatePath: string): string {
    try {
        const data = fs.readFileSync(templatePath, 'utf8')
        return data
    } catch (error) {
        logger.error(error)
        return ""
    }
}

// define interface of json
export interface Resume {
    personal: Personal
    socials: Social[]
    footer: Footer,
    education: Education,
    skills: Skills,
    experience: Experience,
    extras: Extra[]

}

interface Personal {
    firstname: string
    lastname: string
}

interface Social {
    type: string
    id: string
    name?: string
}

interface Education {
    title: string
    contents: EducationItem[]
}

interface Skills {
    title: string
    contents: Bullet[]
}

interface Experience {
    title: string
    contents: ExperienceItem[]
}

interface Extra {
    type: "entry" | "bullets"
    title: string
    contents: (ExperienceItem | Bullet)[]
}

interface EducationItem {
    degree: string
    institution: string
    location: string
    graduation: string
    bullets: string[]
}

interface ExperienceItem {
    title: string
    organization: string
    location: string
    dates: string
    bullets: Bullet[]
}

interface Bullet {
    type: string
    text: string
}

interface Footer {
    left: string
    center: string
    right: string
}
