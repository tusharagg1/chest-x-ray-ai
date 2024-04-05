/*
* Author: Allison Cook
* Date Created: March 2024
* Purpose: Create the post call to the ML model
*/
/**
 * @description api call to model
 * @param {*} patientId
 * @returns
 */
export async function conductStudy(patientId) {
  let patient_text = 'patient data/p00' + patientId;
  // For testing purposes:
  // Use statement below to tell server to send a mock response without running the model
  patient_text = patient_text + 'mock';

  //send the paitent location in database
  const user_body = JSON.stringify({ patient_dir: patient_text });
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch('http://localhost:5000/get-diagnosis', {
    method: 'POST',
    headers: headers,
    body: user_body,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        return data; // Return the data from the function
      } else {
        return false; // Return false in case of failure
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error: ', err);
      return false; // Return false in case of failure
    });
}
