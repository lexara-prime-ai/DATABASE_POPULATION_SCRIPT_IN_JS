import * as axios from "axios";
import { faker } from "@faker-js/faker";
import * as https from "https";

const instance = axios.default.create({
    // ... other options ...
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN5c3RlbSIsImZ1bGxOYW1lIjoiU3lzdGVtIEFjY291bnQiLCJlbWFpbCI6InJ1bS1zeXN0ZW1AdGhoLWxsYy5jb20iLCJyb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE2OTU4MDQwNzh9.J6fRa9_qq0OhrAdDi9YQLUidNHnaUvWlH-wHMi-S41oAXXNdqnw0LYw9Ey6O-Rj9-_JaGMk26YqhzYFJboNZ0A"

async function seedData() {
    try {
        const url = new URL("https://localhost:5001/resources");
        for (let i = 0; i < 100; i++) {
            const payload = {
                startDTM: "2023-07-26T21:00:00.000Z",
                endDTM: "2023-10-26T21:00:00.000Z",
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                /* 
                
                Implement Ids using an array in future releases e.g 
            
                    let resourceTypeIds: string[] = [
                        '9c480954-f4a0-4560-ae87-9da1bf47a676', 
                        '45b8224f-97b5-4fc1-810f-43e6fe94a87d',
                        '4e5bbade-a8da-4afb-a397-dd13b3ef20b9'
                    ]

                    let resourceLevelds: string[] = [
                        '9c480954-f4a0-4560-ae87-9da1bf47a676', 
                        '45b8224f-97b5-4fc1-810f-43e6fe94a87d',
                        '4e5bbade-a8da-4afb-a397-dd13b3ef20b9'
                    ]

                    let locationIds: string[] = [
                        '9c480954-f4a0-4560-ae87-9da1bf47a676', 
                        '45b8224f-97b5-4fc1-810f-43e6fe94a87d',
                        '4e5bbade-a8da-4afb-a397-dd13b3ef20b9'
                    ]

                Then set the current value on iteration.

                */
                resourceTypeId: "9c480954-f4a0-4560-ae87-9da1bf47a676",
                resourceLevelId: "3b56aa69-82d9-4953-8283-888fdd7d7896",
                locationId: "092ca8fb-edd0-4cb7-9e45-e7af50a8aabf",
            };

            const respose = await instance.post(url.href, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Server: "Kestrel",
                    Accept: "*/*",
                },
            });

            console.log(respose.status);
        }
    } catch (error) {
        console.log("ERROR", error.Message);
    }
}

seedData();