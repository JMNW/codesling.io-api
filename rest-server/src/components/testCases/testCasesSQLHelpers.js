export const addTestCaseHelper = ({
  content,
  challenge_id
}) => {
  return `
    INSERT INTO testCases (content, challenge_id)
    VALUES ('${content}', ${challenge_id})
  `;
};

export const getTestByChallenge = ({ challenge_id }) => {
    return `
  SELECT t.content
    FROM testcases AS t
      INNER JOIN challenges AS c
      ON (t.challenge_id=c.id)
      WHERE (c.id=${challenge_id})
    `;
};
