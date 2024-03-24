/* eslint-disable no-undef */
/**
 * 
 * @description api call to model
 * @param {*} patientId 
 * @returns 
 */
export async function conductStudy(patientId) {
    patient_text = "patient data/p00" + patientId
    user_body = JSON.stringify({patient_dir: patient_text})
    console.log('attempting to post ' + user_body)
    return fetch('http://localhost:5000/get-diagnosis', {
        method: 'POST',
        body: user_body
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('Post sent');
            console.log(data)
            return data; // Return the data from the function
        } else {
            return false; // Return false in case of failure
        }
    })
    .catch(err => {
        console.log('error: ',err);
        return false; // Return false in case of failure
    });
}