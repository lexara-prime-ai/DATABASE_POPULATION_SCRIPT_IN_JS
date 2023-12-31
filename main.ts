import * as axios from "axios";
import { faker } from "@faker-js/faker";
import * as https from "https";

/**
 * DOCUMENTATION
 * @param {Promise<void>} SEED_DATA - This method creates a POST request to the specified endpoint.
 * @param {axios.AxiosInstance} INSTANCE - This field represents an axios INSTANCE and it's config defaults
 * @param {string} TOKEN - This field refers to the Token generated by your API/Back End service
 * @param {URL} URL - This field refers to the specified endpoint.
 */

class DB_OPERATIONS {
    /* Create axios instance */
    INSTANCE = axios.default.create({
        /* ... other options ... */
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    /* Accessible fields */
    TOKEN: string = "YOUR_TOKEN";
    URL = new URL("https://127.0.0.1:5001/resources");

    async SEED_DATA() {
        try {
            for (let i = 0; i < 100; i++) {

                const payload = {
                    startDTM: "2023-07-26T21:00:00.000Z",
                    endDTM: "2023-10-26T21:00:00.000Z",
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    solutionDeliveryLeaderID: "f53ef60c-b96c-4e70-8fda-7b56201517cb",
                    resourceTypeId: "9c480954-f4a0-4560-ae87-9da1bf47a676",
                    resourceLevelId: "3b56aa69-82d9-4953-8283-888fdd7d7896"
                };

                /* Response format */
                const respose = await this.INSTANCE.post(this.URL.href, payload, {
                    headers: {
                        Authorization: `Bearer ${this.TOKEN}`,
                        Server: "Kestrel",
                        Accept: "*/*",
                    },
                });

                console.log(`RESPONSE STATUS: ${respose.status}`);
            }
        } catch (error) {
            console.log(`ERROR: ${error.message}`);
        }
    }
}

const dbContext = new DB_OPERATIONS();
dbContext.SEED_DATA();
