import { readFile, writeFile } from 'fs/promises';
export async function readDataFromFile(filepath) {
    try {
        const articlesData = await readFile(filepath, 'utf-8');
        return JSON.parse(articlesData);
        
    } catch (error) {
        console.error(`Error reading data from file ${filepath}: ${error}`);
        throw error;
    }
}

export async function writeDataToFile(filepath, data) {
    try {
        await writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (error) {
        console.error(`Error writing data to file ${filepath}: ${error}`);
        throw error;
    }
}
