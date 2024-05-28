const XSLX = require('xlsx');
const { Record } = require('../dbContext');
const dayjs = require('dayjs');
const Sequelize = require('sequelize');

module.exports = {
    upLoadFile: async (file) => {
        try {
            const workbook = XSLX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rows = XSLX.utils.sheet_to_json(worksheet);
            const excelData = rows.map(row => ({
                name: row.Name,
                date: parseDate(row.Date),
                timeTable: row.Timetable,
                onDuty: parseTime(row['On duty']),
                offDuty: parseTime(row['Off duty']),
                clockIn: parseTime(row['Clock In']),
                clockOut: parseTime(row['Clock Out']),
                late: parseTime(row.Late),
                early: parseTime(row.Early),
                workTime: parseTime(row['Work Time']),
                department: row.Department,
                userId: row['AC-No.']
            }))

            // Obtener los registros existentes en la base de datos que coincidan con las claves relevantes
            const existingRecords = await Record.findAll({
                where: {
                    [Sequelize.Op.or]: excelData.map(data => ({
                        name: data.name,
                        date: data.date,
                        timeTable: data.timeTable,
                        onDuty: data.onDuty,
                        offDuty: data.offDuty,
                        clockIn: data.clockIn,
                        clockOut: data.clockOut,
                        workTime: data.workTime,
                        userId: data.userId
                    }))
                }
            });
            // Convertir los registros existentes a un formato fácil de comparar
            const existingRecordsMap = new Map(existingRecords.map(record => [
                `${record.name}_${dayjs(record.date).format('DD/MM/YYYY')}_${record.timeTable}_${parseTime(record.onDuty)}_${parseTime(record.offDuty)}_
                ${parseTime(record.clockIn)}_${parseTime(record.clockOut)}_${parseTime(record.workTime)}_${record.userId}`,
                record
            ]));

            // Filtrar los datos del Excel para excluir los registros existentes
            const newRecords = excelData.filter(data => {
                const key = `${data.name}_${dayjs(data.date).format('DD/MM/YYYY')}_${data.timeTable}_${data.onDuty}_${data.offDuty}_
                ${data.clockIn}_${data.clockOut}_${data.workTime}_${data.userId}`;
                return !existingRecordsMap.has(key);
            });
            // Insertar los datos en la base de datos usando bulkCreate
            if (newRecords.length > 0) {
                const response = await Record.bulkCreate(newRecords)
                return true;
            }
            else {
                console.log('todos los datos estan registrados en la base de datos')
                return false;
            }
        } catch (error) {
            return error;
        }
    }
}

const parseTime = (time) => {
    // Verifica si el tiempo está vacío
    if (!time) return null;
    // Asegura que el tiempo tenga el formato correcto "HH:MM"
    const [hours, minutes] = time.split(':');
    if (hours && minutes) {
        return `${hours}:${minutes}`;
    }
    return null;
};

const parseDate = (date) => {
    // Verifica si la fecha está vacía
    if (!date) return null;
    // Divide la fecha en partes
    const [day, month, year] = date.split('/');
    if (!day || !month || !year) return null;

    // Crea un objeto Date con los componentes de la fecha
    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
    if (isNaN(parsedDate.getTime())) {
        return null;
    }

    // Retorna la fecha en formato ISO
    return parsedDate.toISOString();
};