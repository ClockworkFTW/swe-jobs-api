# SWE Jobs API
A repository for entry level software engineering jobs. Data is scraped daily from LinkedIn, Indeed and Monster and saved to a database. Jobs posted longer than one week ago are discarded.

The following endpoints have been made available for public use:
## Data Request
###### Get All Jobs
```
https://swe-jobs.com/api/job
```
###### Search Jobs
```
https://swe-jobs.com/api/job/search?title={title}&company={company}&location={location}
```
| Parameters | Description | Example |
| --- | --- | --- |
| `title` | Case insensitive substring search of job title | "system" = "System Engineer"
| `company` | Fuzzy search of company name | "super micro" = "Supermicro"
| `location` | Fuzzy search of job location | "san jose" = "San Jose, CA"
## Data Response
###### JSON
```
{
  "jobs": [
    {
      "id": "2855610039",
      "title": "System Engineer",
      "company": "Supermicro",
      "location": "San Jose, CA",
      "salary": {
        "min": 80000,
        "max": 140000,
      }
      "description": "Supermicro® is a Top Tier provider of advanced server, storage, and networking solutions...",
      "link": "https://www.linkedin.com/jobs/view/system-engineer-at-supermicro-2855610039"
      "date": 2022-07-14 13:19:33.017279-07
      "createdAt": 2022-07-19 13:19:33.017369-07
      "updatedAt": 2022-07-19 13:19:33.01737-07
    },
    ...
  ]
}
```
## UML Diagram
![image](https://user-images.githubusercontent.com/4710242/180835754-d46a3e26-a8fb-4ec5-ba3d-e659c2693a3c.png)
