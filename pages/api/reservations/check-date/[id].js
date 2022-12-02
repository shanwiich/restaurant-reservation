const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { reservationRepo, omit } from 'helpers/api';
import { feeDatesRepo } from 'helpers/api/dates-repo';

export default apiHandler({
    get: checkDate
});

function checkDate(req, res) {
    const reservation = feeDatesRepo.getDates().specialDates.includes(req.query.id);
    console.log( "here " + feeDatesRepo.getDates()[0])

    //if (!reservation) throw 'reservation Not Found';

    return res.status(200).json({result: reservation});
}

