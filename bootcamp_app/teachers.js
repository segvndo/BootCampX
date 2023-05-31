const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = [`%${process.argv[2]}%`];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort 
FROM teachers
JOIN assistance_requests ON assistance_requests.teacher_id= teachers.id
JOIN students ON students.id= student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name
`;
pool
  .query(queryString, cohortName)
  .then(res => {
    res.rows.forEach(result => {
      console.log(`${result.cohort}: ${result.teacher}`);
    });
  })
  .catch(err => console.error("query error", err.stack));