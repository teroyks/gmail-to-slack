// posts the message to Slackbot
// NOTE: insert your Slack webhook URL here.
var webhookUrl = ""

function notifyOfTaggedMessages() {
  var threads = GmailApp.search('label:notify-slack') // GmailThread[]
  var label = GmailApp.getUserLabelByName('notify-slack')
  
  for each (var thread in threads) {
    var subject = thread.getFirstMessageSubject()
    var blocks = [{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*' + subject + '*',
      },
    }] // notification body blocks (plain text, interpreted as Mrkdwn)

    var messages = thread.getMessages() // GmailMessage[]
    for each (var msg in messages) {
      var msgBody = msg.getPlainBody()
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: msgBody,
        },
      })
    }
    
    slackPayloadContent = {
      text: subject,
      blocks: blocks,
    }

    var response = pingSlack(slackPayloadContent)

    if (response == 'ok') {
      thread.removeLabel(label)
      .markRead()
      .moveToArchive()
    }
  }
}

function pingSlack(content) {
  var payload = JSON.stringify(content)
  
  var fetchOptions = {
    method: "POST",
    contentType: "application/json",
    payload: payload,
  }
  
  return UrlFetchApp.fetch(webhookUrl, fetchOptions)
}
