// posts the message to Slackbot
// NOTE: insert your Slack webhook URL here.
var webhookURL = ''

// change notification type to 'plain_text' if your notification messages look weird formatted
var notificationType = 'mrkdwn'

function notifyOfTaggedMessages() {
  var threads = GmailApp.search('label:notify-slack') // GmailThread[]
  var label = GmailApp.getUserLabelByName('notify-slack')
  
  for each (var thread in threads) {
    var subject = thread.getFirstMessageSubject()
    var messages = thread.getMessages() // GmailMessage[]
    var blocks = createMessageBlocks(messages)
    
    var slackPayloadContent = {
      text: subject,
      blocks: [createSubjectBlock(subject)].concat(blocks),
    }

    var response = pingSlack(slackPayloadContent)

    if (response == 'ok') {
      thread.removeLabel(label)
      .markRead()
      .moveToArchive()
    }
  }
}

function createSubjectBlock(subject) {
  return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*' + subject + '*',
      },
    }
}

function createMessageBlocks(gmailMessages) {
  var dividerBlock = {type: 'divider'}
  var blocks = []
  for each (var msg in gmailMessages) {
    msg.isUnread() && blocks.push(dividerBlock, {
      type: 'section',
      text: {
        type: notificationType,
        text: msg.getPlainBody(),
      },
    })
  }
  
  return blocks
}

function pingSlack(content) {
  var payload = JSON.stringify(content)
  
  var fetchOptions = {
    method: "POST",
    contentType: "application/json",
    payload: payload,
  }
  
  return UrlFetchApp.fetch(webhookURL, fetchOptions)
}
