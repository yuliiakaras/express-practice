const fs = require('fs/promises');
module.exports.readDataFromFile = async (filepath) => {
    try {
        const articlesData = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(articlesData);
        
    } catch (error) {
        console.error(`Error reading data from file ${filepath}: ${error}`);
        throw error;
    }
}

module.exports.writeDataToFile = async (filepath, data) => {
    try {
        await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (error) {
        console.error(`Error writing data to file ${filepath}: ${error}`);
        throw error;
    }
}
