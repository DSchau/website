async function sendEmail(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true
    })
  };
}

exports.handler = sendEmail;
