# gmail-to-slack
Sends a Slack notification for Gmail messages tagged with a specific label.

## Installation

Installation comprises the following steps:

1. Create a [Slack incoming WebHook](https://api.slack.com/messaging/webhooks) for your workspace.
1. Install and configure a [Google Apps script](https://developers.google.com/apps-script) in your Apps domain.
1. Set up a [Gmail filter](https://support.google.com/mail/answer/6579?hl=en-GB) to mark the messages you want to be notified of.
1. Set an [installable trigger](https://developers.google.com/apps-script/guides/triggers/installable) for running the notification script at specified intervals.

### Slack WebHook

1. Go to your Slack workspace _Administration → Manage Apps_ section.
1. Choose _Custom Integrations → Incoming WebHooks_.
1. Create a new WebHook by clicking on _Add to Slack_.
1. Select _Slackbot_ as the “Post to Channel” (you can also choose some other channel, but this way only you see the notifications).
1. Click on _Add Incoming WebHooks Integration_.
1. Save the WebHook URL from the resulting page.
1. (Optional) Set a custom name (for example “gmail notification” and an image for your notification messages.

### Google Apps script

1. Log on your Google Apps domain.
1. Go to https://script.google.com/ and create a new project.
1. Your new project is unnamed. Give it a name (for example, “Ping Slack from Gmail”) by clicking on the _Unnamed Project_ text.
1. Your project script file is open. Copy and paste the contents of `pingSlackForGmail.gs` into the editor window.
1. Set the Slack WebHook URL into the `webhookURL` variable and save the script.
1. You can test the script by selecting the function `notifyOfTaggedMessages` in the _choose action_ list at the top of the editor and clicking on the _Run_ icon ⮀ (nothing should happen yet but there should be no error messages).

### Gmail Filter

1. Create a filter in Gmail for the messages you want to match (for example, by opening a thread and selecting _Filter messages like this_ in the `⠇` action menu).
1. As filter action, check _Apply the label_ and create a new label called `slack-notify` for the messages.
1. Add the filter to an unread message. You can now go back to the script editor and run the script again. You should get a Slackbot notification.

You can create several filters for different messages, as long as they all set the same label.

### Function trigger

1. Go back to the Google Apps editor.
1. Valitse _Edit → Show triggers for current project_ and add a new trigger.
1. Set the trigger to run `notifyOfTaggedMessages`
1. Choose a time-driven trigger.
1. Select and configure the type of trigger according to how often you want to be notified (for example, a minute trigger with 5-minute intervals).
1. After saving, your trigger is now in use and you will be notified automatically of new Gmail messages that match your filters.
