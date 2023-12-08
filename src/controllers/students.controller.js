const {readDataFromFile} = require('../helpers/helpers');

exports.getStudents = async (req, res, next) => {
    try {
        const students = await readDataFromFile('./data/studentStatistics.json');
        res.json(students);
        
    } catch (error) {
        next(error);
    }
}

exports.findWorstScore = async (req, res, next) => {
    try {
        const students = await readDataFromFile('./data/studentStatistics.json');

        let worstScore = Infinity;
        let worstStudent = null;

        for(const student of students) {
            const homeworkScore = student.scores.find(score => score.type === 'homework')?.score;

            if(homeworkScore !== undefined && homeworkScore < worstScore) {
                worstScore = homeworkScore;
                worstStudent = student;
            }
        }

        if(worstStudent) {
            res.json(worstStudent);
        }
        else{
            const error = new Error('There are no students with homework scores');
            error.statusCode = 404;
            next(error);
            }
    } catch (error) {
        next(error);
    }
}
