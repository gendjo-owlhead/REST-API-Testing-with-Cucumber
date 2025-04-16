import { Given, When, Then } from '@cucumber/cucumber';
import { AxiosError } from 'axios';
import assert from 'assert';
import { apiRequest } from '../../utils/apiHelper';

let apiEndpoint: string;
let requestBody: any;
let response: any;
let storedObjectId: string;

Given('I have the API endpoint {string}', function (endpoint: string) {
    apiEndpoint = endpoint;
});

Given('I have a new object with the following details:', function (dataTable) {
    requestBody = dataTable.rowsHash();
});

When('I send a GET request to the API', async function () {
    try {
        response = await apiRequest(apiEndpoint, 'GET');
    } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(`GET request failed: ${axiosError.message}`);
    }
});

When('I send a POST request to the API with the new object', async function () {
    try {
        response = await apiRequest(apiEndpoint, 'POST', {
            name: requestBody.name,
            data: JSON.parse(requestBody.data)
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(`POST request failed: ${axiosError.message}`);
    }
});

Then('I should receive a response with status code {int}', function (statusCode: number) {
    assert.equal(response.status, statusCode);
});

Then('the response should contain a list of objects', function () {
    assert(Array.isArray(response.data));
});

Then('I store the created object id', function () {
    storedObjectId = response.data.id;
    console.log(`Stored created object ID: ${storedObjectId}`);
});

When('I update the object with new details:', async function (dataTable) {
    requestBody = dataTable.rowsHash();
    try {
        console.log(`Updating object with ID: ${storedObjectId}`);
        response = await apiRequest(`${apiEndpoint}/${storedObjectId}`, 'PUT', {
            name: requestBody.name,
            data: JSON.parse(requestBody.data)
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Update request details:', {
            url: `${apiEndpoint}/${storedObjectId}`,
            body: requestBody,
            error: axiosError.response?.data
        });
        throw new Error(`Update request failed: ${axiosError.message}`);
    }
});

When('I delete the stored object', async function () {
    try {
        console.log(`Deleting object with ID: ${storedObjectId}`);
        response = await apiRequest(`${apiEndpoint}/${storedObjectId}`, 'DELETE');
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Delete request details:', {
            url: `${apiEndpoint}/${storedObjectId}`,
            error: axiosError.response?.data
        });
        throw new Error(`Delete request failed: ${axiosError.message}`);
    }
});

Then('the response should contain the updated details', function () {
    assert(response.data);
    assert.equal(response.data.name, requestBody.name);
    const expectedData = JSON.parse(requestBody.data);
    assert.deepEqual(response.data.data, expectedData);
});