# RaaS - Resume as a Service
Resume as a Service (RaaS) provides a simple interface to quickly and easily generate a PDF Resume with API calls.

Currently, this project uses the [Awesome CV](https://github.com/posquit0/Awesome-CV) template by Claud D. Park, which is licenced under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). 

## REST API Structure
POST - /resume to the api microservice.

```
{
   "firstname": "First Name",
   "lastname": "Last Name",
   "socials": [ 
        { "type": "email", "id": "email-id" },
        { "type": "github", "id": "github-id" },
        { "type": "linkedin", "id": "linkedin-id" },
        { "type": "gitlab", "id": "gitlab-id" },
        { "type": "twitter", "id": "@twitter-id" },
        { "type": "skype", "id": "skype-id" },
        { "type": "reddit", "id": "reddit-id" },
        { "type": "medium", "id": "medium-id" },
        { "type": "googlescholar", "id": "googlescholar-id", "name": "googlescholar-name" },
        { "type": "stackoverflow", "id": "stackoverflow-id", "name": "stackoverflow-name" },
        { "type": "extrainfo", "id": "extra information" }
   ],
   "footer": { "left": "", "center": "My Name", "right": "" } 
   "education": {
        "title": "Education",
        "contents": [
            {
                "degree": "Bachelor of Science in Computer Science",
                "institution": "Greendale Community College",
                "location": "Greendale, CO",
                "graduation": "May 2017",
                "bullets": ["GPA: X.XX", "Concentration: XYZ"]
            },
            { ... }
        ]
   },
   "skills": {
        "title": "Skills",
        "contents": [
            {
                "type": "Software Tools and Libraries",
                "text": "Git, BASH, Linux, Docker, ..."
            },
            { ... }
        ]
   },
   "experience": {
        "title": "Experience",
        "contents": [
            {
                "organization": "ACME Corp.",
                "title": "Assistant Manager",
                "location": "ACME HQ",
                "dates": "MM YYYY - MM YYYY",
                "bullets": [
                    "Developed new practices in organizational leadership",
                    "Enhanced Roadrunner/Coyote competition"
                ]
            },
            { ... }
        ]
   },
   "extras": [
       {
           "type": "entry",
            "title": "Projects",
            "contents": [
                {
                    "title": "Resume as a Service",
                    "organization": "ACME Corp",
                    "location": "ACME HQ",
                    "dates": "MM YYYY - MM YYYY",
                    "bullets": [
                        "Build the whole thing",
                        "Really well"
                    ]
                },
                { ... }
            ]
       },
       {
           "type": "bullets",
            "title": "Skills",
            "contents": [
                {
                    "type": "Software Tools and Libraries",
                    "text": "Git, BASH, Linux, Docker, ..."
                },
                { ... }
            ]
       }
   ]
}
```

***NB:***
- Any/none of the social objects can be used, they are all optional
- If the name key is omitted, the Goole Scholar Social will use the first and last name key values